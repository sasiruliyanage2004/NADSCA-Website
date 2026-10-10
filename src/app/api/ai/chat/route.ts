import { NextRequest, NextResponse } from "next/server";
import { generateAIResponse, ChatMessage } from "@/lib/ai/provider";
import { checkRateLimit, getClientIp } from "@/lib/security/rateLimit";
import { isValidOrigin } from "@/lib/security/originCheck";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  // 1. Cross-Origin Validation
  if (!isValidOrigin(req)) {
    return NextResponse.json(
      { error: "Forbidden: Unauthorized origin." },
      { status: 403 }
    );
  }

  // 2. Sliding Window Rate Limiting (15 requests per 60 seconds per IP)
  const clientIp = getClientIp(req);
  const rateLimitResult = checkRateLimit(`ai_chat_${clientIp}`, {
    intervalMs: 60000,
    maxRequests: 15,
  });

  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      {
        reply: "You have sent too many inquiries in a short period. Please wait a moment before asking another question.",
        modelUsed: "knowledge-engine",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimitResult.retryAfterSeconds),
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  try {
    const rawBody = await req.text();
    // 3. Payload size limit (Max 25 KB)
    if (rawBody.length > 25600) {
      return NextResponse.json(
        { error: "Payload too large. Maximum message size is 25KB." },
        { status: 413 }
      );
    }

    const body = JSON.parse(rawBody);
    const { messages, currentPath = "/" } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid messages array provided." },
        { status: 400 }
      );
    }

    // 4. Sanitize message objects & prevent prompt injection overflows
    const sanitizedMessages: ChatMessage[] = messages
      .slice(-8) // Limit conversation history to last 8 messages
      .map((m: { role?: string; content?: string }) => ({
        role: (m.role === "assistant" ? "assistant" : "user") as "user" | "assistant",
        content: String(m.content || "")
          .trim()
          .slice(0, 800) // Cap individual query length
          .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, ""), // Strip non-printable control characters
      }))
      .filter((m) => m.content.length > 0);

    if (sanitizedMessages.length === 0) {
      return NextResponse.json(
        { error: "Message content cannot be empty." },
        { status: 400 }
      );
    }

    const result = await generateAIResponse(sanitizedMessages, String(currentPath));

    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
        "X-RateLimit-Remaining": String(rateLimitResult.remaining),
      },
    });
  } catch (error) {
    console.error("AVORA_AI API error:", error);
    return NextResponse.json(
      {
        reply:
          "I encountered an unexpected system error. You can reach the NADSCA engineering team directly at info@nadsca.com.",
        modelUsed: "knowledge-engine",
      },
      { status: 500 }
    );
  }
}

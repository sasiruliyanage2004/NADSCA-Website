import { NextRequest, NextResponse } from "next/server";
import { generateAIResponse, ChatMessage } from "@/lib/ai/provider";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, currentPath = "/" } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid messages array provided." },
        { status: 400 }
      );
    }

    // Sanitize message objects
    const sanitizedMessages: ChatMessage[] = messages
      .slice(-10) // Limit conversation history to last 10 messages
      .map((m: { role?: string; content?: string }) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: String(m.content || "").slice(0, 1000), // Cap length
      }));

    const result = await generateAIResponse(sanitizedMessages, String(currentPath));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Awora AI API error:", error);
    return NextResponse.json(
      {
        reply:
          "I encountered an unexpected system error. You can reach the NADSCA engineering team directly at info@nadsca.dev.",
        modelUsed: "knowledge-engine",
      },
      { status: 500 }
    );
  }
}

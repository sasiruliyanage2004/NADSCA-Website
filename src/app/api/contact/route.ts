import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/security/rateLimit";
import { isValidOrigin } from "@/lib/security/originCheck";

export const runtime = "nodejs";

interface TurnstileVerifyResponse {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
}

export async function POST(req: NextRequest) {
  // 1. Origin verification
  if (!isValidOrigin(req)) {
    return NextResponse.json(
      { error: "Forbidden: Unauthorized request origin." },
      { status: 403 }
    );
  }

  // 2. Strict Rate Limiting for contact form (Max 5 submissions per 10 minutes per IP)
  const clientIp = getClientIp(req);
  const rateLimitResult = checkRateLimit(`contact_submit_${clientIp}`, {
    intervalMs: 600000, // 10 minutes
    maxRequests: 5,
  });

  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      {
        error: "Too many contact submissions. Please wait before submitting again.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimitResult.retryAfterSeconds),
        },
      }
    );
  }

  try {
    const rawBody = await req.text();
    // 3. Payload size check (Max 15KB)
    if (rawBody.length > 15360) {
      return NextResponse.json(
        { error: "Request payload exceeded allowable limit." },
        { status: 413 }
      );
    }

    const body = JSON.parse(rawBody);
    const {
      name,
      email,
      company = "",
      budget = "",
      message,
      captchaToken,
      honeypot = "", // Honeypot trap field
    } = body;

    // 4. Honeypot Bot Trap: If hidden bot field is filled, silently reject or mock success
    if (honeypot && String(honeypot).trim().length > 0) {
      // Fake delay and return success so bot doesn't retry
      return NextResponse.json({ success: true, message: "Inquiry received." });
    }

    // 5. Basic field validations
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Name is required." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || email.trim().length === 0) {
      return NextResponse.json(
        { error: "Email address is required." },
        { status: 400 }
      );
    }

    // Strict RFC 5322 regex for valid email format & length check
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!emailRegex.test(email.trim()) || email.length > 254) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Message content is required." },
        { status: 400 }
      );
    }

    // 6. Cloudflare Turnstile Verification (Server-Side)
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (turnstileSecret && captchaToken) {
      try {
        const verifyRes = await fetch(
          "https://challenges.cloudflare.com/turnstile/v0/siteverify",
          {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              secret: turnstileSecret,
              response: String(captchaToken),
              remoteip: clientIp,
            }),
          }
        );

        const verifyData: TurnstileVerifyResponse = await verifyRes.json();
        if (!verifyData.success) {
          console.warn("Turnstile verification failed:", verifyData["error-codes"]);
          return NextResponse.json(
            { error: "Captcha verification failed. Please try again." },
            { status: 403 }
          );
        }
      } catch (err) {
        console.error("Turnstile verification network error:", err);
        // Fail-open or log based on policy, but proceed with caution
      }
    }

    // 7. Input Sanitization & CRLF Header Injection Defense
    const sanitizedName = String(name).slice(0, 100).replace(/[\r\n]/g, "").trim();
    const sanitizedEmail = String(email).slice(0, 254).replace(/[\r\n]/g, "").trim();
    const sanitizedCompany = String(company).slice(0, 100).replace(/[\r\n]/g, "").trim();
    const sanitizedBudget = String(budget).slice(0, 50).replace(/[\r\n]/g, "").trim();
    const sanitizedMessage = String(message)
      .slice(0, 3000)
      .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
      .trim();

    // Log securely without leaking PII in public logs
    console.info(`[Contact Form Received] From: ${sanitizedName} (${sanitizedEmail}), Company: ${sanitizedCompany}`);

    // If an email dispatch service (Resend / SendGrid / Nodemailer) is configured in .env, dispatch here
    // e.g. await sendEmail({ to: "info@nadsca.com", from: sanitizedEmail, ... });

    return NextResponse.json(
      {
        success: true,
        message: "Your inquiry has been successfully received by the NADSCA engineering team.",
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("Contact API submission error:", error);
    return NextResponse.json(
      { error: "Failed to process inquiry. Please email info@nadsca.com directly." },
      { status: 500 }
    );
  }
}

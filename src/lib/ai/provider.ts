import { buildSystemPrompt } from "./prompts";
import {
  NATLE_COMPANY_PROFILE,
  NATLE_SERVICES,
  NATLE_PROJECTS,
  NATLE_TECH_STACK,
  NATLE_FAQS,
} from "./knowledge";

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface AIResponsePayload {
  reply: string;
  quickActions?: { label: string; href?: string; actionType?: string }[];
  modelUsed: "gemini" | "openai" | "knowledge-engine";
}

/**
 * Intelligent deterministic knowledge match engine when external API keys are not supplied.
 * Handles fuzzy natural language questions about services, tech stack, projects, leadership, and contact.
 */
function queryKnowledgeEngine(query: string, currentPath: string): AIResponsePayload {
  const q = query.toLowerCase().trim();

  // Awora identity / name
  if (
    q.includes("who are you") ||
    q.includes("your name") ||
    q.includes("awora") ||
    q.includes("what is your name")
  ) {
    return {
      reply: `I am **Awora**, the intelligent digital AI assistant for NADSCA. I can help you explore our software engineering practices, review verified case studies, understand our technical architectures, or get in touch with our team.`,
      quickActions: [
        { label: "About NADSCA", href: "/about" },
        { label: "Our Services", href: "/services" },
        { label: "Start a Project", href: "/contact" },
      ],
      modelUsed: "knowledge-engine",
    };
  }

  // Contact / Start project
  if (
    q.includes("contact") ||
    q.includes("hire") ||
    q.includes("quote") ||
    q.includes("start a project") ||
    q.includes("pricing") ||
    q.includes("cost") ||
    q.includes("talk to") ||
    q.includes("get in touch")
  ) {
    return {
      reply: `To start an engagement with NADSCA, we recommend kicking off with an initial Architecture & Discovery Sprint. You can reach out directly via:

• Email: info@nadsca.dev
• Studio Phone: +94 11 250 7601 (or +94 70 465 9847)
• Location: No. 283 1/1, Ruwan Mawatha, Colombo 05

Our average time to initial production MVP is 6 weeks. Every engagement is staffed directly by senior staff architects.`,
      quickActions: [
        { label: "Start a Project Form", href: "/contact" },
        { label: "Email Directly", href: "mailto:info@nadsca.dev" },
      ],
      modelUsed: "knowledge-engine",
    };
  }

  // Services / What does NADSCA build
  if (
    q.includes("service") ||
    q.includes("what do you build") ||
    q.includes("capabilities") ||
    q.includes("what does natle do") ||
    q.includes("what does nadsca do") ||
    q.includes("offer")
  ) {
    const servicesSummary = NATLE_SERVICES.map(
      (s, i) => `0${i + 1}. **${s.name}** — ${s.short}`
    ).join("\n");

    return {
      reply: `NADSCA engineers high-throughput platforms and custom software architectures across 6 core practices:

${servicesSummary}

Every practice is managed by staff-level engineers with a strict zero-technical-debt standard.`,
      quickActions: [
        { label: "Explore Services", href: "/services" },
        { label: "View Architecture Pipeline", href: "/#pipeline" },
      ],
      modelUsed: "knowledge-engine",
    };
  }

  // Projects / Portfolio / Case studies
  if (
    q.includes("project") ||
    q.includes("work") ||
    q.includes("portfolio") ||
    q.includes("client") ||
    q.includes("case stud") ||
    q.includes("track record")
  ) {
    const projectsList = NATLE_PROJECTS.slice(0, 3)
      .map((p) => `• **${p.name}** (${p.category}): ${p.result}`)
      .join("\n");

    return {
      reply: `NADSCA has engineered 120+ production systems. Key verified client case studies include:

${projectsList}

All architectures are engineered for high-availability with zero tech debt handover.`,
      quickActions: [
        { label: "View Projects Archive", href: "/projects" },
        { label: "Start a Conversation", href: "/contact" },
      ],
      modelUsed: "knowledge-engine",
    };
  }

  // Technology / Stack
  if (
    q.includes("tech") ||
    q.includes("stack") ||
    q.includes("language") ||
    q.includes("framework") ||
    q.includes("three.js") ||
    q.includes("python") ||
    q.includes("next.js")
  ) {
    return {
      reply: `NADSCA's core architectural standards include:

• **Frontend & 3D**: Next.js 14 (App Router), React, TypeScript 5, Tailwind CSS, Three.js & Custom GLSL Shaders, GSAP.
• **Distributed Backend**: Go (Golang), Python (FastAPI), Node.js, gRPC, Protocol Buffers, GraphQL.
• **Persistence & Streaming**: PostgreSQL, Redis, TimescaleDB, Vector DBs (pgvector/Pinecone), Apache Kafka.
• **Cloud & Edge Mesh**: AWS, GCP, Cloudflare Edge Workers, Docker, Kubernetes, Terraform.
• **AI Systems**: PyTorch, Hugging Face, fine-tuned domain LLMs, and RAG semantic retrieval.`,
      quickActions: [
        { label: "Technology Ecosystem", href: "/#technology" },
        { label: "Explore Cloud & DevOps", href: "/services" },
      ],
      modelUsed: "knowledge-engine",
    };
  }

  // AI & Machine learning
  if (q.includes("ai") || q.includes("machine learning") || q.includes("llm") || q.includes("rag")) {
    return {
      reply: `Our Data & AI practice focuses on production-ready, applied intelligence rather than experimental prototypes:

• **Retrieval-Augmented Generation (RAG)**: Semantic vector retrieval over proprietary enterprise knowledge bases with strict zero-hallucination guardrails.
• **Custom LLM Fine-Tuning**: Domain-specific model adaptation for proprietary classification and reasoning workflows.
• **Real-Time Data Pipelines**: Streaming ETL pipelines built on Kafka and TimescaleDB for automated predictive analytics.`,
      quickActions: [
        { label: "Data & AI Practice", href: "/services" },
        { label: "Discuss AI Project", href: "/contact" },
      ],
      modelUsed: "knowledge-engine",
    };
  }

  // Company / Team / Location
  if (
    q.includes("about") ||
    q.includes("who is natle") ||
    q.includes("who is nadsca") ||
    q.includes("company") ||
    q.includes("team") ||
    q.includes("location") ||
    q.includes("founder") ||
    q.includes("ceo")
  ) {
    return {
      reply: `NADSCA is an executive digital product studio headquartered at No. 283 1/1, Ruwan Mawatha, Colombo 05, Sri Lanka, operating with a global remote and hybrid delivery model.

Leadership & Key Executives:
• **Nilantha Perera** — Founder Chairman & CEO
• **Saman Kumara** — Vice Chairman & Operation
• **Buddhika Dhananjaya** — Chief Technology Officer
• **Dilan Hewage** — Head of Business Development
• **Dileepa Haripriya** — Chief Solution Architect

Strategic Partners:
• **Ramani Jayasekara** — Head of Delivery
• **Hans Pradeep** — International Business Affairs
• **Commander Aruna** — Shilpa - Global HR Solutions

We operate with four foundational principles: Senior Squads Only, Zero Tech Debt Handover, Weekly Working Software Demos, and Fast (not rushed) execution.`,
      quickActions: [
        { label: "About NADSCA", href: "/about" },
        { label: "Careers", href: "/careers" },
      ],
      modelUsed: "knowledge-engine",
    };
  }

  // Default context-aware greeting/help
  return {
    reply: `NADSCA is a specialized software engineering studio building high-throughput systems, cloud architectures, and production AI platforms.

I can provide verified details on:
1. Our 6 Core Engineering Practices (/services)
2. Case studies like Harborline Retail & Meridian Health (/projects)
3. Technology standards (Next.js, Go, Python, Three.js, Kafka)
4. Starting an engagement or scheduling an Architecture Review.

What specific area of our engineering practice would you like to explore?`,
    quickActions: [
      { label: "Our Services", href: "/services" },
      { label: "Project Archive", href: "/projects" },
      { label: "Contact Engineering", href: "/contact" },
    ],
    modelUsed: "knowledge-engine",
  };
}

/**
 * Main AI Dispatcher supporting external LLMs (Gemini / OpenAI / Anthropic)
 * or seamlessly falling back to the Knowledge Engine.
 */
export async function generateAIResponse(
  messages: ChatMessage[],
  currentPath: string = "/"
): Promise<AIResponsePayload> {
  const lastUserMessage = messages[messages.length - 1]?.content || "";
  const systemPrompt = buildSystemPrompt(currentPath);

  // 1. Check for Gemini API key (supports classic AIza... and new AQ.... keys)
  const geminiKey = process.env.GEMINI_API_KEY || process.env.AI_API_KEY;
  if (geminiKey && (geminiKey.startsWith("AIza") || geminiKey.startsWith("AQ.") || geminiKey.length > 20)) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;
      const payload = {
        contents: [
          { role: "user", parts: [{ text: systemPrompt }] },
          ...messages.map((m) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }],
          })),
        ],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 600,
        },
      };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidate) {
          return {
            reply: candidate.trim(),
            modelUsed: "gemini",
            quickActions: [
              { label: "Explore Services", href: "/services" },
              { label: "Start a Project", href: "/contact" },
            ],
          };
        }
      }
    } catch (err) {
      console.warn("Gemini API call failed, using knowledge engine:", err);
    }
  }

  // 2. Check for OpenAI-compatible API key
  const openAIKey = process.env.OPENAI_API_KEY;
  if (openAIKey) {
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openAIKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: systemPrompt },
            ...messages.map((m) => ({ role: m.role, content: m.content })),
          ],
          temperature: 0.3,
          max_tokens: 600,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const text = data.choices?.[0]?.message?.content;
        if (text) {
          return {
            reply: text.trim(),
            modelUsed: "openai",
            quickActions: [
              { label: "Explore Services", href: "/services" },
              { label: "Start a Project", href: "/contact" },
            ],
          };
        }
      }
    } catch (err) {
      console.warn("OpenAI API call failed, using knowledge engine:", err);
    }
  }

  // 3. Fallback to knowledge engine (Deterministic, zero latency, guaranteed accuracy)
  return queryKnowledgeEngine(lastUserMessage, currentPath);
}

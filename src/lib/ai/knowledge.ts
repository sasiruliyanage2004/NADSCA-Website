/**
 * NADSCA Knowledge Base — Source of Truth for Awora AI
 * Derived strictly from verified company data and architecture standards.
 * Hallucination is strictly forbidden.
 */

export interface ServiceDetail {
  slug: string;
  name: string;
  short: string;
  detail: string;
  points: string[];
}

export interface ProjectDetail {
  name: string;
  client: string;
  category: string;
  result: string;
  detail: string;
  techStack: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const NADSCA_COMPANY_PROFILE = {
  name: "NADSCA",
  legalName: "NADSCA",
  tagline: "We engineer software for what's next.",
  summary:
    "Founded in 2026, NADSCA is a software engineering company focused on building intelligent, scalable, and practical software solutions for modern businesses. From custom business applications and enterprise systems to AI-driven solutions and automation, we turn complex business challenges into technology that works. We believe great software should not only be well-built, it should create measurable value for the people and businesses that use it.",
  mission:
    "To engineer intelligent and reliable software solutions that help businesses operate smarter, automate better, and grow with confidence. We combine strong software engineering with modern technologies and artificial intelligence to turn real business challenges into practical digital solutions.",
  vision:
    "To become a trusted technology partner for businesses seeking to transform ideas, processes, and challenges into intelligent software solutions. We envision a future where businesses of every size can access thoughtfully engineered technology that is scalable, adaptable, and built for what comes next.",
  story:
    "NADSCA was founded in 2026 with a clear belief: businesses deserve software that is not only functional, but thoughtfully engineered, intelligent, and built around the way they actually work. Our journey began by building solutions for real operational needs including OHRMS, our human resource management solution, and a Security Patrolling Solution designed to bring greater visibility, control, and efficiency to security operations. Today, NADSCA focuses on building custom software, enterprise systems, AI-driven applications, and intelligent automation for organizations looking to improve how they operate and grow. We may be at the beginning of our journey, but we are building for what comes next.",
  headquarters: "No. 283 1/1, Ruwan Mawatha, Colombo 05, Sri Lanka",
  presence: "Colombo, Sri Lanka with global delivery across APAC, Europe, and North America (Remote / Hybrid)",
  contacts: {
    email: "info@nadsca.dev",
    phonePrimary: "+94 11 250 7601",
    phoneSecondary: "+94 70 465 9847",
    website: "https://nadsca.dev",
  },
  leadership: [
    { name: "Nilantha Perera", role: "Founder Chairman & CEO" },
    { name: "Saman Kumara", role: "Vice Chairman & Operation" },
    { name: "Buddhika Dhananjaya", role: "Chief Technology Officer" },
    { name: "Dilan Hewage", role: "Head of Business Development" },
    { name: "Dileepa Haripriya", role: "Chief Solution Architect" },
  ],
  partners: [
    { name: "Ramani Jayasekara", role: "Head of Delivery" },
    { name: "Hans Pradeep", role: "International Business Affairs" },
    { name: "Commander Aruna", role: "Shilpa - Global HR Solutions" },
  ],
  workingPrinciples: [
    {
      title: "Built for the long term",
      description:
        "We don't build software just to launch it. We engineer solutions with scalability, security, maintainability, and future growth in mind so your technology remains valuable as your business evolves.",
    },
    {
      title: "Business first, technology second",
      description:
        "We start by understanding your goals, challenges, and processes. Then we choose the technology that makes sense. Our goal is not to build more software—it's to build the right solution.",
    },
    {
      title: "Clear at every step",
      description:
        "You should never have to wonder what is happening with your project. We communicate clearly, explain technical decisions in practical terms, and keep you informed from the first conversation to deployment and beyond.",
    },
    {
      title: "Engineering with intelligence",
      description:
        "We combine proven software engineering with modern technologies and AI where they create genuine value from automation and intelligent workflows to data-driven applications and smarter user experiences.",
    },
    {
      title: "We take ownership",
      description:
        "We don't see our role as simply completing a list of requirements. We take responsibility for the solution as a whole—its quality, usability, performance, and ability to deliver real business value.",
    },
    {
      title: "Built to evolve",
      description:
        "Your business will change. Your software should be ready for it. We design solutions that can adapt, integrate, scale, and evolve as your requirements grow.",
    },
    {
      title: "Your challenge. Our engineering. One solution.",
      description:
        "Tell us what you're trying to solve, and we'll help turn it into technology that works to deliver real business value.",
    },
  ],
  benchmarks: {
    productionUptimeSLA: "99.99%",
    avgTimeToMVP: "6 weeks",
    onTimeDeliveryRate: "98.4%",
    productsShipped: "120+",
    globalEdgeLatency: "<14ms P99",
  },
};

export const NADSCA_SERVICES: ServiceDetail[] = [
  {
    slug: "product-engineering",
    name: "Product Engineering",
    short: "Full-stack web and mobile apps built for speed, reliability, and scale.",
    detail:
      "From the first line of code to global production infrastructure, we design and build software systems your users and investors trust. React, Next.js, and native mobile stacks backed by pragmatic architectures.",
    points: [
      "Web & mobile multi-platform applications",
      "Event-driven microservices & API systems architecture",
      "Design systems & custom high-performance UI engineering",
    ],
  },
  {
    slug: "cloud-devops",
    name: "Cloud & DevOps",
    short: "Infrastructure that scales quietly in the background while you focus on the product.",
    detail:
      "We configure hyperscale cloud topologies, multi-region CI/CD pipelines, and deep observability so releases are predictable, automated, and safe to roll back.",
    points: [
      "AWS / GCP / Cloudflare Edge architecture",
      "Automated CI/CD & zero-downtime rolling deployments",
      "Monitoring, distributed tracing & proactive incident response",
    ],
  },
  {
    slug: "data-ai",
    name: "Data & AI Systems",
    short: "Turning raw operational data into autonomous decisions and production AI features.",
    detail:
      "We build streaming data pipelines, semantic vector search, custom LLM fine-tuning, and applied ML features tailored to proprietary client datasets.",
    points: [
      "Real-time data pipelines & warehousing",
      "Applied machine learning & LLM fine-tuning",
      "Analytics dashboards & automated forecasting engines",
    ],
  },
  {
    slug: "product-design",
    name: "Product Design",
    short: "Intuitive digital interfaces grounded in user research and technical constraints.",
    detail:
      "Our product designers work side-by-side with engineers from day one. What gets designed is exactly what ships — thoroughly validated with real users.",
    points: [
      "User research, UX architecture & end-to-end flows",
      "Interactive UI design & micro-interactions",
      "Design tokens & scalable component libraries",
    ],
  },
  {
    slug: "enterprise-systems",
    name: "Enterprise Systems Modernization",
    short: "Modernizing the mission-critical internal tools that keep businesses running.",
    detail:
      "We replace legacy monolithic software and messy spreadsheets with custom internal platforms for inventory, ERP, clinical workflows, and supply-chain logistics.",
    points: [
      "Custom internal operations workspaces",
      "Legacy system migration & data reconciliation",
      "Third-party enterprise ERP/CRM systems integration",
    ],
  },
  {
    slug: "consulting",
    name: "Technology Consulting & Architecture Review",
    short: "Senior engineering judgment to pressure-test your roadmap and architecture.",
    detail:
      "Technical due diligence for investors, architecture scalability audits, and fractional CTO advisory for leadership teams that need senior clarity without full-time overhead.",
    points: [
      "System architecture & code security review",
      "Technical due diligence for M&A / venture capital",
      "Fractional CTO advisory & roadmap planning",
    ],
  },
];

export const NADSCA_PROJECTS: ProjectDetail[] = [
  {
    name: "Harborline Retail",
    client: "Harborline Corporation",
    category: "Retail · Real-time POS & Warehouse Inventory",
    result: "Cut stock reconciliation time by 68% across 24 regional retail stores.",
    detail:
      "A high-availability point-of-sale and synchronized warehouse inventory platform with offline transaction support and sub-second inventory sync.",
    techStack: ["Next.js", "Go Microservices", "PostgreSQL", "Kafka", "Redis"],
  },
  {
    name: "Meridian Health Group",
    client: "Meridian Clinical Network",
    category: "Healthcare · Unified Electronic Health Records",
    result: "Replaced 3 disparate legacy systems with a single unified clinical records platform.",
    detail:
      "Encrypted HIPAA-compliant clinical triage and patient records platform serving hundreds of practitioners with zero reported downtime.",
    techStack: ["React Native", "TypeScript", "Python / FastAPI", "FHIR API"],
  },
  {
    name: "Fernvale Agritech",
    client: "Fernvale Holdings",
    category: "Agriculture · Satellite & Soil Analytics",
    result: "Gave 400+ commercial growers real-time yield forecasts and soil moisture maps from a single app.",
    detail:
      "Geospatial analytics engine aggregating IoT sensor telemetry and satellite imagery for proactive irrigation scheduling.",
    techStack: ["WebGL Maps", "TypeScript", "FastAPI", "TimescaleDB"],
  },
  {
    name: "Crestpoint Capital",
    client: "Crestpoint Financial",
    category: "Fintech · Portfolio & Audit Engine",
    result: "Automated a monthly reporting and audit cycle that previously took 3 days into a real-time job.",
    detail:
      "Quantitative portfolio aggregation and automated risk modeling platform handling multi-currency assets.",
    techStack: ["Next.js", "Python Quant Stack", "AWS Aurora", "Docker"],
  },
  {
    name: "Solano Learning",
    client: "Solano Global Education",
    category: "EdTech · Adaptive Learning Experience",
    result: "Scaled an adaptive curriculum platform to over 12,000 active students.",
    detail:
      "Personalized learning engine with real-time video streaming, automated grading, and teacher analytics dashboards.",
    techStack: ["Next.js", "Node.js", "PostgreSQL", "WebRTC"],
  },
  {
    name: "Ridgeway Logistics",
    client: "Ridgeway Freight Lines",
    category: "Logistics · Live Fleet Dispatch & Routing",
    result: "Real-time dispatch and automated route optimization for 150+ commercial transport vehicles.",
    detail:
      "Driver mobile telemetry application paired with an algorithmic dispatch console to reduce fuel consumption and route delays.",
    techStack: ["React", "Go Workers", "RabbitMQ", "OpenStreetMap"],
  },
];

export const NADSCA_TECH_STACK = {
  frontend: ["Next.js 14", "React", "TypeScript", "Tailwind CSS", "Three.js", "WebGL / Custom Shaders", "GSAP", "Framer Motion"],
  backend: ["Go (Golang)", "Python / FastAPI", "Node.js", "GraphQL", "gRPC", "Protocol Buffers", "RESTful APIs"],
  dataStorage: ["PostgreSQL", "Redis", "TimescaleDB", "Vector Databases (pgvector, Pinecone)", "Kafka", "RabbitMQ"],
  cloudDevOps: ["AWS", "Google Cloud Platform (GCP)", "Cloudflare Edge / Workers", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
  aiMl: ["PyTorch", "Hugging Face Transformers", "Custom LLM Fine-tuning", "Retrieval-Augmented Generation (RAG)", "Vector Embeddings"],
};

export const NADSCA_FAQS: FAQItem[] = [
  {
    category: "Engagement",
    question: "How does NADSCA start a new project?",
    answer:
      "We begin with a focused 1-to-2 week Architecture & Discovery Sprint. We clarify the product vision, define data schemas and system constraints, and establish a milestone delivery plan before starting code.",
  },
  {
    category: "Engagement",
    question: "How long does it take to ship an initial MVP?",
    answer:
      "Our average turnaround to the first working production release is approximately 6 weeks, driven by our senior-only squads and continuous deployment pipelines.",
  },
  {
    category: "Engineering",
    question: "Do you hand over the source code and IP?",
    answer:
      "Yes, 100%. All source code, intellectual property, infrastructure configurations, and documentation belong entirely to you from day one.",
  },
  {
    category: "AI",
    question: "What are NADSCA's AI capabilities?",
    answer:
      "We build applied AI solutions: custom fine-tuned LLM agents, retrieval-augmented generation (RAG) over private enterprise documents, recommendation engines, and computer vision / spatial data pipelines.",
  },
  {
    category: "Contact",
    question: "How can I contact NADSCA to discuss a project?",
    answer:
      "You can email our team directly at info@nadsca.dev, call our Colombo studio at +94 11 250 7601, or click 'Start a Project' on the navigation bar to submit our brief inquiry form.",
  },
];

// Backward compatibility aliases
export const NATLE_COMPANY_PROFILE = NADSCA_COMPANY_PROFILE;
export const NATLE_SERVICES = NADSCA_SERVICES;
export const NATLE_PROJECTS = NADSCA_PROJECTS;
export const NATLE_TECH_STACK = NADSCA_TECH_STACK;
export const NATLE_FAQS = NADSCA_FAQS;

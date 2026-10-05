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
  legalName: "NADSCA (PVT) LTD",
  tagline: "We engineer software for what's next.",
  summary:
    "Founded in 2026, NADSCA is a software engineering company focused on building intelligent, scalable, and practical software solutions for modern businesses. From custom business applications and enterprise systems to AI-driven solutions and automation, we turn complex business challenges into technology that works. We believe great software should not only be well-built, it should create measurable value for the people and businesses that use it.",
  mission:
    "To engineer intelligent and reliable software solutions that help businesses operate smarter, automate better, and grow with confidence. We combine strong software engineering with modern technologies and artificial intelligence to turn real business challenges into practical digital solutions.",
  vision:
    "To become a trusted technology partner for businesses seeking to transform ideas, processes, and challenges into intelligent software solutions. We envision a future where businesses of every size can access thoughtfully engineered technology that is scalable, adaptable, and built for what comes next.",
  story:
    "NADSCA was founded in 2026 with a clear belief: businesses deserve software that is not only functional, but thoughtfully engineered, intelligent, and built around the way they actually work. Our journey began by building solutions for real operational needs including OHRMS, our human resource management solution, and a Security Patrolling Solution designed to bring greater visibility, control, and efficiency to security operations. Today, NADSCA focuses on building custom software, enterprise systems, AI-driven applications, and intelligent automation for organizations looking to improve how they operate and grow. We may be at the beginning of our journey, but we are building for what comes next.",
  headquarters: '# 60/17, “White Whales”, Malalage Mawatha, Dharmarama Road, Malamulla West, Panadura, Sri Lanka',
  presence: "Panadura & Colombo, Sri Lanka with global delivery across APAC, Europe, and North America (Remote / Hybrid)",
  contacts: {
    email: "info@nadsca.com",
    phonePrimary: "+94 76 538 3500",
    phoneSecondary: "+94 70 465 9847",
    website: "https://nadsca.com",
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
    short: "From idea to production — engineered to scale.",
    detail:
      "We turn product ideas into reliable, production-ready software. From the first architectural decision to the systems supporting thousands of users, we build products that are fast, maintainable, and designed for long-term growth.",
    points: [
      "Web & mobile applications",
      "Product platforms & SaaS systems",
      "API & systems architecture",
      "Design systems & UI engineering",
      "Scalable backend systems",
      "Product modernization",
    ],
  },
  {
    slug: "data-ai",
    name: "Data & AI",
    short: "Turn your data into an advantage.",
    detail:
      "We help businesses move beyond dashboards and experiments to deploy AI and data systems that solve real operational problems. From intelligent automation to predictive models and data platforms, we build solutions around your workflows, your data, and your business goals.",
    points: [
      "Data pipelines & modern data platforms",
      "Analytics & executive dashboards",
      "Applied machine learning",
      "AI-powered workflows",
      "Document intelligence",
      "Recommendation & decision systems",
      "Production AI integrations",
    ],
  },
  {
    slug: "product-design",
    name: "Product Design",
    short: "Design that gets built and gets used.",
    detail:
      "Great products happen when design and engineering work together from the beginning. Our designers work alongside engineers to create experiences that are intuitive, technically achievable, and validated with real users.",
    points: [
      "UX research & product discovery",
      "User journeys & interaction flows",
      "Interface & interaction design",
      "Prototyping & validation",
      "Design systems",
      "UI engineering",
    ],
  },
  {
    slug: "enterprise-systems",
    name: "Enterprise Systems",
    short: "Replace operational complexity with systems that work.",
    detail:
      "Disconnected spreadsheets, aging software, and manual processes slow teams down. We design and modernize internal platforms that bring your operations into one reliable, connected system.",
    points: [
      "Custom internal platforms",
      "ERP & operational systems",
      "HR & workforce platforms",
      "Inventory & POS systems",
      "Legacy system modernization",
      "Third-party systems integration",
      "Workflow automation",
    ],
  },
  {
    slug: "technology-consulting",
    name: "Technology Consulting",
    short: "Senior technical thinking when it matters most.",
    detail:
      "Not every business needs a full-time CTO or a large consulting team. Sometimes you need experienced technical judgment at the right moment. We work with founders, leadership teams, and engineering organizations to make better technology decisions — with clarity, evidence, and a focus on business outcomes.",
    points: [
      "Architecture reviews",
      "Technical due diligence",
      "Technology strategy",
      "Code & engineering reviews",
      "Scalability assessments",
      "Technical roadmaps",
      "Fractional CTO support",
    ],
  },
];

export interface ProductDetail {
  slug: string;
  number: string;
  name: string;
  displayTitle: string;
  tagline: string;
  tag: string;
  capabilitiesTitle: string;
  capabilities: string[];
  intelligenceTitle: string;
  intelligenceText: string;
  punchline: string;
}

export const NADSCA_PRODUCTS: ProductDetail[] = [
  {
    slug: "ohrms",
    number: "01",
    name: "OHRMS",
    displayTitle: "01 - OHRMS",
    tagline: "One intelligent platform for your entire workforce.",
    tag: "HR Management Platform",
    capabilitiesTitle: "Built to manage the complete employee lifecycle",
    capabilities: [
      "Employee & workforce management",
      "Attendance & shift management",
      "Payroll processing",
      "Leave & HR administration",
      "Employee performance management",
      "AI-powered performance metrics",
      "Workforce analytics & reporting",
      "Multi-department & multi-location operations",
    ],
    intelligenceTitle: "Intelligent HR. Better decisions.",
    intelligenceText:
      "AI-powered performance insights help management identify patterns, understand workforce productivity, and make more informed decisions.",
    punchline: "One workforce. One system. One source of truth.",
  },
  {
    slug: "ai-security-patrolling",
    number: "02",
    name: "AI SECURITY PATROLLING",
    displayTitle: "02 - AI SECURITY PATROLLING",
    tagline: "See more. Respond faster. Prevent risks before they escalate.",
    tag: "Security Operations",
    capabilitiesTitle: "Intelligent security operations",
    capabilities: [
      "AI-powered camera monitoring",
      "Risk & anomaly detection",
      "Automated security alerts",
      "Patrol & incident management",
      "Real-time situational awareness",
      "AI-assisted human action prediction",
      "Security performance analytics",
      "Centralized monitoring & reporting",
    ],
    intelligenceTitle: "From surveillance to intelligence.",
    intelligenceText:
      "Instead of treating cameras as passive recording devices, transform your security infrastructure into an intelligent layer that helps your team detect, understand, and respond to potential threats.",
    punchline: "Turn every camera into a smarter security asset.",
  },
  {
    slug: "ai-powered-pos",
    number: "03",
    name: "AI-POWERED POS",
    displayTitle: "03 AI-POWERED POS",
    tagline: "Sell smarter. Forecast demand. Know your profitability.",
    tag: "Retail Intelligence",
    capabilitiesTitle: "More than checkout.",
    capabilities: [
      "Point-of-sale management",
      "Product & pricing management",
      "Inventory integration",
      "Real-time sales analytics",
      "AI-powered sales forecasting",
      "Demand prediction",
      "Real-time profitability forecasting",
      "Business performance dashboards",
      "Multi-store & multi-terminal support",
    ],
    intelligenceTitle: "From transactions to business intelligence.",
    intelligenceText:
      "AI analyzes sales patterns and operational data to help predict future demand and provide real-time visibility into profitability. So your POS becomes a decision-making system for your business.",
    punchline: "It becomes a decision-making system for your business.",
  },
  {
    slug: "smart-inventory-distribution",
    number: "04",
    name: "SMART INVENTORY & DISTRIBUTION",
    displayTitle: "04 - SMART INVENTORY & DISTRIBUTION",
    tagline: "Take control of inventory. Simplify distribution. Move faster.",
    tag: "Distribution & Logistics",
    capabilitiesTitle: "Built for fast-moving operations",
    capabilities: [
      "Inventory management",
      "Wholesale & distributor management",
      "Stock movement & tracking",
      "Purchasing & sales management",
      "Order management",
      "Smart operational sheets",
      "Supplier & customer management",
      "Real-time inventory visibility",
      "Business reporting & analytics",
    ],
    intelligenceTitle: "Replace operational complexity with clarity.",
    intelligenceText:
      "Smart workflows and structured operational data help teams reduce manual work, improve visibility, and keep products moving efficiently from supplier to warehouse to customer.",
    punchline: "Less spreadsheet dependency. More control. Better productivity.",
  },
];

export const NATLE_PRODUCTS = NADSCA_PRODUCTS;

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
      "You can email our team directly at info@nadsca.com, call us at +94 76 538 3500 or +94 70 465 9847, or click 'Start a Conversation' / 'Contact' to submit our brief inquiry form.",
  },
];

// Backward compatibility aliases
export const NATLE_COMPANY_PROFILE = NADSCA_COMPANY_PROFILE;
export const NATLE_SERVICES = NADSCA_SERVICES;
export const NATLE_PROJECTS = NADSCA_PROJECTS;
export const NATLE_TECH_STACK = NADSCA_TECH_STACK;
export const NATLE_FAQS = NADSCA_FAQS;

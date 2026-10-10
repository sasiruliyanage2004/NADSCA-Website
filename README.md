<div align="center">
  <img src="public/logo.png" alt="NADSCA" width="120" style="margin-bottom: 20px" />
  <h1>NADSCA</h1>
  <p><b>We engineer software for what&apos;s next.</b></p>
  
  [![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5-black?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![WebGL](https://img.shields.io/badge/WebGL-Three.js-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
  [![GSAP](https://img.shields.io/badge/Animation-GSAP-black?style=for-the-badge&logo=greensock)](https://gsap.com/)
  [![TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-black?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
  [![Security](https://img.shields.io/badge/Security-Turnstile-black?style=for-the-badge&logo=cloudflare)](https://developers.cloudflare.com/turnstile/)
</div>

<br/>

## ✦ Overview

This is the core repository for **NADSCA's** official web platform. Founded in 2026, NADSCA is a software engineering company focused on building intelligent, scalable, and practical software solutions for modern businesses. From custom business applications and enterprise systems to AI-driven solutions and automation, we turn complex business challenges into technology that works.

---

## ✦ Technical Architecture

We prioritize extreme performance, hardware acceleration, and enterprise-grade security:

* **Framework:** Next.js 14 (App Router)
* **Language:** TypeScript 5 (Strict mode)
* **Styling:** Tailwind CSS (Strictly typed with `cn` utility)
* **Typography:** Inter (Display & Body typography)
* **3D & WebGL:** Three.js with custom GLSL Shaders (Hero Aurora Mesh & Interactive Globe)
* **Motion & Animation:** GSAP (ScrollTrigger) & Lenis (Smooth Scroll)
* **AI Engine:** AVORA_AI (Embedded deterministic & LLM-powered studio assistant)
* **Security:** Cloudflare Turnstile (Anti-bot protection on Contact Forms)
* **Icons:** Lucide React

---

## ✦ Key Features

* **Calm, High-End Enterprise Aesthetic:** Deep charcoal surfaces (`#06080F`), subtle borders, and gentle ambient lighting.
* **AVORA_AI Assistant:** Interactive digital studio assistant with verified knowledge grounding.
* **Hardware-Accelerated Layouts:** Horizontal GSAP execution pipelines and interactive spotlight bento grids.
* **SEO & Googlebot Optimization:** Complete server-side rendering, JSON-LD schema markup (`Organization`, `WebSite`, `TechArticle`, `VideoObject`), bot bypass for instant content indexing, and canonical URLs.
* **Uncompromised Security:** Form submissions protected by non-intrusive Cloudflare Turnstile CAPTCHA.

---

## ✦ Quick Start Guide

### 1. Prerequisites
Ensure you have the following installed on your machine:
* **Node.js** (v18.18.0 or higher)
* **npm** (v9 or higher) or **pnpm** / **yarn**
* **Git**

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/sasiruliyanage2004/nadsca-website.git
cd nadsca-website
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_TURNSTILE_SITE_KEY="your_cloudflare_site_key"
TURNSTILE_SECRET_KEY="your_cloudflare_secret_key"
GEMINI_API_KEY="your_gemini_api_key_optional"
```

### 4. Available Commands

Run any of the following standard npm scripts from your terminal:

```bash
# Start local development server (http://localhost:3000)
npm run dev

# Build the optimized production application
npm run build

# Start the built production server locally
npm start

# Run ESLint to verify code quality
npm run lint
```

---

## ✦ Project Structure

```text
nadsca-website/
├── public/
│   ├── images/              # High-resolution optimized visual assets
│   ├── logo.png             # Official brand vector & icon
│   └── og-image.png         # OpenGraph 1200x630 social share preview
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx       # Root layout, global SEO metadata & JSON-LD
│   │   ├── page.tsx         # Homepage
│   │   ├── about/           # About NADSCA & Company Story
│   │   ├── services/        # Engineering Services
│   │   ├── products/        # Proprietary Enterprise Products
│   │   ├── projects/        # Client Case Studies
│   │   ├── blog/            # Articles & Insights with dynamic [slug] pages
│   │   ├── careers/         # Open Roles & Benefits
│   │   ├── contact/         # Contact & Consultation Booking
│   │   ├── sitemap.ts       # Dynamic XML Sitemap generator
│   │   └── robots.ts        # Search engine crawler policies
│   ├── components/          # Reusable UI & WebGL Components
│   ├── lib/                 # Structured data, blog posts, navigation models
│   └── types/               # TypeScript definitions
├── tailwind.config.ts       # Tailwind CSS theme & tokens
├── tsconfig.json            # Strict TypeScript configuration
└── next.config.mjs          # Next.js production optimizations
```

---

## ✦ Deployment

This project is configured and optimized for zero-config deployment on **Vercel**:

1. Push your changes to the `main` branch on GitHub.
2. Import the repository in [Vercel](https://vercel.com).
3. Configure the environment variables (`NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`, `GEMINI_API_KEY`) in the Vercel Project Settings.
4. Deploy!

---

<div align="center">
  <p>Engineered with precision by <b>NADSCA</b>.</p>
</div>

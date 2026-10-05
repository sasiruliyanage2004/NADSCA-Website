<div align="center">
  <img src="public/logo.png" alt="NADSCA" width="120" style="margin-bottom: 20px" />
  <h1>NADSCA</h1>
  <p><b>We engineer software for what&apos;s next.</b></p>
  
  [![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![Three.js](https://img.shields.io/badge/WebGL-Three.js-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
  [![GSAP](https://img.shields.io/badge/Animation-GSAP-black?style=for-the-badge&logo=greensock)](https://gsap.com/)
  [![TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-black?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
  [![Security](https://img.shields.io/badge/Security-Turnstile-black?style=for-the-badge&logo=cloudflare)](https://developers.cloudflare.com/turnstile/)
</div>

<br/>

## ✦ Overview

This is the core repository for **NADSCA's** official web platform. Founded in 2026, NADSCA is a software engineering company focused on building intelligent, scalable, and practical software solutions for modern businesses. From custom business applications and enterprise systems to AI-driven solutions and automation, we turn complex business challenges into technology that works.

## ✦ Technical Architecture

We prioritize extreme performance, hardware acceleration, and security.

* **Framework:** Next.js 14 (App Router)
* **Styling:** Tailwind CSS (Strictly typed with `cn` utility)
* **Typography:** Inter (Display & Body typography)
* **3D & WebGL:** Three.js with custom GLSL Shaders (Hero Aurora & Interactive Globe)
* **Scroll Animations:** GSAP (ScrollTrigger) & Lenis (Smooth Scroll)
* **AI Engine:** Awora AI (Embedded deterministic & LLM-powered studio assistant)
* **Security:** Cloudflare Turnstile (Anti-bot protection on Contact Forms)
* **Icons:** Lucide React

## ✦ Key Features

* **Cinematic Dark Theme:** Tailored dark mode with SVG fractal noise overlays for a premium studio feel.
* **Awora AI Assistant:** Interactive digital studio assistant with verified knowledge grounding.
* **Hardware-Accelerated Layouts:** Horizontal GSAP execution pipelines and spotlight bento grids.
* **Magnetic Interactions:** Floating UI elements that react dynamically to cursor movement.
* **Uncompromised Security:** Form submissions protected by non-intrusive CAPTCHA.

---

## ✦ Quick Start Guide

### 1. Prerequisites
Ensure you have the following installed:
* Node.js (v18 or higher)
* Git

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

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

---

## ✦ Deployment

This project is fully optimized for **Vercel**. 
1. Push the code to the `main` branch.
2. Connect the repository to Vercel.
3. Add the `.env.local` variables to the Vercel dashboard.
4. Deploy!

<br/>
<div align="center">
  <p>Engineered with precision by NADSCA.</p>
</div>

import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import AmbientBackground from "@/components/AmbientBackground";
import ContactForm from "@/components/ContactForm";
import { STUDIO_INFO } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact — NADSCA",
  description:
    "Let's build something meaningful together. Get in touch with the NADSCA team.",
  alternates: {
    canonical: "https://nadsca.dev/contact",
  },
};

export default function ContactPage() {
  return (
    <section className="pt-40 pb-28 bg-mist dark:bg-[#07090E] relative overflow-hidden">
      <AmbientBackground />
      <div className="container-content relative grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start">
        <Reveal>
          {/* Header Tag */}
          <div className="text-azure dark:text-cyan-400 text-xs font-mono font-bold tracking-[0.2em] uppercase mb-4">
            CONTACT
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-ink dark:text-white leading-[1.08] mb-6 tracking-tight">
            Let&apos;s build something meaningful{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400">
              together.
            </span>
          </h1>

          {/* Intro Narrative */}
          <div className="space-y-4 text-base sm:text-lg text-ink/75 dark:text-white/75 leading-relaxed mb-10 max-w-lg">
            <p>
              Have a product idea, a complex technology challenge, or an existing system ready for its next stage?
            </p>
            <p>
              Tell us what you&apos;re working on. Our team will review your requirements and get back to you within{" "}
              <strong className="text-ink dark:text-white font-semibold">
                one business day
              </strong>
              .
            </p>
          </div>

          {/* GET IN TOUCH Block */}
          <div className="pt-8 border-t border-ink/8 dark:border-white/10 space-y-7">
            <div className="text-azure dark:text-cyan-400 text-xs font-mono font-bold tracking-[0.2em] uppercase">
              GET IN TOUCH
            </div>

            {/* Email */}
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-ink/45 dark:text-white/45 font-bold mb-1.5">
                Email
              </p>
              <a
                href={`mailto:${STUDIO_INFO.email}`}
                className="font-medium text-azure dark:text-cyan-400 hover:underline text-base sm:text-lg transition-colors"
              >
                {STUDIO_INFO.email}
              </a>
            </div>

            {/* Phone */}
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-ink/45 dark:text-white/45 font-bold mb-1.5">
                Phone
              </p>
              <div className="space-y-1 font-medium text-ink dark:text-white text-base">
                <p>
                  <a
                    href={`tel:${STUDIO_INFO.phonePrimary.replace(/\s+/g, "")}`}
                    className="hover:text-azure dark:hover:text-cyan-400 transition-colors"
                  >
                    {STUDIO_INFO.phonePrimary}
                  </a>
                </p>
                <p>
                  <a
                    href={`tel:${STUDIO_INFO.phoneSecondary.replace(/\s+/g, "")}`}
                    className="hover:text-azure dark:hover:text-cyan-400 transition-colors"
                  >
                    {STUDIO_INFO.phoneSecondary}
                  </a>
                </p>
              </div>
            </div>

            {/* Company & Address */}
            <div className="pt-1">
              <p className="text-base font-bold text-ink dark:text-white mb-2">
                NADSCA (PVT) LTD
              </p>
              <address className="not-italic text-sm sm:text-[15px] text-ink/70 dark:text-white/70 leading-relaxed space-y-1 font-body">
                <p>#16/17, &ldquo;White Whales&rdquo;,</p>
                <p>Malalage Mawatha, Dharmarama Road,</p>
                <p>Malamulla West, Panadura, Sri Lanka.</p>
              </address>
            </div>
          </div>
        </Reveal>

        {/* Right Side: Interactive Contact Form */}
        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}

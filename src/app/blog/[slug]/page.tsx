import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { DETAILED_BLOG_ARTICLES } from "@/lib/blogArticles";
import { BLOG_POSTS } from "@/lib/data";
import Reveal from "@/components/Reveal";
import CutoutCard from "@/components/CutoutCard";
import AmbientBackground from "@/components/AmbientBackground";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  BookmarkCheck,
} from "lucide-react";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return Object.keys(DETAILED_BLOG_ARTICLES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const article = DETAILED_BLOG_ARTICLES[params.slug];
  if (!article) {
    return { title: "Insight Not Found — NADSCA" };
  }
  return {
    title: `${article.title} — NADSCA Insights`,
    description: article.excerpt,
    alternates: {
      canonical: `https://nadsca.dev/blog/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://nadsca.dev/blog/${article.slug}`,
      type: "article",
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const article = DETAILED_BLOG_ARTICLES[params.slug];

  if (!article) {
    notFound();
  }

  // Get other articles for "Related Insights"
  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== article.slug).slice(
    0,
    3
  );

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    description: article.excerpt,
    image: `https://nadsca.dev${article.image}`,
    datePublished: "2026-10-01T00:00:00.000Z",
    author: {
      "@type": "Organization",
      name: article.author,
      url: "https://nadsca.dev",
    },
    publisher: {
      "@type": "Organization",
      name: "NADSCA",
      logo: {
        "@type": "ImageObject",
        url: "https://nadsca.dev/logo-stacked-dark.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://nadsca.dev/blog/${article.slug}`,
    },
  };

  return (
    <>
      {/* Article Structured Data for Googlebot & Google Discover */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <article className="pt-32 sm:pt-40 pb-20 lg:pb-28 bg-mist dark:bg-[#07090E] relative overflow-hidden">
        <AmbientBackground />

        <div className="container-content relative z-10">
          {/* Top Navigation Row */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-azure dark:text-azure-light hover:text-ink dark:hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              <span>Back to all insights</span>
            </Link>
          </div>

          {/* Article Header */}
          <header className="max-w-4xl mx-auto">
            {/* Meta Row: Category Tag, Date, Read Time */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono mb-5">
              <span className="px-3 py-1 rounded-full bg-ink/5 dark:bg-white/[0.06] border border-ink/10 dark:border-white/10 text-azure dark:text-azure-light font-medium tracking-wide">
                {article.category}
              </span>
              <span className="text-ink/30 dark:text-white/30">&bull;</span>
              <span className="inline-flex items-center gap-1.5 text-ink/60 dark:text-white/60">
                <Calendar className="w-3.5 h-3.5 text-ink/40 dark:text-white/40" />
                {article.publishDate}
              </span>
              <span className="text-ink/30 dark:text-white/30">&bull;</span>
              <span className="inline-flex items-center gap-1.5 text-ink/60 dark:text-white/60">
                <Clock className="w-3.5 h-3.5 text-ink/40 dark:text-white/40" />
                {article.readTime}
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-ink dark:text-white leading-[1.12] tracking-tight">
              {article.title}
            </h1>

            {/* Subtitle / Excerpt */}
            <p className="mt-6 text-lg sm:text-xl text-ink/75 dark:text-white/75 leading-relaxed font-normal">
              {article.subtitle}
            </p>

            {/* Author Byline Bar */}
            <div className="mt-8 pt-6 border-t border-ink/8 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-ink/5 dark:bg-white/[0.06] border border-ink/10 dark:border-white/10 flex items-center justify-center text-ink/80 dark:text-white/80 font-bold font-mono text-xs shrink-0">
                  {article.author.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="font-bold text-sm sm:text-base text-ink dark:text-white">
                    {article.author}
                  </div>
                  <div className="text-xs font-mono text-ink/50 dark:text-white/50">
                    {article.authorRole} &middot; NADSCA
                  </div>
                </div>
              </div>

              {/* Tag Chips */}
              <div className="hidden sm:flex flex-wrap items-center gap-2">
                {article.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-md bg-ink/[0.03] dark:bg-white/[0.04] border border-ink/6 dark:border-white/5 text-[11px] font-mono text-ink/50 dark:text-white/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </header>

          {/* Hero Image Container */}
          <div className="max-w-4xl mx-auto my-10 sm:my-14">
            <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden border border-ink/8 dark:border-white/10 shadow-xl bg-slate-950">
              <Image
                src={article.image}
                alt={article.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07090E]/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Article Main Body Container */}
          <div className="max-w-3xl mx-auto space-y-12">
            {/* Key Takeaways Card */}
            {article.keyTakeaways && article.keyTakeaways.length > 0 && (
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B0F17] border border-ink/8 dark:border-white/10 shadow-sm relative overflow-hidden">
                <div className="flex items-center gap-2 text-ink/60 dark:text-white/60 font-mono text-xs font-semibold uppercase tracking-wider mb-4">
                  <BookmarkCheck className="w-4 h-4 text-azure dark:text-azure-light" />
                  <span>Executive Key Takeaways</span>
                </div>
                <ul className="space-y-3">
                  {article.keyTakeaways.map((takeaway, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm sm:text-base text-ink/80 dark:text-white/80 leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500/80 shrink-0 mt-1" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Article Content Sections */}
            {article.sections.map((sec, secIdx) => (
              <section key={secIdx} className="space-y-5">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink dark:text-white tracking-tight">
                  {sec.heading}
                </h2>

                {sec.content.map((para, paraIdx) => (
                  <p
                    key={paraIdx}
                    className="text-base sm:text-[17px] text-ink/75 dark:text-white/75 leading-relaxed"
                  >
                    {para}
                  </p>
                ))}

                {sec.callout && (
                  <div className="p-5 sm:p-6 rounded-2xl bg-ink/[0.02] dark:bg-white/[0.02] border-l-2 border-azure dark:border-azure-light my-6">
                    <div className="text-xs font-mono font-semibold text-azure dark:text-azure-light uppercase tracking-wider mb-1.5">
                      {sec.callout.title}
                    </div>
                    <p className="text-sm sm:text-base text-ink/80 dark:text-white/85 leading-relaxed font-normal">
                      {sec.callout.description}
                    </p>
                  </div>
                )}
              </section>
            ))}

            {/* Bottom Engagement & Action Box */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#0C0F17] border border-ink/8 dark:border-white/10 text-ink dark:text-white shadow-sm relative overflow-hidden mt-14">
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="max-w-md">
                  <div className="inline-flex items-center gap-2 text-azure dark:text-azure-light text-xs font-mono font-semibold uppercase tracking-wider mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Next Steps</span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight">
                    Discuss this insight with our engineering team
                  </h3>
                  <p className="text-sm text-ink/70 dark:text-white/70 mt-2 leading-relaxed">
                    Have questions about applying these patterns or technologies to your operations? We&apos;re here to build with you.
                  </p>
                </div>

                <Link
                  href={`/contact?subject=${encodeURIComponent(
                    `Inquiry regarding ${article.title}`
                  )}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-white dark:bg-white dark:text-black font-semibold text-sm hover:opacity-90 transition-opacity shrink-0 shadow-sm"
                >
                  <span>Talk with Engineers</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Related Articles Grid */}
          <div className="max-w-6xl mx-auto mt-24 pt-16 border-t border-ink/8 dark:border-white/10">
            <div className="flex items-center justify-between mb-10">
              <div>
                <span className="text-xs font-mono font-semibold text-ink/50 dark:text-white/50 uppercase tracking-widest block mb-1">
                  MORE THOUGHT LEADERSHIP
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-ink dark:text-white tracking-tight">
                  Related Insights &amp; Articles
                </h3>
              </div>
              <Link
                href="/blog"
                className="text-xs font-mono font-semibold text-azure dark:text-azure-light hover:underline uppercase"
              >
                View all &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
              {relatedPosts.map((post, i) => (
                <Reveal key={post.slug} delay={i * 0.08}>
                  <CutoutCard
                    href={`/blog/${post.slug}`}
                    badge={i === 0 ? "POPULAR" : "INSIGHT"}
                    tag={post.category.toUpperCase()}
                    title={post.title}
                    description={post.excerpt}
                    image={post.image}
                    authorName={post.author}
                    metaText={post.readTime}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

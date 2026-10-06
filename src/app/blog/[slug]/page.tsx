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
  User,
  Share2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  BookmarkCheck,
  Send,
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
    openGraph: {
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

  return (
    <>
      <article className="pt-32 sm:pt-40 pb-20 lg:pb-28 bg-mist dark:bg-[#07090E] relative overflow-hidden">
        <AmbientBackground />

        <div className="container-content relative z-10">
          {/* Top Navigation Row */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-azure dark:text-cyan-400 hover:text-ink dark:hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              <span>Back to all insights</span>
            </Link>
          </div>

          {/* Article Header */}
          <header className="max-w-4xl mx-auto">
            {/* Meta Row: Category Tag, Date, Read Time */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono mb-5">
              <span className="px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 font-bold uppercase tracking-wider">
                {article.category}
              </span>
              <span className="text-white/30">&bull;</span>
              <span className="inline-flex items-center gap-1.5 text-ink/60 dark:text-white/60">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                {article.publishDate}
              </span>
              <span className="text-white/30">&bull;</span>
              <span className="inline-flex items-center gap-1.5 text-ink/60 dark:text-white/60">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                {article.readTime}
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-ink dark:text-white leading-[1.12] tracking-tight">
              {article.title}
            </h1>

            {/* Subtitle / Excerpt */}
            <p className="mt-6 text-lg sm:text-xl text-ink/75 dark:text-white/75 leading-relaxed font-medium">
              {article.subtitle}
            </p>

            {/* Author Byline Bar */}
            <div className="mt-8 pt-6 border-t border-ink/8 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-cyan-400 to-emerald-400 p-0.5 shrink-0">
                  <div className="w-full h-full rounded-full bg-[#0B0F17] flex items-center justify-center text-cyan-300 font-bold font-mono text-sm">
                    {article.author.slice(0, 2).toUpperCase()}
                  </div>
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
                    className="px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/5 text-[11px] font-mono text-white/50"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </header>

          {/* Hero Image Container */}
          <div className="max-w-4xl mx-auto my-10 sm:my-14">
            <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden border border-ink/8 dark:border-white/10 shadow-2xl bg-slate-950">
              <Image
                src={article.image}
                alt={article.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07090E]/80 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Article Main Body Container */}
          <div className="max-w-3xl mx-auto space-y-12">
            {/* Key Takeaways Card */}
            {article.keyTakeaways && article.keyTakeaways.length > 0 && (
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B0F17] border border-ink/8 dark:border-white/10 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-400/5 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider mb-4">
                  <BookmarkCheck className="w-4 h-4 text-cyan-400" />
                  <span>Executive Key Takeaways</span>
                </div>
                <ul className="space-y-3">
                  {article.keyTakeaways.map((takeaway, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm sm:text-base text-ink/80 dark:text-white/80 leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
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
                  <div className="p-5 sm:p-6 rounded-2xl bg-cyan-500/5 border-l-4 border-cyan-400 border-ink/10 dark:border-white/10 my-6">
                    <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-1.5">
                      {sec.callout.title}
                    </div>
                    <p className="text-sm sm:text-base text-ink/80 dark:text-white/85 leading-relaxed font-medium">
                      {sec.callout.description}
                    </p>
                  </div>
                )}
              </section>
            ))}

            {/* Bottom Engagement & Action Box */}
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0B0F17] to-[#121722] border border-white/10 text-white shadow-2xl relative overflow-hidden mt-14">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="max-w-md">
                  <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Next Steps</span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight">
                    Discuss this insight with our engineering team
                  </h3>
                  <p className="text-sm text-white/70 mt-2 leading-relaxed">
                    Have questions about applying these patterns or technologies to your operations? We&apos;re here to build with you.
                  </p>
                </div>

                <Link
                  href={`/contact?subject=${encodeURIComponent(
                    `Inquiry regarding ${article.title}`
                  )}`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-slate-950 font-bold text-sm hover:bg-cyan-400 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shrink-0"
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
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-1">
                  MORE THOUGHT LEADERSHIP
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-ink dark:text-white tracking-tight">
                  Related Insights &amp; Articles
                </h3>
              </div>
              <Link
                href="/blog"
                className="text-xs font-mono font-bold text-azure dark:text-cyan-400 hover:underline uppercase"
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

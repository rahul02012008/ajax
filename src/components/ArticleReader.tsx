import React, { useState, useEffect } from 'react';
import { Article } from '../data/articles';
import { getResponsiveImageSrcSet } from '../utils/seoImage';
import {
  ArrowLeft,
  Bookmark,
  Share2,
  Check,
  Maximize2,
  Volume2,
  Layers,
  ArrowRight,
  HelpCircle,
  CheckCircle2,
  XCircle,
  FileText
} from 'lucide-react';

interface ArticleReaderProps {
  article: Article;
  allArticles: Article[];
  onBack: () => void;
  onNavigate: (path: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onOpenLightbox: (imageUrl: string, caption: string, credit: string, palette: Article['palette']) => void;
}

export const ArticleReader: React.FC<ArticleReaderProps> = ({
  article,
  allArticles,
  onBack,
  onNavigate,
  isBookmarked,
  onToggleBookmark,
  onOpenLightbox,
}) => {
  const [readingProgress, setReadingProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [isLargeText, setIsLargeText] = useState(false);
  const [heroImgFailed, setHeroImgFailed] = useState(false);

  // Track scroll position for reading progress
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article.id]);

  const handleCopyLink = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2400);
    }
  };

  const handleCopyHex = (hex: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(hex);
      setCopiedHex(hex);
      setTimeout(() => setCopiedHex(null), 2000);
    }
  };

  // Find 2 related articles
  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id)
    .slice(0, 2);

  return (
    <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
      <article className="min-h-screen bg-[#FAF8F5] pb-24">
        {/* Top Reading Progress Bar */}
        <div
          className="fixed top-0 left-0 right-0 h-1 bg-[#8C6D53] z-50 transition-all duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        role="progressbar"
        aria-valuenow={readingProgress}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {/* Reader Secondary Utility Bar */}
      <div className="sticky top-20 z-30 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E7E2DA] py-3">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onBack();
            }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#655F58] hover:text-[#191716] font-medium transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Journal Index</span>
          </a>

          <div className="flex items-center gap-3">
            {/* Font Size Toggle */}
            <button
              onClick={() => setIsLargeText(!isLargeText)}
              className="px-2.5 py-1 text-xs text-[#655F58] hover:text-[#191716] border border-[#DDD6CC] rounded-sm transition-colors cursor-pointer"
              title="Toggle reading text size"
            >
              {isLargeText ? 'A-' : 'A+'}
            </button>

            {/* Bookmark */}
            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`p-1.5 border rounded-sm transition-colors cursor-pointer ${
                isBookmarked
                  ? 'bg-[#EFEAE2] border-[#8C6D53] text-[#8C6D53]'
                  : 'border-[#DDD6CC] text-[#655F58] hover:text-[#191716]'
              }`}
              title={isBookmarked ? 'Saved to list' : 'Save for later'}
            >
              <Bookmark className="w-3.5 h-3.5" fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>

            {/* Share / Copy Link */}
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs uppercase tracking-wider text-[#655F58] hover:text-[#191716] border border-[#DDD6CC] rounded-sm transition-colors cursor-pointer"
              title="Share article link"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copiedLink ? 'Copied' : 'Share'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Article Header & Typography Lead */}
      <header className="max-w-4xl mx-auto px-6 pt-12 pb-8">
        
        {/* SEO Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-xs text-[#7A746C]">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onBack();
            }}
            className="hover:text-[#191716] transition-colors"
          >
            Home
          </a>
          <span aria-hidden="true" className="text-[#C5BEB5]">/</span>
          <span className="uppercase tracking-wider font-medium text-[#8C6D53]">{article.category}</span>
          <span aria-hidden="true" className="text-[#C5BEB5]">/</span>
          <span aria-current="page" className="text-[#191716] font-medium truncate max-w-[280px]">
            {article.title}
          </span>
        </nav>

        {/* Unboxed Metadata (Zero-Pill Discipline) */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#7A746C] mb-4">
          <span className="font-semibold text-[#8C6D53] tracking-widest uppercase">{article.kicker}</span>
          <span aria-hidden="true" className="text-[#CCC4B9]">·</span>
          <span>{article.readTime}</span>
          <span aria-hidden="true" className="text-[#CCC4B9]">·</span>
          <span>{article.wordCount} words</span>
          <span aria-hidden="true" className="text-[#CCC4B9]">·</span>
          <span>{article.date}</span>
        </div>

        {/* The Single Exact <h1> for this Page (Strict SEO Rule) */}
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-[46px] leading-[1.12] font-normal text-[#191716] tracking-tight mb-6 text-balance">
          {article.title}
        </h1>

        {/* Subtitle / Deck */}
        <p className="text-lg lg:text-xl text-[#4E4842] leading-relaxed font-light mb-8 max-w-3xl">
          {article.subtitle}
        </p>

        {/* Curatorial Credit Lockup */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-y border-[#EAE4DC] text-xs">
          <div>
            <div className="font-semibold text-[#191716] uppercase tracking-wider">
              {article.author.name}
            </div>
            <div className="text-[#7A746C] mt-0.5">
              {article.author.role} — {article.author.location}
            </div>
          </div>

          <div className="flex items-center gap-4 text-[#7A746C]">
            <div className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#8C6D53]" />
              <span>Full Long-Form Study</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5 text-[#8C6D53]" />
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>

      </header>

      {/* Featured Full-Width Photographic Hero (Responsive & CLS-optimized) */}
      <div className="max-w-5xl mx-auto px-6 mb-12">
        <div className="relative group bg-[#EFE9DF] border border-[#DDD6CC] rounded-sm overflow-hidden aspect-[16/9] shadow-xs">
          {!heroImgFailed ? (
            <img
              src={article.featuredImage.url}
              srcSet={getResponsiveImageSrcSet(article.featuredImage.url) || undefined}
              sizes="(max-width: 1024px) 100vw, 1024px"
              alt={article.featuredImage.alt}
              width={article.featuredImage.width || 1600}
              height={article.featuredImage.height || 900}
              loading="eager"
              // @ts-expect-error React 19 / DOM supports fetchPriority
              fetchPriority="high"
              decoding="async"
              referrerPolicy="no-referrer"
              onError={() => setHeroImgFailed(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#ECE7DF] to-[#DFD8CC]">
              <span className="font-serif text-3xl text-[#8C6D53]">{article.title}</span>
            </div>
          )}

          {/* Lightbox Trigger */}
          <button
            onClick={() =>
              onOpenLightbox(
                article.featuredImage.url,
                article.featuredImage.caption,
                article.featuredImage.credit,
                article.palette
              )
            }
            className="absolute top-4 right-4 p-2.5 bg-[#FAF8F5]/90 hover:bg-[#FAF8F5] text-[#191716] rounded-sm transition-opacity border border-[#DDD6CC] shadow-sm cursor-pointer"
            title="Inspect photograph full screen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Figure Caption with EXIF/Architect credit */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-3 px-1 text-xs">
          <p className="font-serif italic text-[#655F58]">
            {article.featuredImage.caption}
          </p>
          <span className="text-[11px] tracking-wider uppercase text-[#8C6D53] font-medium shrink-0">
            {article.featuredImage.credit}
          </span>
        </div>
      </div>

      {/* Main Reading Column (65–75ch measure per constitution) */}
      <div className="max-w-2xl mx-auto px-6">
        
        {/* Chapters: Question-and-Answer Subheadings (AEO Requirement) */}
        {article.chapters.map((chapter, idx) => (
          <section key={chapter.id} className="mb-14">
            
            {/* Natural Question Subheading (h2) */}
            <h2 className="font-serif text-2xl lg:text-[28px] font-medium text-[#191716] mb-3 tracking-tight">
              {chapter.title}
            </h2>

            {/* Direct Concise Answer Sentence (AEO / Answer Engine Optimization Snippet) */}
            {chapter.directAnswer && (
              <div className="p-4 bg-[#F2ECE3] border-l-2 border-[#8C6D53] text-[#191716] font-medium text-sm leading-relaxed mb-6 rounded-xs shadow-2xs">
                <span className="text-xs uppercase tracking-wider text-[#8C6D53] block mb-1 font-semibold">
                  Quick Answer / Executive Summary
                </span>
                {chapter.directAnswer}
              </div>
            )}

            {/* Expanded Paragraphs with Drop Cap on First Chapter */}
            {chapter.content.map((paragraph, pIdx) => {
              const isFirstEver = idx === 0 && pIdx === 0;
              return (
                <p
                  key={pIdx}
                  className={`text-[#2D2A26] ${
                    isLargeText ? 'text-lg leading-[1.85]' : 'text-base leading-[1.8]'
                  } mb-6 font-light ${
                    isFirstEver
                      ? 'first-letter:text-5xl first-letter:font-serif first-letter:font-normal first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:text-[#191716]'
                      : ''
                  }`}
                >
                  {paragraph}
                </p>
              );
            })}

            {/* Comparison Table if Present (e.g. Limewash vs Microcement, Cabinet Hinges) */}
            {chapter.comparisonTable && (
              <div className="my-8 overflow-x-auto border border-[#E7E2DA] rounded-sm bg-[#FAF8F5]">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#F0EAE2] border-b border-[#E7E2DA]">
                      <th className="p-3.5 font-semibold text-[#191716] uppercase tracking-wider w-1/4">
                        Criterion
                      </th>
                      <th className="p-3.5 font-semibold text-[#8C6D53] uppercase tracking-wider w-3/8">
                        {chapter.comparisonTable.headerA}
                      </th>
                      <th className="p-3.5 font-semibold text-[#191716] uppercase tracking-wider w-3/8">
                        {chapter.comparisonTable.headerB}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAE4DC]">
                    {chapter.comparisonTable.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-[#F8F5F0] transition-colors">
                        <td className="p-3.5 font-medium text-[#191716] align-top bg-[#FBF9F6]">
                          {row.feature}
                        </td>
                        <td className="p-3.5 text-[#4E4842] align-top leading-relaxed">
                          {row.optionA}
                        </td>
                        <td className="p-3.5 text-[#4E4842] align-top leading-relaxed">
                          {row.optionB}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pros and Cons Box if Present (e.g. Yakisugi siding) */}
            {chapter.prosAndCons && (
              <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 bg-[#F4F8F4] border border-[#D0E2D0] rounded-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <h3 className="text-xs uppercase tracking-wider font-semibold text-emerald-900">
                      Architectural Advantages (Pros)
                    </h3>
                  </div>
                  <ul className="space-y-2 text-xs text-[#2A442A]">
                    {chapter.prosAndCons.pros.map((pro, prIdx) => (
                      <li key={prIdx} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 bg-[#FAF4F4] border border-[#E8D0D0] rounded-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <XCircle className="w-4 h-4 text-amber-800" />
                    <h3 className="text-xs uppercase tracking-wider font-semibold text-amber-950">
                      Considerations & Tradeoffs (Cons)
                    </h3>
                  </div>
                  <ul className="space-y-2 text-xs text-[#4A2D2D]">
                    {chapter.prosAndCons.cons.map((con, cnIdx) => (
                      <li key={cnIdx} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-amber-700 font-bold">•</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Step-by-Step Guide if Present (e.g. Limewash application for beginners) */}
            {chapter.stepList && (
              <div className="my-8 space-y-4">
                <h3 className="text-xs uppercase tracking-widest font-semibold text-[#8C6D53]">
                  Step-by-Step Application Protocol
                </h3>
                <div className="space-y-3">
                  {chapter.stepList.map((item) => (
                    <div
                      key={item.step}
                      className="p-4 bg-[#FAF8F5] border border-[#E7E2DA] rounded-sm flex gap-4 items-start"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#191716] text-[#FAF8F5] flex items-center justify-center font-mono text-xs font-semibold shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="font-serif text-base font-medium text-[#191716] mb-1">
                          {item.title}
                        </h4>
                        <p className="text-xs text-[#59534C] leading-relaxed font-light">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Editorial Pull Quote if present */}
            {chapter.pullQuote && (
              <figure className="my-10 py-6 border-y border-[#E5DFD5] text-center">
                <blockquote className="font-serif italic text-xl lg:text-2xl text-[#191716] leading-relaxed max-w-xl mx-auto">
                  “{chapter.pullQuote}”
                </blockquote>
                <figcaption className="text-xs tracking-widest uppercase text-[#8C6D53] font-medium mt-3">
                  — Spatial Thesis Note
                </figcaption>
              </figure>
            )}

            {/* In-Article Detail Photography if available */}
            {chapter.imageDetail && (
              <div className="my-10 bg-[#EFE9DF] border border-[#DDD6CC] rounded-sm overflow-hidden">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={chapter.imageDetail.url}
                    srcSet={getResponsiveImageSrcSet(chapter.imageDetail.url) || undefined}
                    sizes="(max-width: 768px) 100vw, 768px"
                    alt={chapter.imageDetail.alt || chapter.imageDetail.caption}
                    width={chapter.imageDetail.width || 1200}
                    height={chapter.imageDetail.height || 800}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 bg-[#FAF8F5] border-t border-[#EAE4DC] flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                  <span className="font-serif italic text-[#655F58]">
                    {chapter.imageDetail.caption}
                  </span>
                  {chapter.imageDetail.architectOrStudio && (
                    <span className="text-[10px] tracking-wider uppercase text-[#8C6D53] font-medium">
                      {chapter.imageDetail.architectOrStudio}
                    </span>
                  )}
                </div>
              </div>
            )}

          </section>
        ))}

        {/* Key Architectural Principle Box */}
        <div className="p-8 bg-[#F3EDE3] border-l-2 border-[#8C6D53] rounded-sm my-12">
          <div className="text-xs uppercase tracking-widest font-semibold text-[#8C6D53] mb-2">
            Architectural Principle
          </div>
          <p className="font-serif text-lg text-[#191716] leading-relaxed">
            {article.keyTakeaway}
          </p>
        </div>

        {/* AEO Frequently Asked Questions (Structured for Conversational Engines) */}
        {article.faq && article.faq.length > 0 && (
          <section className="my-14 border-t border-[#EAE4DC] pt-10">
            <div className="flex items-center gap-2 mb-2">
              <HelpCircle className="w-4 h-4 text-[#8C6D53]" />
              <h2 className="font-serif text-2xl font-medium text-[#191716]">
                Frequently Asked Questions on {article.mainKeyword}
              </h2>
            </div>
            <p className="text-xs text-[#7A746C] mb-8">
              Authoritative answers to common architectural and material inquiries.
            </p>

            <div className="space-y-6">
              {article.faq.map((item, fIdx) => (
                <div
                  key={fIdx}
                  className="p-5 bg-[#FAF8F5] border border-[#E7E2DA] rounded-sm shadow-2xs"
                >
                  <h3 className="font-serif text-lg font-medium text-[#191716] mb-2">
                    {item.question}
                  </h3>
                  <div className="text-sm text-[#191716] font-medium mb-2 leading-relaxed bg-[#F4EFE6] p-3 rounded-xs border-l-2 border-[#8C6D53]">
                    <span className="text-[11px] uppercase tracking-wider text-[#8C6D53] block mb-0.5 font-bold">
                      Direct Answer
                    </span>
                    {item.quickAnswer}
                  </div>
                  <p className="text-sm text-[#59534C] leading-relaxed font-light">
                    {item.fullAnswer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Room Material Palette Explorer */}
        <section className="my-14 border-t border-[#EAE4DC] pt-10">
          <div className="flex items-center gap-2 mb-2">
            <Layers className="w-4 h-4 text-[#8C6D53]" />
            <h3 className="text-xs uppercase tracking-widest font-semibold text-[#191716]">
              Material & Tone Archetypes
            </h3>
          </div>
          <p className="text-xs text-[#7A746C] mb-6">
            Click any swatch to copy the hexadecimal architectural value.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {article.palette.map((color) => {
              const isCopied = copiedHex === color.hex;
              return (
                <button
                  key={color.name}
                  onClick={() => handleCopyHex(color.hex)}
                  className="flex flex-col text-left group p-3 rounded-sm border border-[#E7E2DA] hover:border-[#8C6D53] bg-[#FAF8F5] transition-all cursor-pointer"
                >
                  <div
                    className="w-full h-14 rounded-xs mb-3 shadow-inner border border-black/5"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="font-medium text-xs text-[#191716] group-hover:text-[#8C6D53] transition-colors">
                    {color.name}
                  </div>
                  <div className="text-[11px] text-[#7A746C] line-clamp-1 mt-0.5">
                    {color.material}
                  </div>
                  <div className="font-mono text-[10px] text-[#9A938A] mt-2 flex items-center justify-between">
                    <span>{color.hex}</span>
                    <span className="text-[#8C6D53] font-sans font-medium text-[9px] uppercase">
                      {isCopied ? 'Copied' : 'Copy'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Architectural Technical Specifications */}
        <section className="my-14 border-t border-[#EAE4DC] pt-10">
          <h3 className="text-xs uppercase tracking-widest font-semibold text-[#191716] mb-6">
            Spatial Specifications
          </h3>
          <dl className="divide-y divide-[#EAE4DC] border-y border-[#EAE4DC] text-xs">
            {article.specifications.map((spec) => (
              <div key={spec.label} className="py-3 flex items-center justify-between">
                <dt className="text-[#7A746C]">{spec.label}</dt>
                <dd className="font-mono font-medium text-[#191716]">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </section>

      </div>

      {/* Related Articles Footer Section (Descriptive Anchor Texts for SEO) */}
      <section className="max-w-4xl mx-auto px-6 mt-16 pt-12 border-t border-[#E7E2DA]">
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-serif text-2xl font-medium text-[#191716]">
            Further Spatial Inquiries
          </h3>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onBack();
            }}
            className="text-xs uppercase tracking-wider text-[#8C6D53] hover:text-[#191716] font-medium"
          >
            Index View →
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {relatedArticles.map((rel) => (
            <div
              key={rel.id}
              className="group p-5 border border-[#E7E2DA] hover:border-[#8C6D53] rounded-sm bg-[#FAF8F5] transition-all flex flex-col justify-between"
            >
              <div>
                <a
                  href={rel.path}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(rel.path);
                  }}
                  className="aspect-[16/10] bg-[#EFE9DF] rounded-xs overflow-hidden mb-4 block"
                >
                  <img
                    src={rel.featuredImage.url}
                    alt={rel.featuredImage.alt}
                    width={rel.featuredImage.width || 1200}
                    height={rel.featuredImage.height || 800}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </a>
                <div className="text-[11px] uppercase tracking-wider text-[#8C6D53] font-semibold mb-1">
                  {rel.category} · {rel.readTime}
                </div>
                <h4 className="font-serif text-lg text-[#191716] group-hover:text-[#8C6D53] transition-colors leading-snug mb-3">
                  <a
                    href={rel.path}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(rel.path);
                    }}
                  >
                    {rel.title}
                  </a>
                </h4>
              </div>

              {/* Context-Specific Anchor Text Link */}
              <div className="border-t border-[#F0EAE2] pt-3 mt-2">
                <a
                  href={rel.path}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(rel.path);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs text-[#191716] group-hover:text-[#8C6D53] font-medium transition-colors"
                >
                  <span>{rel.descriptiveAnchor}</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      </article>
    </main>
  );
};

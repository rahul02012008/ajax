import React, { useState, useEffect } from 'react';
import { Article } from '../data/articles';
import {
  ArrowLeft,
  Bookmark,
  Share2,
  Check,
  Maximize2,
  Volume2,
  Layers,
  ArrowRight,
  ZoomIn,
  ZoomOut
} from 'lucide-react';

interface ArticleReaderProps {
  article: Article;
  allArticles: Article[];
  onBack: () => void;
  onReadArticle: (id: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onOpenLightbox: (imageUrl: string, caption: string, credit: string, palette: Article['palette']) => void;
}

export const ArticleReader: React.FC<ArticleReaderProps> = ({
  article,
  allArticles,
  onBack,
  onReadArticle,
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
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#655F58] hover:text-[#191716] font-medium transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Journal</span>
          </button>

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
        
        {/* Unboxed Metadata (Zero-Pill Discipline) */}
        <div className="flex items-center gap-2 text-xs text-[#7A746C] mb-4">
          <span className="font-semibold text-[#8C6D53] tracking-widest uppercase">{article.kicker}</span>
          <span aria-hidden="true" className="text-[#CCC4B9]">/</span>
          <span className="uppercase tracking-wider font-medium text-[#191716]">{article.category}</span>
          <span aria-hidden="true" className="text-[#CCC4B9]">·</span>
          <span>{article.readTime}</span>
          <span aria-hidden="true" className="text-[#CCC4B9]">·</span>
          <span>{article.date}</span>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-[46px] leading-[1.12] font-normal text-[#191716] tracking-tight mb-6 text-balance">
          {article.title}
        </h1>

        {/* Subtitle */}
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

          <div className="flex items-center gap-2 text-[#7A746C]">
            <Volume2 className="w-3.5 h-3.5 text-[#8C6D53]" />
            <span>Estimated listening: {article.readTime}</span>
          </div>
        </div>

      </header>

      {/* Featured Full-Width Photographic Hero */}
      <div className="max-w-5xl mx-auto px-6 mb-12">
        <div className="relative group bg-[#EFE9DF] border border-[#DDD6CC] rounded-sm overflow-hidden aspect-[16/9] shadow-xs">
          {!heroImgFailed ? (
            <img
              src={article.featuredImage.url}
              alt={article.featuredImage.alt}
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

        {/* Elegant Figure Caption (Per editorial reference) */}
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
        
        {/* Editorial Drop Cap Opening Chapter */}
        {article.chapters.map((chapter, idx) => (
          <section key={chapter.id} className="mb-14">
            
            {/* Natural Editorial Numbering Heading */}
            <h2 className="font-serif text-2xl lg:text-[26px] font-medium text-[#191716] mb-5 tracking-tight">
              {String(idx + 1).padStart(2, '0')}. {chapter.title}
            </h2>

            {/* Paragraphs with optional drop cap on very first paragraph */}
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
                    alt={chapter.imageDetail.caption}
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

        {/* Key Takeaway Monograph Box */}
        <div className="p-8 bg-[#F3EDE3] border-l-2 border-[#8C6D53] rounded-sm my-12">
          <div className="text-xs uppercase tracking-widest font-semibold text-[#8C6D53] mb-2">
            Architectural Principle
          </div>
          <p className="font-serif text-lg text-[#191716] leading-relaxed">
            {article.keyTakeaway}
          </p>
        </div>

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

        {/* Architectural Technical Specifications (Pattern B Accession Grid) */}
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

      {/* Related Articles Footer Section */}
      <section className="max-w-4xl mx-auto px-6 mt-16 pt-12 border-t border-[#E7E2DA]">
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-serif text-2xl font-medium text-[#191716]">
            Further Inquiries
          </h3>
          <button
            onClick={onBack}
            className="text-xs uppercase tracking-wider text-[#8C6D53] hover:text-[#191716] font-medium"
          >
            Index View →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {relatedArticles.map((rel) => (
            <div
              key={rel.id}
              onClick={() => onReadArticle(rel.id)}
              className="group cursor-pointer p-5 border border-[#E7E2DA] hover:border-[#8C6D53] rounded-sm bg-[#FAF8F5] transition-all"
            >
              <div className="aspect-[16/10] bg-[#EFE9DF] rounded-xs overflow-hidden mb-4">
                <img
                  src={rel.featuredImage.url}
                  alt={rel.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="text-[11px] uppercase tracking-wider text-[#8C6D53] font-semibold mb-1">
                {rel.category} · {rel.readTime}
              </div>
              <h4 className="font-serif text-lg text-[#191716] group-hover:text-[#8C6D53] transition-colors leading-snug">
                {rel.title}
              </h4>
            </div>
          ))}
        </div>
      </section>

    </article>
  );
};

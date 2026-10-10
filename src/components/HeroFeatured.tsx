import React, { useState } from 'react';
import { Article } from '../data/articles';
import { ArrowRight, Bookmark, Maximize2 } from 'lucide-react';

interface HeroFeaturedProps {
  article: Article;
  onNavigate: (path: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onOpenLightbox: (imageUrl: string, caption: string, credit: string, palette: Article['palette']) => void;
}

export const HeroFeatured: React.FC<HeroFeaturedProps> = ({
  article,
  onNavigate,
  isBookmarked,
  onToggleBookmark,
  onOpenLightbox,
}) => {
  const [imgSrc, setImgSrc] = useState(article.featuredImage.url);
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <section className="border-b border-[#E7E2DA] pb-16 pt-8">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Editorial Lead Kicker */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs tracking-[0.2em] uppercase font-semibold text-[#8C6D53]">
            Cover Monograph · Volume IV
          </div>
          <div className="text-xs font-serif italic text-[#7A746C]">
            Featured Spatial Study
          </div>
        </div>

        {/* 2-Column Split: Dominant Story and Architectural Framing */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Typographic Prominence (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Unboxed Metadata (Zero-Pill Discipline) */}
              <div className="flex items-center gap-2 text-xs text-[#7A746C] mb-4">
                <span className="font-medium text-[#191716] uppercase tracking-wider">{article.category}</span>
                <span aria-hidden="true" className="text-[#C5BEB5]">·</span>
                <span>{article.readTime}</span>
                <span aria-hidden="true" className="text-[#C5BEB5]">·</span>
                <span>{article.date}</span>
              </div>

              {/* Cover Article Headline (h2 to preserve single h1 rule on homepage) */}
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] leading-[1.12] font-medium text-[#191716] tracking-tight hover:text-[#8C6D53] transition-colors mb-5">
                <a
                  href={article.path}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(article.path);
                  }}
                  className="cursor-pointer text-balance"
                >
                  {article.title}
                </a>
              </h2>

              {/* Subtitle / Deck */}
              <p className="text-[#4E4842] text-base lg:text-lg leading-relaxed font-normal mb-6">
                {article.subtitle}
              </p>

              {/* Author Byline */}
              <div className="border-t border-[#EAE4DC] pt-4 mb-8">
                <div className="text-xs text-[#8C6D53] uppercase tracking-wider font-semibold">
                  By {article.author.name}
                </div>
                <div className="text-xs text-[#7A746C] mt-0.5">
                  {article.author.role} · {article.author.location}
                </div>
              </div>
            </div>

            {/* Actions: Context-Specific Anchor Text (SEO Requirement) */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={article.path}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(article.path);
                }}
                className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#191716] text-[#FAF8F5] text-xs tracking-wider uppercase font-medium hover:bg-[#8C6D53] transition-colors rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8C6D53] cursor-pointer"
                title={article.descriptiveAnchor}
              >
                <span>{article.descriptiveAnchor}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </a>

              <button
                onClick={() => onToggleBookmark(article.id)}
                className={`p-3.5 border rounded-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8C6D53] cursor-pointer ${
                  isBookmarked
                    ? 'bg-[#EFEAE2] border-[#8C6D53] text-[#8C6D53]'
                    : 'border-[#DDD6CC] hover:bg-[#F2ECE3] text-[#4E4842]'
                }`}
                aria-label={isBookmarked ? 'Remove from saved' : 'Save for later'}
                title={isBookmarked ? 'Saved' : 'Save for later'}
              >
                <Bookmark className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>

          {/* Right Column: Hero High-Resolution Photography (7 cols) */}
          <div className="lg:col-span-7">
            <div className="relative group overflow-hidden bg-[#ECE6DD] border border-[#DDD6CC] rounded-sm shadow-sm aspect-[16/10] sm:aspect-[16/9]">
              {!imgFailed ? (
                <img
                  src={imgSrc}
                  alt={article.featuredImage.alt}
                  width={article.featuredImage.width || 1600}
                  height={article.featuredImage.height || 900}
                  loading="eager"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={() => {
                    if (imgSrc !== article.featuredImage.fallbackUrl) {
                      setImgSrc(article.featuredImage.fallbackUrl);
                    } else {
                      setImgFailed(true);
                    }
                  }}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
              ) : (
                <div className="w-full h-full flex flex-col justify-center items-center p-8 bg-gradient-to-br from-[#ECE7DF] to-[#E2DDD3] text-[#655F58]">
                  <div className="w-12 h-12 border border-[#8C6D53]/40 flex items-center justify-center font-serif text-xl mb-3">
                    K
                  </div>
                  <div className="font-serif text-lg text-center max-w-md text-[#191716]">
                    {article.featuredImage.caption}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-[#8C6D53] mt-2">
                    {article.category} Study
                  </div>
                </div>
              )}

              {/* Photo Lightbox Affordance */}
              <button
                onClick={() =>
                  onOpenLightbox(
                    imgSrc,
                    article.featuredImage.caption,
                    article.featuredImage.credit,
                    article.palette
                  )
                }
                className="absolute top-4 right-4 p-2.5 bg-[#FAF8F5]/90 hover:bg-[#FAF8F5] text-[#191716] rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-[#DDD6CC] shadow-sm focus:opacity-100 cursor-pointer"
                aria-label="Inspect photography full screen"
                title="Expand photography"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Photo Caption Strip */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-[#191716]/80 via-[#191716]/40 to-transparent text-[#FAF8F5]">
                <p className="text-xs font-serif italic text-white/90">
                  {article.featuredImage.caption}
                </p>
                <span className="text-[10px] tracking-wider uppercase text-white/70 block mt-0.5">
                  {article.featuredImage.credit}
                </span>
              </div>
            </div>

            {/* Room Material Palette Micro-Bar */}
            <div className="mt-3 flex items-center justify-between gap-2 px-1">
              <span className="text-[11px] uppercase tracking-wider text-[#7A746C] font-medium">
                Palette:
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                {article.palette.map((color) => (
                  <div
                    key={color.name}
                    className="flex items-center gap-1.5 text-[11px] text-[#655F58]"
                    title={`${color.name}: ${color.material} (${color.hex})`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-black/10 inline-block shadow-2xs"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="hidden sm:inline font-mono text-[10px] text-[#7A746C]">{color.name}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

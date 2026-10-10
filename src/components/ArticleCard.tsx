import React, { useState } from 'react';
import { Article } from '../data/articles';
import { ArrowUpRight, Bookmark, Maximize2 } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  index: number;
  onNavigate: (path: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onOpenLightbox: (imageUrl: string, caption: string, credit: string, palette: Article['palette']) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  index,
  onNavigate,
  isBookmarked,
  onToggleBookmark,
  onOpenLightbox,
}) => {
  const [imgSrc, setImgSrc] = useState(article.featuredImage.url);
  const [imgFailed, setImgFailed] = useState(false);

  // Natural editorial numbering format (e.g. 02, 03 per constitution)
  const editorialIndex = String(index + 1).padStart(2, '0');

  return (
    <article className="group flex flex-col justify-between bg-[#FAF8F5] border border-[#E7E2DA] hover:border-[#D5CDC2] transition-all duration-300 rounded-sm overflow-hidden p-6">
      <div>
        
        {/* Visual Media Framing */}
        <div className="relative aspect-[4/3] bg-[#EFE9DF] overflow-hidden rounded-sm mb-5 border border-[#E4DDD2]">
          {!imgFailed ? (
            <img
              src={imgSrc}
              alt={article.featuredImage.alt}
              width={article.featuredImage.width || 1200}
              height={article.featuredImage.height || 900}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              onError={() => {
                if (imgSrc !== article.featuredImage.fallbackUrl) {
                  setImgSrc(article.featuredImage.fallbackUrl);
                } else {
                  setImgFailed(true);
                }
              }}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#EFEAE2] to-[#E2DDD3]">
              <span className="font-serif text-2xl text-[#8C6D53]">{editorialIndex}</span>
              <span className="text-xs font-serif text-[#191716] text-center mt-2">
                {article.featuredImage.caption}
              </span>
            </div>
          )}

          {/* Lightbox inspection button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenLightbox(
                imgSrc,
                article.featuredImage.caption,
                article.featuredImage.credit,
                article.palette
              );
            }}
            className="absolute top-3 right-3 p-2 bg-[#FAF8F5]/90 hover:bg-[#FAF8F5] text-[#191716] rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-[#DDD6CC] shadow-2xs cursor-pointer"
            aria-label={`Inspect photograph for ${article.title}`}
            title="Inspect photograph"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>

          {/* Quick Palette Bar on hover */}
          <div className="absolute bottom-2 left-2 flex items-center gap-1.5 p-1 bg-[#FAF8F5]/90 backdrop-blur-xs rounded-xs border border-[#E4DDD2] opacity-0 group-hover:opacity-100 transition-opacity">
            {article.palette.map((c) => (
              <span
                key={c.name}
                className="w-2.5 h-2.5 rounded-full inline-block border border-black/10"
                style={{ backgroundColor: c.hex }}
                title={`${c.name}: ${c.material}`}
              />
            ))}
          </div>
        </div>

        {/* Clean Unboxed Metadata Line (Zero-Pill Discipline) */}
        <div className="flex items-center justify-between text-xs text-[#7A746C] mb-2.5">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-[#8C6D53]">{editorialIndex}.</span>
            <span className="font-medium text-[#191716] uppercase tracking-wider">{article.category}</span>
            <span aria-hidden="true" className="text-[#CCC4B9]">·</span>
            <span>{article.readTime}</span>
          </div>

          <button
            onClick={() => onToggleBookmark(article.id)}
            className={`p-1.5 transition-colors focus:outline-none cursor-pointer ${
              isBookmarked ? 'text-[#8C6D53]' : 'text-[#A09A91] hover:text-[#191716]'
            }`}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
            title={isBookmarked ? 'Saved' : 'Save for later'}
          >
            <Bookmark className="w-3.5 h-3.5" fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Primary Title as h3 on grid (preserving single h1 hierarchy) */}
        <h3 className="font-serif text-xl lg:text-[22px] leading-snug font-medium text-[#191716] group-hover:text-[#8C6D53] transition-colors mb-3">
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
        </h3>

        {/* Concise Excerpt */}
        <p className="text-[#59534C] text-sm leading-relaxed line-clamp-3 mb-4 font-normal">
          {article.excerpt}
        </p>

      </div>

      {/* Footer: Descriptive Anchor Text for SEO Internal Linking */}
      <div className="border-t border-[#EAE4DC] pt-4 mt-2 flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs">
          <div className="text-[#7A746C] truncate max-w-[180px]">
            By <span className="text-[#35312C] font-medium">{article.author.name}</span>
          </div>
          <span className="text-[11px] font-mono text-[#8C6D53]">{article.date}</span>
        </div>

        <a
          href={article.path}
          onClick={(e) => {
            e.preventDefault();
            onNavigate(article.path);
          }}
          className="inline-flex items-center justify-between gap-1.5 text-xs text-[#191716] group-hover:text-[#8C6D53] transition-colors font-medium border-t border-[#F0EAE2] pt-2 mt-1 cursor-pointer"
          title={article.descriptiveAnchor}
        >
          <span className="line-clamp-1">{article.descriptiveAnchor}</span>
          <ArrowUpRight className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </article>
  );
};

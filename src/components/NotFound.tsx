import React from 'react';
import { ArrowLeft, ArrowUpRight, Compass, Search, Home } from 'lucide-react';
import { ARTICLES } from '../data/articles';

interface NotFoundProps {
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

export const NotFound: React.FC<NotFoundProps> = ({ onNavigate, onOpenSearch }) => {
  // Select 4 core pillar articles to link to
  const featuredPillars = ARTICLES.slice(0, 4);

  return (
    <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
      <div className="min-h-[75vh] flex flex-col justify-center items-center px-6 py-20 text-center max-w-4xl mx-auto">
        {/* Subtle Architectural Kicker */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EFE9DF] rounded-xs text-[11px] uppercase tracking-[0.2em] font-mono text-[#8C6D53] mb-6">
          <Compass className="w-3.5 h-3.5" />
          <span>Spatial Disconnect · 404</span>
        </div>

        {/* Primary Heading */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#191716] tracking-tight mb-4 text-balance">
          The requested space does not exist.
        </h1>

        {/* Friendly explanation */}
        <p className="text-base sm:text-lg text-[#59534C] max-w-xl mx-auto font-light leading-relaxed mb-8">
          The page or architectural monograph you are looking for may have been relocated, archived, or never built. Let us guide you back to our curated spatial studies.
        </p>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
            }}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#191716] text-[#FAF8F5] text-xs uppercase tracking-wider font-medium hover:bg-[#8C6D53] transition-colors rounded-sm cursor-pointer shadow-xs"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Journal Home</span>
          </a>

          <button
            onClick={onOpenSearch}
            className="inline-flex items-center gap-2 px-6 py-3.5 border border-[#DDD6CC] bg-[#FAF8F5] text-[#191716] text-xs uppercase tracking-wider font-medium hover:bg-[#F2ECE3] transition-colors rounded-sm cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-[#8C6D53]" />
            <span>Search All Monographs</span>
          </button>
        </div>

        {/* Curated Main Pages Directory */}
        <div className="w-full border-t border-[#E7E2DA] pt-12 text-left">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs uppercase tracking-widest text-[#8C6D53] font-semibold">
              Explore Core Spatial Monographs
            </span>
            <span className="text-xs text-[#7A746C] font-mono">
              Volume IV
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featuredPillars.map((article, idx) => (
              <a
                key={article.id}
                href={article.path}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(article.path);
                }}
                className="group p-5 bg-[#FAF8F5] border border-[#E7E2DA] hover:border-[#8C6D53] hover:bg-[#FDFBF7] rounded-sm transition-all flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#7A746C] mb-1.5 font-mono">
                    <span className="text-[#8C6D53] uppercase">{article.category}</span>
                    <span>0{idx + 1}</span>
                  </div>
                  <h3 className="font-serif text-lg font-medium text-[#191716] group-hover:text-[#8C6D53] transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-[#59534C] mt-2 line-clamp-2 font-light">
                    {article.excerpt}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F0EAE2] flex items-center justify-between text-xs text-[#191716] font-medium group-hover:text-[#8C6D53]">
                  <span>{article.descriptiveAnchor}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </a>
            ))}
          </div>

          {/* Quick Breadcrumb back */}
          <div className="mt-8 text-center">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/');
              }}
              className="inline-flex items-center gap-1.5 text-xs text-[#7A746C] hover:text-[#191716] font-medium underline underline-offset-4 decoration-[#DDD6CC] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Or view all 10 curated essays on the index</span>
            </a>
          </div>
        </div>

      </div>
    </main>
  );
};

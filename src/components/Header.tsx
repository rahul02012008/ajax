import React from 'react';
import { Bookmark, Search, BookOpen } from 'lucide-react';

interface HeaderProps {
  currentCategory: string;
  onSelectCategory: (cat: string) => void;
  bookmarksCount: number;
  onOpenBookmarks: () => void;
  onOpenSearch: () => void;
  onOpenColophon: () => void;
  activeArticleId: string | null;
  onBackToHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  onSelectCategory,
  bookmarksCount,
  onOpenBookmarks,
  onOpenSearch,
  onOpenColophon,
  activeArticleId,
  onBackToHome,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E7E2DA] transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Zone 1: Brand title wordmark (single text element) */}
        <button
          onClick={onBackToHome}
          className="text-left group cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8C6D53]"
          aria-label="KURA Journal Home"
        >
          <span className="font-serif text-2xl lg:text-3xl tracking-[0.18em] font-medium text-[#191716] group-hover:text-[#8C6D53] transition-colors">
            K U R A
          </span>
        </button>

        {/* Zone 2: 4-6 nav links, 1-2 word labels, single line text with hover underlines */}
        <nav className="hidden md:flex items-center gap-8 text-[13px] tracking-widest uppercase font-medium text-[#655F58]">
          <button
            onClick={() => {
              onBackToHome();
              onSelectCategory('All');
            }}
            className={`transition-colors py-1 border-b ${
              !activeArticleId && currentCategory === 'All'
                ? 'text-[#191716] border-[#191716]'
                : 'border-transparent hover:text-[#191716] hover:border-[#191716]'
            }`}
          >
            All Essays
          </button>
          
          <button
            onClick={() => {
              onBackToHome();
              onSelectCategory('Architecture');
            }}
            className={`transition-colors py-1 border-b ${
              !activeArticleId && currentCategory === 'Architecture'
                ? 'text-[#191716] border-[#191716]'
                : 'border-transparent hover:text-[#191716] hover:border-[#191716]'
            }`}
          >
            Architecture
          </button>

          <button
            onClick={() => {
              onBackToHome();
              onSelectCategory('Materials');
            }}
            className={`transition-colors py-1 border-b ${
              !activeArticleId && currentCategory === 'Materials'
                ? 'text-[#191716] border-[#191716]'
                : 'border-transparent hover:text-[#191716] hover:border-[#191716]'
            }`}
          >
            Materials
          </button>

          <button
            onClick={() => {
              onBackToHome();
              onSelectCategory('Millwork');
            }}
            className={`transition-colors py-1 border-b ${
              !activeArticleId && currentCategory === 'Millwork'
                ? 'text-[#191716] border-[#191716]'
                : 'border-transparent hover:text-[#191716] hover:border-[#191716]'
            }`}
          >
            Millwork
          </button>

          <button
            onClick={() => {
              onBackToHome();
              onSelectCategory('Philosophy');
            }}
            className={`transition-colors py-1 border-b ${
              !activeArticleId && currentCategory === 'Philosophy'
                ? 'text-[#191716] border-[#191716]'
                : 'border-transparent hover:text-[#191716] hover:border-[#191716]'
            }`}
          >
            Philosophy
          </button>

          <button
            onClick={onOpenColophon}
            className="transition-colors py-1 border-b border-transparent hover:text-[#191716] hover:border-[#191716]"
          >
            Colophon
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 text-xs tracking-wider uppercase text-[#655F58] hover:text-[#191716] px-3 py-2 rounded transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8C6D53]"
            aria-label="Search articles"
          >
            <Search className="w-4 h-4 text-[#8C6D53]" />
            <span className="hidden sm:inline">Search</span>
          </button>

          <button
            onClick={onOpenBookmarks}
            className="relative flex items-center gap-2 text-xs tracking-wider uppercase text-[#191716] bg-[#F1EBE3] hover:bg-[#E8E0D5] px-3.5 py-2 rounded-sm transition-colors border border-[#DDD6CC] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8C6D53]"
            aria-label="Open reading list"
          >
            <Bookmark className="w-3.5 h-3.5 text-[#8C6D53]" />
            <span className="hidden sm:inline font-medium">Saved</span>
            {bookmarksCount > 0 && (
              <span className="text-[11px] font-sans font-semibold tabular-nums ml-0.5 text-[#8C6D53]">
                {bookmarksCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

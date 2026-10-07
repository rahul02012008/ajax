import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';

interface SearchFilterBarProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalArticles: number;
  filteredCount: number;
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  totalArticles,
  filteredCount,
}) => {
  return (
    <div className="py-8 border-b border-[#E7E2DA]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Interactive Filter Segmented Control (Allowed per constitution) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`px-4 py-2 text-xs uppercase tracking-wider font-medium rounded-sm transition-all whitespace-nowrap cursor-pointer border ${
                    isActive
                      ? 'bg-[#191716] text-[#FAF8F5] border-[#191716]'
                      : 'bg-transparent text-[#655F58] border-transparent hover:text-[#191716] hover:bg-[#F0EAE2]'
                  }`}
                >
                  {cat === 'All' ? 'All Monographies' : cat}
                </button>
              );
            })}
          </div>

          {/* Search Box and Article Count */}
          <div className="flex items-center gap-4">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search essays, materials, architect..."
                className="w-full bg-[#F5EFE6] border border-[#DDD6CC] pl-9 pr-8 py-2 text-xs text-[#191716] placeholder:text-[#948E85] rounded-sm focus:outline-none focus:border-[#8C6D53] focus:bg-[#FAF8F5] transition-colors"
              />
              <Search className="w-3.5 h-3.5 text-[#948E85] absolute left-3 top-2.5" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-2.5 text-[#948E85] hover:text-[#191716]"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Readout count (tabular numerals) */}
            <div className="hidden sm:block text-xs text-[#7A746C] whitespace-nowrap font-sans tabular-nums">
              <span>{filteredCount}</span> of <span>{totalArticles}</span> studies
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

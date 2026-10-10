import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ARTICLES, Article, MaterialColor } from './data/articles';
import { Header } from './components/Header';
import { HeroFeatured } from './components/HeroFeatured';
import { SearchFilterBar } from './components/SearchFilterBar';
import { ArticleCard } from './components/ArticleCard';
import { ArticleReader } from './components/ArticleReader';
import { LightboxModal } from './components/LightboxModal';
import { ReadingListDrawer } from './components/ReadingListDrawer';
import { ColophonModal } from './components/ColophonModal';
import { Footer } from './components/Footer';
import { SEOHead } from './components/SEOHead';

const BOOKMARKS_STORAGE_KEY = 'kura_bookmarked_articles_v2';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [isReadingListOpen, setIsReadingListOpen] = useState(false);
  const [isColophonOpen, setIsColophonOpen] = useState(false);

  // Lightbox Modal state
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    imageUrl: string;
    caption: string;
    credit: string;
    palette?: MaterialColor[];
  }>({
    isOpen: false,
    imageUrl: '',
    caption: '',
    credit: '',
  });

  // Client-side SEO routing: listen to popstate
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Load bookmarks on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
      if (stored) {
        setBookmarkedIds(JSON.parse(stored));
      }
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, []);

  // Programmatic navigation function that updates URL and history
  const navigate = useCallback((path: string) => {
    if (path !== window.location.pathname) {
      window.history.pushState(null, '', path);
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Toggle bookmark handler
  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id];
      try {
        localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore
      }
      return next;
    });
  };

  const clearAllBookmarks = () => {
    setBookmarkedIds([]);
    try {
      localStorage.removeItem(BOOKMARKS_STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  const handleOpenLightbox = (
    imageUrl: string,
    caption: string,
    credit: string,
    palette?: MaterialColor[]
  ) => {
    setLightbox({
      isOpen: true,
      imageUrl,
      caption,
      credit,
      palette,
    });
  };

  const handleCloseLightbox = () => {
    setLightbox((prev) => ({ ...prev, isOpen: false }));
  };

  // Find active article based on current path
  const currentArticle = useMemo(() => {
    if (currentPath === '/' || currentPath === '') return null;
    return ARTICLES.find((a) => a.path === currentPath || a.slug === currentPath.replace('/', '')) || null;
  }, [currentPath]);

  // Filter and search articles for homepage
  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((article) => {
      const matchesCategory =
        activeCategory === 'All' || article.category === activeCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const matchTitle = article.title.toLowerCase().includes(q);
      const matchSubtitle = article.subtitle.toLowerCase().includes(q);
      const matchAuthor = article.author.name.toLowerCase().includes(q);
      const matchCategory = article.category.toLowerCase().includes(q);
      const matchKeywords =
        article.mainKeyword.toLowerCase().includes(q) ||
        article.relatedKeywords.some((k) => k.toLowerCase().includes(q));
      const matchMaterials = article.palette.some(
        (p) => p.name.toLowerCase().includes(q) || p.material.toLowerCase().includes(q)
      );

      return (
        matchTitle ||
        matchSubtitle ||
        matchAuthor ||
        matchCategory ||
        matchKeywords ||
        matchMaterials
      );
    });
  }, [activeCategory, searchQuery]);

  // Lead cover story is Article 1 when no filter/search active
  const leadArticle = ARTICLES[0];
  const gridArticles =
    activeCategory === 'All' && !searchQuery.trim()
      ? filteredArticles.slice(1)
      : filteredArticles;

  // Saved articles objects
  const savedArticlesList = useMemo(() => {
    return ARTICLES.filter((a) => bookmarkedIds.includes(a.id));
  }, [bookmarkedIds]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#191716] flex flex-col font-sans selection:bg-[#E8DFD5] selection:text-[#191716]">
      {/* Dynamic SEO Head & Structured Data Manager */}
      <SEOHead article={currentArticle} path={currentPath} />

      {/* Top Bar Contract Navigation */}
      <Header
        currentCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setSearchQuery('');
          navigate('/');
        }}
        bookmarksCount={bookmarkedIds.length}
        onOpenBookmarks={() => setIsReadingListOpen(true)}
        onOpenSearch={() => {
          if (currentArticle) {
            navigate('/');
          }
          const inputEl = document.querySelector('input[type="text"]') as HTMLInputElement;
          if (inputEl) inputEl.focus();
        }}
        onOpenColophon={() => setIsColophonOpen(true)}
        activePath={currentPath}
        onNavigateHome={() => navigate('/')}
      />

      {/* Dedicated Article Page vs Homepage View */}
      {currentArticle ? (
        <ArticleReader
          article={currentArticle}
          allArticles={ARTICLES}
          onBack={() => navigate('/')}
          onNavigate={navigate}
          isBookmarked={bookmarkedIds.includes(currentArticle.id)}
          onToggleBookmark={toggleBookmark}
          onOpenLightbox={handleOpenLightbox}
        />
      ) : (
        <main className="flex-1">
          {/* Main Homepage Header Banner: Exactly ONE h1 on Homepage (SEO Rule) */}
          <div className="border-b border-[#E7E2DA] bg-[#FAF8F5] pt-10 pb-6">
            <div className="max-w-7xl mx-auto px-6">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C6D53] block mb-2">
                Editorial Review · Vol. IV
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-[44px] leading-tight font-medium text-[#191716] tracking-tight text-balance">
                Warm Minimalist Architecture & Spatial Design
              </h1>
              <p className="text-sm lg:text-base text-[#655F58] mt-2 max-w-2xl font-light leading-relaxed">
                Explore KURA, a curated journal exploring warm minimalist architecture, spatial reductionism, and tactile materials for tranquil interior living.
              </p>
            </div>
          </div>

          {/* Cover Monograph (Hero Section) on unfiltered home */}
          {activeCategory === 'All' && !searchQuery.trim() && (
            <HeroFeatured
              article={leadArticle}
              onNavigate={navigate}
              isBookmarked={bookmarkedIds.includes(leadArticle.id)}
              onToggleBookmark={toggleBookmark}
              onOpenLightbox={handleOpenLightbox}
            />
          )}

          {/* Interactive Filter & Search Controls */}
          <SearchFilterBar
            categories={['All', 'Architecture', 'Materials', 'Millwork', 'Lighting', 'Philosophy']}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            totalArticles={ARTICLES.length}
            filteredCount={filteredArticles.length}
          />

          {/* Editorial Articles Grid Section */}
          <section className="py-12 lg:py-16">
            <div className="max-w-7xl mx-auto px-6">
              
              {/* Section Header (h2) */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E7E2DA]">
                <div>
                  <h2 className="font-serif text-2xl lg:text-3xl font-medium text-[#191716]">
                    {activeCategory === 'All'
                      ? searchQuery.trim()
                        ? `Search Results for “${searchQuery}”`
                        : 'Curated Monographies'
                      : `${activeCategory} Studies`}
                  </h2>
                  <p className="text-xs text-[#7A746C] mt-1 font-light">
                    Essays on spatial reductionism, tactile materials, and the elimination of visual noise.
                  </p>
                </div>

                <div className="text-xs tracking-wider uppercase text-[#8C6D53] font-mono">
                  {gridArticles.length} {gridArticles.length === 1 ? 'Essay' : 'Essays'}
                </div>
              </div>

              {/* Grid or Empty Search State */}
              {gridArticles.length === 0 ? (
                <div className="py-24 text-center bg-[#FAF8F5] border border-[#E7E2DA] rounded-sm p-8">
                  <span className="font-serif text-2xl text-[#191716] block mb-2">
                    No matching monographies found
                  </span>
                  <p className="text-xs text-[#7A746C] max-w-sm mx-auto mb-6">
                    We could not locate any essays matching “{searchQuery}”. Try searching for materials like “lime”, “walnut”, “tatami”, or browse by discipline.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('All');
                    }}
                    className="px-5 py-2.5 bg-[#191716] text-[#FAF8F5] text-xs uppercase tracking-wider font-medium rounded-sm hover:bg-[#8C6D53] transition-colors cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {gridArticles.map((article, index) => {
                    const realIndex =
                      activeCategory === 'All' && !searchQuery.trim()
                        ? index + 1
                        : index;
                    return (
                      <ArticleCard
                        key={article.id}
                        article={article}
                        index={realIndex}
                        onNavigate={navigate}
                        isBookmarked={bookmarkedIds.includes(article.id)}
                        onToggleBookmark={toggleBookmark}
                        onOpenLightbox={handleOpenLightbox}
                      />
                    );
                  })}
                </div>
              )}

            </div>
          </section>

          {/* Architectural Quote Interlude */}
          <section className="py-16 bg-[#F2ECE3] border-y border-[#E4DDD2]">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C6D53] block mb-4">
                Core Architectural Philosophy
              </span>
              <blockquote className="font-serif italic text-2xl sm:text-3xl text-[#191716] leading-relaxed mb-4 text-balance">
                “Simplicity is not the lack of clutterness, that's simply a consequence of simplicity. Simplicity is somehow essentially describing the purpose and place of an object and building.”
              </blockquote>
              <cite className="text-xs uppercase tracking-widest text-[#7A746C] not-italic font-medium">
                — On Reductionist Space & Living
              </cite>
            </div>
          </section>
        </main>
      )}

      {/* Editorial Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setSearchQuery('');
          navigate('/');
        }}
        onNavigate={navigate}
        onOpenColophon={() => setIsColophonOpen(true)}
      />

      {/* Lightbox Modal for High-Resolution Photography Inspection */}
      <LightboxModal
        isOpen={lightbox.isOpen}
        onClose={handleCloseLightbox}
        imageUrl={lightbox.imageUrl}
        caption={lightbox.caption}
        credit={lightbox.credit}
        palette={lightbox.palette}
      />

      {/* Personal Archive / Saved Articles Drawer */}
      <ReadingListDrawer
        isOpen={isReadingListOpen}
        onClose={() => setIsReadingListOpen(false)}
        savedArticles={savedArticlesList}
        onNavigate={navigate}
        onRemoveBookmark={toggleBookmark}
        onClearAll={clearAllBookmarks}
      />

      {/* Colophon & Manifesto Modal */}
      <ColophonModal
        isOpen={isColophonOpen}
        onClose={() => setIsColophonOpen(false)}
      />
    </div>
  );
}

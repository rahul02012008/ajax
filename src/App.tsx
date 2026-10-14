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
import { HelpCircle, ArrowRight, Compass, Sparkles, Feather } from 'lucide-react';

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
        <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
          {/* Main Homepage Header Banner: Exactly ONE h1 on Homepage (SEO Rule) */}
          <div className="border-b border-[#E7E2DA] bg-[#FAF8F5] pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-6">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C6D53] block mb-2">
                Curated Architectural Monographs · Volume IV
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-[46px] leading-[1.12] font-medium text-[#191716] tracking-tight text-balance">
                Japandi Interior Design Architecture & Warm Minimalism
              </h1>
              <p className="text-sm lg:text-base text-[#59534C] mt-3 max-w-3xl font-light leading-relaxed">
                Explore KURA's curated architectural monographs on Japandi interior design architecture, wabi sabi house aesthetics, organic modern tectonics, and soft minimalism for tranquil interior living.
              </p>

              {/* Quick Pillar Jump Navigation with Context-Rich Anchor Texts */}
              <div className="mt-6 pt-5 border-t border-[#EAE4DC] flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#655F58]">
                <span className="text-[11px] uppercase tracking-wider text-[#8C6D53] font-semibold">
                  Featured Studies:
                </span>
                <a
                  href="/architecture/modern-kyoto-machiya"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/architecture/modern-kyoto-machiya');
                  }}
                  className="hover:text-[#191716] underline decoration-[#DDD6CC] underline-offset-4 font-medium"
                >
                  Modern Japanese Machiya Townhouses
                </a>
                <span className="text-[#C5BEB5]">·</span>
                <a
                  href="/materials/microcement-lime-wash-surfaces"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/materials/microcement-lime-wash-surfaces');
                  }}
                  className="hover:text-[#191716] underline decoration-[#DDD6CC] underline-offset-4 font-medium"
                >
                  Limewash vs Microcement Walls
                </a>
                <span className="text-[#C5BEB5]">·</span>
                <a
                  href="/millwork/flush-joinery-concealed-storage"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/millwork/flush-joinery-concealed-storage');
                  }}
                  className="hover:text-[#191716] underline decoration-[#DDD6CC] underline-offset-4 font-medium"
                >
                  Hidden Storage & Flush Joinery
                </a>
                <span className="text-[#C5BEB5]">·</span>
                <a
                  href="/philosophy/warm-scandinavian-reduction"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/philosophy/warm-scandinavian-reduction');
                  }}
                  className="hover:text-[#191716] underline decoration-[#DDD6CC] underline-offset-4 font-medium"
                >
                  Warm Scandinavian Soft Hygge
                </a>
              </div>
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
                    In-depth essays on Japandi architecture, wabi sabi house aesthetics, and warm soft minimalism.
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

          {/* Architectural Manifesto Section on Japandi & Wabi-Sabi Aesthetics */}
          <section className="py-16 bg-[#F2ECE3] border-y border-[#E4DDD2]">
            <div className="max-w-5xl mx-auto px-6">
              <div className="text-center mb-10">
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C6D53] block mb-2">
                  Editorial Manifesto
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-[#191716]">
                  The Tectonic Harmony of Japandi Interior Design Architecture
                </h2>
                <p className="text-xs text-[#7A746C] mt-2 max-w-xl mx-auto font-light">
                  Bridging Japanese wabi-sabi reductionism and Scandinavian hygge warmth through honest craftsmanship.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs leading-relaxed text-[#4E4842]">
                <div className="p-6 bg-[#FAF8F5] border border-[#DDD6CC] rounded-sm">
                  <div className="w-8 h-8 rounded-full bg-[#EAE2D5] flex items-center justify-center text-[#8C6D53] mb-3">
                    <Feather className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif text-base font-medium text-[#191716] mb-2">
                    01. Wabi-Sabi Material Honesty
                  </h3>
                  <p className="font-light">
                    Japandi design rejects synthetic plastics and factory gloss. Walls are finished in slaked lime plaster, structural posts feature charred yakisugi cedar, and ceramic accents display wood-fired unglazed stoneware that ages with living character.
                  </p>
                </div>

                <div className="p-6 bg-[#FAF8F5] border border-[#DDD6CC] rounded-sm">
                  <div className="w-8 h-8 rounded-full bg-[#EAE2D5] flex items-center justify-center text-[#8C6D53] mb-3">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif text-base font-medium text-[#191716] mb-2">
                    02. Tactile Nordic Comfort
                  </h3>
                  <p className="font-light">
                    Where traditional Japanese interiors can sometimes tilt toward austere asceticism, Scandinavian design reintroduces gentle warmth. Natural Gotland shearling, looped wool bouclé, and Dinesen Douglas fir create spaces that soothe and protect the human spirit.
                  </p>
                </div>

                <div className="p-6 bg-[#FAF8F5] border border-[#DDD6CC] rounded-sm">
                  <div className="w-8 h-8 rounded-full bg-[#EAE2D5] flex items-center justify-center text-[#8C6D53] mb-3">
                    <Compass className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif text-base font-medium text-[#191716] mb-2">
                    03. The Power of Empty Space (Ma)
                  </h3>
                  <p className="font-light">
                    In our homes, emptiness is not a void waiting to be filled—it is the primary material with which we compose. Through bespoke flush joinery and hidden storage, everyday clutter disappears, allowing natural daylight and clean sightlines to breathe.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Homepage AEO FAQ Section: Answering Long-Tail Search Queries Directly */}
          <section className="py-16 bg-[#FAF8F5] border-b border-[#E7E2DA]">
            <div className="max-w-4xl mx-auto px-6">
              <div className="flex items-center gap-2 mb-2">
                <HelpCircle className="w-4 h-4 text-[#8C6D53]" />
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C6D53]">
                  Direct Architectural Insights (AEO)
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-[#191716] mb-3">
                Frequently Asked Questions on Japandi & Warm Minimalist Living
              </h2>
              <p className="text-xs text-[#7A746C] mb-10 font-light">
                Direct, expert answers to the most common queries regarding Japandi interior design architecture, wabi-sabi principles, and small-space reductionism.
              </p>

              <div className="space-y-8">
                {/* Question 1 */}
                <div className="p-6 bg-[#FBF9F6] border border-[#E7E2DA] rounded-sm">
                  <h3 className="font-serif text-xl font-medium text-[#191716] mb-3">
                    How do you design a Japandi living room?
                  </h3>
                  <div className="p-4 bg-[#F2ECE3] border-l-2 border-[#8C6D53] text-[#191716] font-medium text-sm leading-relaxed mb-4 rounded-xs">
                    <span className="text-xs uppercase tracking-wider text-[#8C6D53] block mb-1 font-semibold">
                      Direct Answer
                    </span>
                    To design a Japandi living room, pair low-profile Japanese furniture silhouettes with warm Scandinavian textiles, neutral earth-toned lime wash walls, raw pale oak or hinoki woods, and unadorned negative space.
                  </div>
                  <p className="text-sm text-[#4E4842] leading-relaxed font-light mb-3">
                    Begin by establishing a neutral, organic backdrop using chalk-white or beige slaked lime wash paint. Choose low-slung seating—such as a linen-upholstered sectional or a paper-cord bench—to maintain low horizontal sightlines that make ceilings feel higher.
                  </p>
                  <p className="text-sm text-[#4E4842] leading-relaxed font-light mb-4">
                    Eliminate surface clutter with flush concealed joinery cabinets. Add tactile warmth through an unbleached wool loop rug, an unlacquered bronze lamp, and a single sculptural quince branch displayed in an unglazed stoneware vase according to Ikebana principles.
                  </p>
                  <a
                    href="/philosophy/warm-scandinavian-reduction"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/philosophy/warm-scandinavian-reduction');
                    }}
                    className="inline-flex items-center gap-1.5 text-xs text-[#8C6D53] hover:text-[#191716] font-medium transition-colors"
                  >
                    <span>Master warm Scandinavian interior design and soft hygge minimalism</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Question 2 */}
                <div className="p-6 bg-[#FBF9F6] border border-[#E7E2DA] rounded-sm">
                  <h3 className="font-serif text-xl font-medium text-[#191716] mb-3">
                    What are core wabi sabi interior design principles?
                  </h3>
                  <div className="p-4 bg-[#F2ECE3] border-l-2 border-[#8C6D53] text-[#191716] font-medium text-sm leading-relaxed mb-4 rounded-xs">
                    <span className="text-xs uppercase tracking-wider text-[#8C6D53] block mb-1 font-semibold">
                      Direct Answer
                    </span>
                    Core wabi sabi interior design principles celebrate asymmetry, organic imperfection, transient beauty, natural materials that age with patina (such as slaked lime, unlacquered metals, and unglazed ceramics), and the elimination of superfluous ornament.
                  </div>
                  <p className="text-sm text-[#4E4842] leading-relaxed font-light mb-3">
                    Rooted in Zen philosophy, wabi-sabi teaches that true beauty resides in impermanence. Rather than striving for flawless factory perfection, interior surfaces should reveal human touch: the gentle trowel marks of microcement, the carbonized crust of charred yakisugi cedar, and the soft wear on an untreated wooden threshold.
                  </p>
                  <p className="text-sm text-[#4E4842] leading-relaxed font-light mb-4">
                    In residential architecture, this means rejecting loud artificial colors and symmetrical matching furniture sets in favor of organic shapes, hand-woven tatami mats, and quiet penumbra shadows.
                  </p>
                  <a
                    href="/architecture/modern-kyoto-machiya"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/architecture/modern-kyoto-machiya');
                    }}
                    className="inline-flex items-center gap-1.5 text-xs text-[#8C6D53] hover:text-[#191716] font-medium transition-colors"
                  >
                    <span>Explore our monograph on modern Japanese machiya interiors</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Question 3 */}
                <div className="p-6 bg-[#FBF9F6] border border-[#E7E2DA] rounded-sm">
                  <h3 className="font-serif text-xl font-medium text-[#191716] mb-3">
                    What are warm minimalist home decor ideas for small spaces?
                  </h3>
                  <div className="p-4 bg-[#F2ECE3] border-l-2 border-[#8C6D53] text-[#191716] font-medium text-sm leading-relaxed mb-4 rounded-xs">
                    <span className="text-xs uppercase tracking-wider text-[#8C6D53] block mb-1 font-semibold">
                      Direct Answer
                    </span>
                    Warm minimalist decor for small spaces relies on flush concealed joinery cabinets to eliminate visual clutter, floor-grazing 2700K indirect lighting, multifunctional monolithic furniture, and heavily textured natural fibers like linen and bouclé to add comfort without taking up floor space.
                  </div>
                  <p className="text-sm text-[#4E4842] leading-relaxed font-light mb-3">
                    Small spaces quickly feel claustrophobic when filled with protruding door handles, baseboards, and open shelving. Installing ceiling-height flush cabinets with 6mm shadow gaps makes storage disappear into the architectural envelope.
                  </p>
                  <p className="text-sm text-[#4E4842] leading-relaxed font-light mb-4">
                    Pair seamless microcement or light wood flooring with floor-to-ceiling sheer linen drapes to draw the eye upward. Rather than cluttering horizontal tables, mount indirect sconces or run warm linear cove lights along perimeter baseboards to make rooms feel expansive and tranquil.
                  </p>
                  <a
                    href="/millwork/flush-joinery-concealed-storage"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/millwork/flush-joinery-concealed-storage');
                    }}
                    className="inline-flex items-center gap-1.5 text-xs text-[#8C6D53] hover:text-[#191716] font-medium transition-colors"
                  >
                    <span>Discover bespoke hidden storage solutions for small spaces</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* Editorial Footer with Pillar Internal Links */}
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

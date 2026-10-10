import React from 'react';
import { Article } from '../data/articles';
import { X, Trash2, ArrowRight, BookOpen } from 'lucide-react';

interface ReadingListDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedArticles: Article[];
  onNavigate: (path: string) => void;
  onRemoveBookmark: (id: string) => void;
  onClearAll: () => void;
}

export const ReadingListDrawer: React.FC<ReadingListDrawerProps> = ({
  isOpen,
  onClose,
  savedArticles,
  onNavigate,
  onRemoveBookmark,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#191716]/50 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-[#FAF8F5] border-l border-[#E7E2DA] shadow-2xl flex flex-col justify-between">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#E7E2DA] flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#8C6D53] font-semibold">
              Personal Archive
            </div>
            <h2 className="font-serif text-2xl font-medium text-[#191716] mt-0.5">
              Saved Monographies ({savedArticles.length})
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#7A746C] hover:text-[#191716] rounded-sm transition-colors cursor-pointer"
            aria-label="Close reading list"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {savedArticles.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#F0EAE2] flex items-center justify-center text-[#8C6D53] mb-4">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg text-[#191716] mb-1">
                Your reading tray is empty
              </h3>
              <p className="text-xs text-[#7A746C] max-w-xs leading-relaxed">
                Bookmark any architectural monograph across the journal to curate your private offline reading queue.
              </p>
            </div>
          ) : (
            savedArticles.map((art) => (
              <div
                key={art.id}
                className="group p-4 bg-[#FAF8F5] border border-[#E7E2DA] hover:border-[#8C6D53] rounded-sm transition-all flex gap-4"
              >
                <div className="w-20 h-20 bg-[#EFE9DF] rounded-xs overflow-hidden shrink-0">
                  <img
                    src={art.featuredImage.url}
                    alt={art.featuredImage.alt}
                    width={80}
                    height={80}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#8C6D53] font-medium">
                      {art.category} · {art.readTime}
                    </div>
                    <h4 className="font-serif text-sm font-medium text-[#191716] group-hover:text-[#8C6D53] line-clamp-2 transition-colors mt-0.5">
                      <a
                        href={art.path}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate(art.path);
                          onClose();
                        }}
                      >
                        {art.title}
                      </a>
                    </h4>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F0EAE2] text-[11px]">
                    <a
                      href={art.path}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(art.path);
                        onClose();
                      }}
                      className="font-medium text-[#191716] hover:text-[#8C6D53] inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Study</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>

                    <button
                      onClick={() => onRemoveBookmark(art.id)}
                      className="text-[#999289] hover:text-red-700 transition-colors p-1 cursor-pointer"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {savedArticles.length > 0 && (
          <div className="p-6 border-t border-[#E7E2DA] bg-[#F5EFE6]/60 flex items-center justify-between">
            <button
              onClick={onClearAll}
              className="text-xs uppercase tracking-wider text-[#7A746C] hover:text-red-700 transition-colors cursor-pointer"
            >
              Clear All ({savedArticles.length})
            </button>
            <span className="text-xs text-[#7A746C] font-serif italic">
              KURA Reading Desk
            </span>
          </div>
        )}

      </div>
    </div>
  );
};

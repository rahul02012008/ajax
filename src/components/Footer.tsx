import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (cat: string) => void;
  onOpenColophon: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenColophon }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="border-t border-[#E7E2DA] bg-[#F5EFE6]/60 pt-16 pb-12 text-[#4E4842]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-14 border-b border-[#E5DFD5]">
          
          {/* Brand & Editorial Ethos (5 cols) */}
          <div className="md:col-span-5">
            <span className="font-serif text-2xl tracking-[0.16em] font-medium text-[#191716] block mb-4">
              K U R A
            </span>
            <p className="text-sm text-[#655F58] leading-relaxed max-w-sm mb-6 font-light">
              A curated quarterly journal examining the tectonic boundaries of minimalist interior design, monastic tranquility, and warm spatial reductionism.
            </p>
            <div className="text-xs tracking-wider uppercase text-[#8C6D53] font-semibold">
              Issue IV · Spring & Autumn Compendium
            </div>
          </div>

          {/* Nav Categories (3 cols) */}
          <div className="md:col-span-3">
            <div className="text-xs uppercase tracking-widest font-semibold text-[#191716] mb-4">
              Disciplines
            </div>
            <ul className="space-y-2.5 text-xs text-[#655F58]">
              <li>
                <button
                  onClick={() => onSelectCategory('Architecture')}
                  className="hover:text-[#191716] transition-colors cursor-pointer"
                >
                  Architecture & Volume
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Materials')}
                  className="hover:text-[#191716] transition-colors cursor-pointer"
                >
                  Mineral & Tactile Materials
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Millwork')}
                  className="hover:text-[#191716] transition-colors cursor-pointer"
                >
                  Flush Joinery & Millwork
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Lighting')}
                  className="hover:text-[#191716] transition-colors cursor-pointer"
                >
                  Penumbra & Aperture Lighting
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Philosophy')}
                  className="hover:text-[#191716] transition-colors cursor-pointer"
                >
                  Wabi-Sabi & Rams Philosophy
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Dispatch (4 cols) */}
          <div className="md:col-span-4">
            <div className="text-xs uppercase tracking-widest font-semibold text-[#191716] mb-2">
              Curator’s Dispatch
            </div>
            <p className="text-xs text-[#655F58] leading-relaxed mb-4 font-light">
              Receive our monthly deep-dive monograph on spatial architecture and tactile materials. Strictly no commercial promotions.
            </p>

            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@studio.com"
                className="bg-[#FAF8F5] border border-[#DDD6CC] px-3.5 py-2 text-xs text-[#191716] placeholder:text-[#9A938A] rounded-sm focus:outline-none focus:border-[#8C6D53] flex-1"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#191716] hover:bg-[#8C6D53] text-[#FAF8F5] text-xs uppercase tracking-wider font-medium rounded-sm transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {subscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Saved</span>
                  </>
                ) : (
                  <>
                    <span>Join</span>
                    <ArrowRight className="w-3 h-3" />
                  </>
                )}
              </button>
            </form>
            {subscribed && (
              <p className="text-[11px] text-[#8C6D53] mt-2 font-serif italic">
                Thank you for joining our curatorial circle.
              </p>
            )}
          </div>

        </div>

        {/* Quiet Sub-Footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A746C]">
          <div>
            © 2026 KURA Architectural Editions. All monographs reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenColophon}
              className="hover:text-[#191716] transition-colors cursor-pointer"
            >
              Colophon & Manifesto
            </button>
            <span>·</span>
            <span className="font-mono text-[11px] text-[#8C6D53]">
              Ready for Vercel
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

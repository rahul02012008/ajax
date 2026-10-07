import React from 'react';
import { X, ExternalLink } from 'lucide-react';

interface ColophonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ColophonModal: React.FC<ColophonModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-[#191716]/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
    >
      <div className="bg-[#FAF8F5] border border-[#DDD6CC] rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-[#7A746C] hover:text-[#191716] transition-colors cursor-pointer"
          aria-label="Close colophon"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="border-b border-[#E7E2DA] pb-6 mb-6">
          <div className="text-xs uppercase tracking-widest text-[#8C6D53] font-semibold">
            Publication Colophon & Manifesto
          </div>
          <h2 className="font-serif text-3xl font-medium text-[#191716] mt-1">
            KURA Architectural Journal
          </h2>
          <p className="text-xs text-[#7A746C] mt-1 font-serif italic">
            Vol. IV · Printed & Distributed Digitally · 2026 Edition
          </p>
        </div>

        {/* Content */}
        <div className="space-y-6 text-sm text-[#4E4842] leading-relaxed">
          <section>
            <h3 className="text-xs uppercase tracking-wider font-semibold text-[#191716] mb-2">
              01. Editorial Manifesto
            </h3>
            <p className="font-light">
              KURA is an independent journal dedicated to the contemplative study of minimalist interior architecture, wabi-sabi tectonics, sensory acoustics, and warm Nordic reductionism. We reject disposable micro-trends in favor of spatial purity, material honesty, and spaces that quiet the mind.
            </p>
          </section>

          <section>
            <h3 className="text-xs uppercase tracking-wider font-semibold text-[#191716] mb-2">
              02. Typographic Archetype
            </h3>
            <p className="font-light">
              Typeset in <strong className="font-medium text-[#191716]">Cormorant Garamond</strong> (designed by Christian Thalmann, inspired by Claude Garamont’s sixteenth-century punches) for display headlines and curatorial citations, paired with <strong className="font-medium text-[#191716]">Plus Jakarta Sans</strong> (by Gumpita Rahayu) for comfortable, long-form reading cadence at 65–75 characters per measure.
            </p>
          </section>

          <section>
            <h3 className="text-xs uppercase tracking-wider font-semibold text-[#191716] mb-2">
              03. Material Sourcing & Photography
            </h3>
            <p className="font-light">
              High-resolution photography curated from international architectural archives, featuring project work in Kyoto, Antwerp, Copenhagen, Basel, Milan, and Frankfurt. All images conform to zero-broken-image fallback protocols.
            </p>
          </section>

          <section className="p-4 bg-[#F2ECE3] rounded-xs border border-[#E0D8CB]">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-[#191716] mb-1">
              04. Vercel Hosting Architecture
            </h3>
            <p className="text-xs text-[#635D55]">
              Engineered as a high-performance modern React SPA with Vite, zero external runtime bloat, pre-configured with <code className="font-mono text-[#8C6D53]">vercel.json</code> rewrite routes and strict TypeScript compliance for direct, error-free deployment on Vercel.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-[#E7E2DA] flex items-center justify-between text-xs text-[#7A746C]">
          <span>© 2026 KURA Architectural Editions</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#191716] text-[#FAF8F5] uppercase tracking-wider font-medium text-[11px] rounded-xs hover:bg-[#8C6D53] transition-colors cursor-pointer"
          >
            Close Monograph
          </button>
        </div>
      </div>
    </div>
  );
};

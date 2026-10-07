import React, { useEffect, useState } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { MaterialColor } from '../data/articles';

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  caption: string;
  credit: string;
  palette?: MaterialColor[];
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  caption,
  credit,
  palette,
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      setZoomLevel(1);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-[#0E0D0C]/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8"
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between z-10 text-[#FAF8F5]">
        <div className="text-xs uppercase tracking-widest text-[#B5AEA5]">
          Curated Architectural Archive · Inspection View
        </div>

        <div className="flex items-center gap-3">
          {/* Zoom controls */}
          <div className="flex items-center gap-1 bg-[#1F1E1D] p-1 rounded-sm border border-[#33312E]">
            <button
              onClick={() => setZoomLevel((prev) => Math.max(1, prev - 0.25))}
              className="p-1.5 hover:text-[#FAF8F5] text-[#A6A098] transition-colors"
              title="Zoom out"
              disabled={zoomLevel <= 1}
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-mono px-2 text-[#DDD6CD]">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel((prev) => Math.min(2.5, prev + 0.25))}
              className="p-1.5 hover:text-[#FAF8F5] text-[#A6A098] transition-colors"
              title="Zoom in"
              disabled={zoomLevel >= 2.5}
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            {zoomLevel > 1 && (
              <button
                onClick={() => setZoomLevel(1)}
                className="p-1.5 hover:text-[#FAF8F5] text-[#A6A098] transition-colors border-l border-[#33312E]"
                title="Reset zoom"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="p-2 text-[#A6A098] hover:text-[#FAF8F5] bg-[#1F1E1D] hover:bg-[#2C2A28] border border-[#33312E] rounded-sm transition-colors cursor-pointer"
            aria-label="Close photography viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Photographic Display Canvas */}
      <div className="flex-1 flex items-center justify-center overflow-auto my-4 relative">
        <div
          className="transition-transform duration-200 ease-out cursor-grab active:cursor-grabbing max-h-[78vh] flex items-center justify-center"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <img
            src={imageUrl}
            alt={caption}
            referrerPolicy="no-referrer"
            className="max-h-[75vh] max-w-[90vw] object-contain shadow-2xl rounded-xs select-none"
          />
        </div>
      </div>

      {/* Bottom Information Footer */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-[#FAF8F5] border-t border-[#262422] pt-4">
        <div className="max-w-2xl">
          <p className="font-serif text-base sm:text-lg text-[#F4EFE6] leading-snug">
            {caption}
          </p>
          <span className="text-xs uppercase tracking-widest text-[#9C958C] block mt-1">
            {credit}
          </span>
        </div>

        {/* Room Palette Bar in Lightbox */}
        {palette && palette.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider text-[#9C958C]">
              Tones:
            </span>
            <div className="flex items-center gap-1.5">
              {palette.map((p) => (
                <div
                  key={p.name}
                  className="w-4 h-4 rounded-full border border-white/20"
                  style={{ backgroundColor: p.hex }}
                  title={`${p.name} (${p.hex})`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

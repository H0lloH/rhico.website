import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * Fullscreen image viewer. Renders nothing when `piece` is null/undefined.
 * Supports Escape to close, arrow keys + on-screen arrows to navigate
 * (when onPrev/onNext are given), and a colour/greyscale-style toggle
 * when the piece has more than one entry in `images`.
 */
export default function Lightbox({ piece, onClose, onPrev, onNext }) {
    const [variant_index, set_variant_index] = useState(0);
    const [tracked_piece, set_tracked_piece] = useState(piece);

    if (piece !== tracked_piece) {
        set_tracked_piece(piece);
        set_variant_index(0);
    }

    useEffect(() => {
        if (!piece) return undefined;

        const original_overflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const handle_key = (event) => {
            if (event.key === 'Escape') onClose();
            if (event.key === 'ArrowLeft' && onPrev) onPrev();
            if (event.key === 'ArrowRight' && onNext) onNext();
        };
        window.addEventListener('keydown', handle_key);

        return () => {
            document.body.style.overflow = original_overflow;
            window.removeEventListener('keydown', handle_key);
        };
    }, [piece, onClose, onPrev, onNext]);

    return createPortal(
        <AnimatePresence>
            {piece && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8"
                    onClick={onClose}
                    role="dialog"
                    aria-modal="true"
                    aria-label={piece.title}
                >
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-white/60 hover:text-white"
                    >
                        &#10005;
                    </button>

                    {onPrev && (
                        <button
                            type="button"
                            onClick={(event) => {
                                event.stopPropagation();
                                onPrev();
                            }}
                            aria-label="Previous piece"
                            className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-lg text-white/80 transition-colors hover:border-white/60 hover:text-white sm:left-4"
                        >
                            &#8249;
                        </button>
                    )}

                    {onNext && (
                        <button
                            type="button"
                            onClick={(event) => {
                                event.stopPropagation();
                                onNext();
                            }}
                            aria-label="Next piece"
                            className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-lg text-white/80 transition-colors hover:border-white/60 hover:text-white sm:right-4"
                        >
                            &#8250;
                        </button>
                    )}

                    <motion.div
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="flex max-h-full max-w-full flex-col items-center gap-4"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <img
                            src={piece.images[variant_index].image}
                            alt={piece.title}
                            className="max-h-[72vh] w-auto max-w-full rounded-lg object-contain shadow-2xl sm:max-h-[78vh]"
                        />

                        <div className="flex max-w-[92vw] flex-col items-center gap-2 text-center sm:max-w-xl">
                            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/60">
                                {piece.category && <span>{piece.category}</span>}
                                {piece.category && piece.year && <span aria-hidden="true">&middot;</span>}
                                {piece.year && <span>{piece.year}</span>}
                            </div>
                            <h3 className="font-display text-lg font-semibold text-white">{piece.title}</h3>
                            {piece.description && <p className="text-sm text-white/70">{piece.description}</p>}

                            {piece.images.length > 1 && (
                                <div className="mt-1 flex gap-2">
                                    {piece.images.map((variant, index) => (
                                        <button
                                            key={variant.label ?? index}
                                            type="button"
                                            onClick={() => set_variant_index(index)}
                                            className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                                                index === variant_index
                                                    ? 'border-white bg-white text-black'
                                                    : 'border-white/30 text-white/70 hover:border-white/60 hover:text-white'
                                            }`}
                                        >
                                            {variant.label ?? `Version ${index + 1}`}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}

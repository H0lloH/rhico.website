import { useMemo, useState } from 'react';

import Lightbox from './lightbox.jsx';

const CATEGORY_ORDER = ['Digital', 'Traditional'];

/**
 * Pinterest-style masonry gallery, split into a section per category
 * (order fixed by CATEGORY_ORDER so Digital/Traditional never interleave).
 * Clicking a tile opens the Lightbox; when more than one piece shares a
 * category, the lightbox also gets prev/next navigation within that set.
 */
export default function ArtGallery({ pieces = [], empty_message = 'Art coming soon.' }) {
    const [active, set_active] = useState(null); // { category, index } | null

    const grouped = useMemo(() => {
        const map = new Map();
        for (const piece of pieces) {
            const list = map.get(piece.category) ?? [];
            list.push(piece);
            map.set(piece.category, list);
        }
        return map;
    }, [pieces]);

    if (pieces.length === 0) {
        return <p className="rounded-xl border border-dashed border-line px-6 py-16 text-center text-sm text-muted">{empty_message}</p>;
    }

    const active_group = active ? (grouped.get(active.category) ?? []) : [];
    const active_piece = active ? active_group[active.index] : null;

    const go_to = (offset) => {
        if (!active || active_group.length < 2) return;
        const next_index = (active.index + offset + active_group.length) % active_group.length;
        set_active({ category: active.category, index: next_index });
    };

    return (
        <div className="flex flex-col gap-16">
            {CATEGORY_ORDER.filter((category) => grouped.has(category)).map((category) => {
                const items = grouped.get(category);

                return (
                    <section key={category}>
                        <h2 className="mb-6 font-display text-2xl font-semibold text-ink">{category}</h2>

                        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
                            {items.map((piece, index) => {
                                const cover = piece.images[0];

                                return (
                                    <button
                                        key={piece.slug ?? piece.title}
                                        type="button"
                                        onClick={() => set_active({ category, index })}
                                        className="group relative mb-4 block w-full overflow-hidden rounded-xl border border-line bg-surface text-left break-inside-avoid focus-visible:outline-2 focus-visible:outline-accent"
                                    >
                                        <img
                                            src={cover.thumb}
                                            alt={piece.title}
                                            loading="lazy"
                                            width={cover.width}
                                            height={cover.height}
                                            className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                        />
                                        <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/0 to-black/0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                            <span className="text-sm font-medium text-white">{piece.title}</span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </section>
                );
            })}

            <Lightbox
                piece={active_piece}
                onClose={() => set_active(null)}
                onPrev={active_group.length > 1 ? () => go_to(-1) : undefined}
                onNext={active_group.length > 1 ? () => go_to(1) : undefined}
            />
        </div>
    );
}

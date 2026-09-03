import { motion } from 'framer-motion';

/**
 * Vertical timeline for work history. Newest-first order is the caller's
 * responsibility (data stays newest-first so it doesn't need re-sorting here).
 */
export default function Timeline({ items = [] }) {
    if (items.length === 0) return null;

    return (
        <ol className="relative flex flex-col gap-10 border-l border-line pl-8">
            {items.map((item, index) => (
                <motion.li
                    key={`${item.company}-${item.role}`}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.4, delay: Math.min(index * 0.08, 0.3), ease: [0.22, 1, 0.36, 1] }}
                    className="relative"
                >
                    <span className="absolute -left-[2.05rem] top-1.5 h-3 w-3 rounded-full border-2 border-bg bg-accent" aria-hidden="true" />

                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                        {item.start} &ndash; {item.end ?? 'Present'}
                    </p>

                    <h3 className="mt-1 font-display text-xl font-semibold text-ink">{item.role}</h3>
                    <p className="text-sm text-muted">
                        {item.company}
                        {item.location && <span> &middot; {item.location}</span>}
                    </p>

                    {item.highlights?.length > 0 && (
                        <ul className="mt-3 flex flex-col gap-1.5">
                            {item.highlights.map((highlight) => (
                                <li key={highlight} className="flex gap-2 text-sm leading-relaxed text-muted">
                                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-line" aria-hidden="true" />
                                    {highlight}
                                </li>
                            ))}
                        </ul>
                    )}
                </motion.li>
            ))}
        </ol>
    );
}

import { motion } from 'framer-motion';

import useDocumentTitle from '../../lib/use_document_title.js';

const VARIANTS = {
    initial: { opacity: 0, y: 12 },
    enter: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: 'easeIn' } }
};

/**
 * Standard page shell: animates on route change, sets the document title, and
 * renders an optional header (eyebrow + title + intro) above the content.
 */
export default function Page({ title, eyebrow, intro, children }) {
    // Hooks
    useDocumentTitle(title);

    // Render
    return (
        <motion.div variants={VARIANTS} initial="initial" animate="enter" exit="exit">
            {(eyebrow || title || intro) && (
                <header className="mb-12 max-w-2xl">
                    {eyebrow && <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>}
                    {title && <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">{title}</h1>}
                    {intro && <p className="mt-4 text-lg text-muted">{intro}</p>}
                </header>
            )}
            {children}
        </motion.div>
    );
}

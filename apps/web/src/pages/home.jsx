import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { NAV_ITEMS } from '@rhico/shared';

import Page from '../components/ui/page.jsx';

const CARDS = NAV_ITEMS.filter((item) => item.key !== 'contact');

export default function Home() {
    // Render
    return (
        <Page title="Home">
            <section className="flex flex-col items-start gap-6 pb-16">
                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                    Multimedia Designer
                </motion.p>

                <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }} className="max-w-3xl font-display text-5xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl">
                    I design, illustrate, and build across screens and print.
                </motion.h1>

                <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.12 }} className="max-w-xl text-lg text-muted">
                    A working portfolio of multimedia design, digital and traditional art, and development projects. Have a look around.
                </motion.p>

                <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.18 }} className="flex flex-wrap gap-3 pt-2">
                    <Link to="/design" className="rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90">
                        View work
                    </Link>
                    <Link to="/contact" className="rounded-md border border-line px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-accent">
                        Get in touch
                    </Link>
                </motion.div>
            </section>

            <section className="grid grid-cols-1 gap-5 border-t border-line pt-16 sm:grid-cols-3">
                {CARDS.map((item, index) => (
                    <motion.div key={item.key} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.08 }}>
                        <Link to={item.path} className="group flex h-full flex-col justify-between gap-8 rounded-xl border border-line bg-surface p-6 transition-colors hover:border-accent">
                            <span className="font-display text-2xl font-semibold text-ink">{item.label}</span>
                            <span className="text-sm text-muted">
                                {item.blurb}
                                <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
                            </span>
                        </Link>
                    </motion.div>
                ))}
            </section>
        </Page>
    );
}

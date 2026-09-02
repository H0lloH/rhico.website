import { motion } from 'framer-motion';

export default function ProjectCard({ project, index = 0 }) {
    // Variables
    const { title, category, year, description, image, tags = [], href } = project;
    const is_link = Boolean(href);
    const Wrapper = is_link ? motion.a : motion.div;
    const link_props = is_link ? { href, target: '_blank', rel: 'noreferrer' } : {};

    // Render
    return (
        <Wrapper
            {...link_props}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.3), ease: [0.22, 1, 0.36, 1] }}
            className="group flex flex-col overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-accent"
        >
            <div className="aspect-[4/3] w-full overflow-hidden bg-bg">
                {image ? (
                    <img src={image} alt={title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-widest text-muted">No image yet</div>
                )}
            </div>

            <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex items-center gap-2 text-xs text-muted">
                    {category && <span className="font-medium text-accent">{category}</span>}
                    {category && year && <span aria-hidden="true">&middot;</span>}
                    {year && <span>{year}</span>}
                </div>

                <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>

                {description && <p className="text-sm leading-relaxed text-muted">{description}</p>}

                {tags.length > 0 && (
                    <ul className="mt-auto flex flex-wrap gap-2 pt-2">
                        {tags.map((tag) => (
                            <li key={tag} className="rounded-full border border-line px-2.5 py-0.5 text-[11px] text-muted">
                                {tag}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </Wrapper>
    );
}

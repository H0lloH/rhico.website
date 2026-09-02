import { Link } from 'react-router-dom';

import { NAV_ITEMS, SITE } from '@rhico/shared';

export default function SiteFooter() {
    // Variables
    const year = new Date().getFullYear();
    const socials = SITE.socials.filter((social) => social.href);

    // Render
    return (
        <footer className="border-t border-line">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                <div>
                    <p className="font-display text-sm font-semibold text-ink">
                        {SITE.name}
                        <span className="text-accent">.</span>
                    </p>
                    <p className="mt-1 text-xs text-muted">
                        &copy; {year} {SITE.author}. All rights reserved.
                    </p>
                </div>

                <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
                    {NAV_ITEMS.map((item) => (
                        <Link key={item.key} to={item.path} className="transition-colors hover:text-ink">
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {socials.length > 0 && (
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted">
                        {socials.map((social) => (
                            <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-ink">
                                {social.label}
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </footer>
    );
}

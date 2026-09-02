import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

import { NAV_ITEMS, SITE } from '@rhico/shared';

import ThemeToggle from '../theme/theme_toggle.jsx';

const linkClass = ({ isActive }) => ['text-sm font-medium transition-colors', isActive ? 'text-ink' : 'text-muted hover:text-ink'].join(' ');

export default function SiteNav() {
    // State
    const [open, setOpen] = useState(false);

    // Handlers
    const closeMenu = () => setOpen(false);

    // Render
    return (
        <header className="fixed inset-x-0 top-0 z-40 border-b border-line/70 bg-bg/80 backdrop-blur-md">
            <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 sm:px-8">
                <Link to="/" onClick={closeMenu} className="font-display text-lg font-bold tracking-tight text-ink">
                    {SITE.name}
                    <span className="text-accent">.</span>
                </Link>

                <div className="hidden items-center gap-8 md:flex">
                    {NAV_ITEMS.map((item) => (
                        <NavLink key={item.key} to={item.path} className={linkClass}>
                            {item.label}
                        </NavLink>
                    ))}
                    <ThemeToggle />
                </div>

                <div className="flex items-center gap-2 md:hidden">
                    <ThemeToggle />
                    <button type="button" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu" aria-expanded={open} className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-line text-muted hover:text-ink">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" className="h-4 w-4">
                            {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
                        </svg>
                    </button>
                </div>
            </nav>

            {open && (
                <div className="border-t border-line bg-bg px-6 py-4 md:hidden">
                    <div className="flex flex-col gap-4">
                        {NAV_ITEMS.map((item) => (
                            <NavLink key={item.key} to={item.path} onClick={closeMenu} className={linkClass}>
                                {item.label}
                            </NavLink>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}

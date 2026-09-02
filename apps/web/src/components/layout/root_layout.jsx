import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import SiteNav from './site_nav.jsx';
import SiteFooter from './site_footer.jsx';

import Home from '../../pages/home.jsx';
import Design from '../../pages/design.jsx';
import Art from '../../pages/art.jsx';
import Code from '../../pages/code.jsx';
import Contact from '../../pages/contact.jsx';
import NotFound from '../../pages/not_found.jsx';

export default function RootLayout() {
    // Variables
    const location = useLocation();

    // Effects
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [location.pathname]);

    // Render
    return (
        <div className="flex min-h-dvh flex-col bg-bg text-ink">
            <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-white">
                Skip to content
            </a>

            <SiteNav />

            <main id="main" className="mx-auto w-full max-w-6xl flex-1 px-6 pb-24 pt-28 sm:px-8">
                <AnimatePresence mode="wait" initial={false}>
                    <Routes location={location} key={location.pathname}>
                        <Route index element={<Home />} />
                        <Route path="design" element={<Design />} />
                        <Route path="art" element={<Art />} />
                        <Route path="code" element={<Code />} />
                        <Route path="contact" element={<Contact />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </AnimatePresence>
            </main>

            <SiteFooter />
        </div>
    );
}

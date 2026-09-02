import { Link } from 'react-router-dom';

import Page from '../components/ui/page.jsx';

export default function NotFound() {
    // Render
    return (
        <Page title="Not found">
            <div className="flex flex-col items-start gap-4 py-16">
                <p className="font-display text-6xl font-bold text-accent">404</p>
                <h1 className="font-display text-2xl font-semibold text-ink">This page wandered off.</h1>
                <p className="text-muted">The link may be broken, or the page may have moved.</p>
                <Link to="/" className="mt-2 rounded-md border border-line px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-accent">
                    Back home
                </Link>
            </div>
        </Page>
    );
}

import { Hono } from 'hono';
import { cors } from 'hono/cors';

import { ALLOWED_ORIGINS } from '@rhico/shared';

import registerContactRoute from './routes/contact.js';

/**
 * Builds the Hono app. Kept as a factory so the local server and the Vercel
 * serverless entry share exactly one definition.
 *
 * Routes are mounted under /api so paths match in every environment
 * (local proxy, Vercel functions).
 */
export function createApp() {
    const app = new Hono();

    app.use(
        '/api/*',
        cors({
            origin: (origin) => (ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]),
            allowMethods: ['GET', 'POST', 'OPTIONS'],
            allowHeaders: ['Content-Type']
        })
    );

    app.get('/api/health', (context) => context.json({ ok: true }));

    registerContactRoute(app);

    app.notFound((context) => context.json({ error: 'Not found' }, 404));

    app.onError((error, context) => {
        console.error('API error:', { error: error.message, stack: error.stack });
        return context.json({ error: 'Internal server error' }, 500);
    });

    return app;
}

const app = createApp();

export default app;

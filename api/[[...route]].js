/**
 * Vercel serverless entry. Every /api/* request is routed here and handed to
 * the shared Hono app defined in apps/api. Keep this file thin — all routing
 * and logic lives in @rhico/api.
 */
import { handle } from 'hono/vercel';

import app from '@rhico/api';

export const config = {
    runtime: 'nodejs'
};

export default handle(app);

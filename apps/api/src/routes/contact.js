import { z } from 'zod';
import { Resend } from 'resend';

import { SITE } from '@rhico/shared';

const contact_schema = z.object({
    name: z.string().trim().min(1, 'Name is required').max(120),
    email: z.string().trim().email('A valid email is required').max(200),
    message: z.string().trim().min(10, 'Message is too short').max(5000),
    // Honeypot — real users leave this empty; bots tend to fill every field.
    company: z.string().max(0).optional()
});

/**
 * Registers POST /api/contact. Validates the payload and, when RESEND_API_KEY
 * is configured, emails the submission. Without a key it logs and succeeds so
 * local development works with no secrets.
 */
export default function registerContactRoute(app) {
    app.post('/api/contact', async (context) => {
        let body;

        try {
            body = await context.req.json();
        } catch (error) {
            console.warn('Contact: invalid JSON body', { error: error.message });
            return context.json({ error: 'Invalid request body' }, 400);
        }

        const parsed = contact_schema.safeParse(body);

        if (!parsed.success) {
            const first_issue = parsed.error.issues[0];
            return context.json({ error: first_issue?.message ?? 'Invalid submission' }, 422);
        }

        if (parsed.data.company) {
            // Honeypot tripped — pretend success, send nothing.
            return context.json({ ok: true });
        }

        const { name, email, message } = parsed.data;
        const api_key = process.env.RESEND_API_KEY;
        const to_address = process.env.CONTACT_TO_EMAIL ?? SITE.email;
        const from_address = process.env.CONTACT_FROM_EMAIL ?? 'onboarding@resend.dev';

        if (!api_key) {
            console.info('Contact submission (no RESEND_API_KEY set, not sending):', { name, email, message });
            return context.json({ ok: true, delivered: false });
        }

        try {
            const resend = new Resend(api_key);

            const { error } = await resend.emails.send({
                from: `${SITE.name} Website <${from_address}>`,
                to: [to_address],
                replyTo: email,
                subject: `New contact message from ${name}`,
                text: `From: ${name} <${email}>\n\n${message}`
            });

            if (error) {
                throw new Error(error.message ?? 'Email provider rejected the request');
            }

            return context.json({ ok: true, delivered: true });
        } catch (error) {
            console.error('Contact: failed to send email', { error: error.message });
            return context.json({ error: 'Unable to send message right now' }, 502);
        }
    });
}

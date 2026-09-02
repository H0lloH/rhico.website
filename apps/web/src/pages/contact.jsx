import { useCallback, useState } from 'react';

import { SITE } from '@rhico/shared';

import Page from '../components/ui/page.jsx';

const INITIAL_FORM = { name: '', email: '', message: '' };

export default function Contact() {
    // State
    const [form, setForm] = useState(INITIAL_FORM);
    const [status, setStatus] = useState('idle'); // idle | submitting | success | error
    const [error_message, setErrorMessage] = useState('');

    // Handlers
    const handleChange = useCallback((event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
    }, []);

    const handleSubmit = useCallback(
        async (event) => {
            event.preventDefault();
            setStatus('submitting');
            setErrorMessage('');

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(form)
                });

                if (!response.ok) {
                    const payload = await response.json().catch(() => ({}));
                    throw new Error(payload.error ?? `Request failed (${response.status})`);
                }

                setStatus('success');
                setForm(INITIAL_FORM);
            } catch (error) {
                console.error('Contact form submission failed:', { error: error.message });
                setStatus('error');
                setErrorMessage(error.message);
            }
        },
        [form]
    );

    // Variables
    const is_submitting = status === 'submitting';

    // Render
    return (
        <Page eyebrow="Say hello" title="Contact" intro="Project enquiry, print interest, or just want to chat — send a message.">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_1fr]">
                {status === 'success' ? (
                    <div className="rounded-xl border border-line bg-surface p-8">
                        <h2 className="font-display text-xl font-semibold text-ink">Message sent</h2>
                        <p className="mt-2 text-sm text-muted">Thanks for reaching out — I&apos;ll get back to you soon.</p>
                        <button type="button" onClick={() => setStatus('idle')} className="mt-6 text-sm font-semibold text-accent hover:underline">
                            Send another
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                        <label className="flex flex-col gap-2 text-sm">
                            <span className="font-medium text-ink">Name</span>
                            <input type="text" name="name" value={form.name} onChange={handleChange} required autoComplete="name" className="rounded-md border border-line bg-bg px-3 py-2.5 text-ink outline-none transition-colors focus:border-accent" />
                        </label>

                        <label className="flex flex-col gap-2 text-sm">
                            <span className="font-medium text-ink">Email</span>
                            <input type="email" name="email" value={form.email} onChange={handleChange} required autoComplete="email" className="rounded-md border border-line bg-bg px-3 py-2.5 text-ink outline-none transition-colors focus:border-accent" />
                        </label>

                        <label className="flex flex-col gap-2 text-sm">
                            <span className="font-medium text-ink">Message</span>
                            <textarea name="message" value={form.message} onChange={handleChange} required rows={6} className="resize-y rounded-md border border-line bg-bg px-3 py-2.5 text-ink outline-none transition-colors focus:border-accent" />
                        </label>

                        {status === 'error' && <p className="text-sm text-red-500">{error_message || 'Something went wrong. Please try again.'}</p>}

                        <button type="submit" disabled={is_submitting} className="self-start rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50">
                            {is_submitting ? 'Sending…' : 'Send message'}
                        </button>
                    </form>
                )}

                <aside className="flex flex-col gap-4 border-t border-line pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
                    <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-muted">Elsewhere</h2>
                    <a href={`mailto:${SITE.email}`} className="text-sm text-ink transition-colors hover:text-accent">
                        {SITE.email}
                    </a>
                    {SITE.socials
                        .filter((social) => social.href)
                        .map((social) => (
                            <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="text-sm text-ink transition-colors hover:text-accent">
                                {social.label}
                            </a>
                        ))}
                </aside>
            </div>
        </Page>
    );
}

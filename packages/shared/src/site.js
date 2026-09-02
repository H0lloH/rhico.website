/**
 * Canonical site metadata and navigation model.
 * Imported by both the web app (nav, meta tags) and the api (email templates,
 * CORS allow-list). Keep this framework-free — plain data and helpers only.
 */

export const SITE = {
    name: 'Rhico',
    title: 'Rhico — Multimedia Designer',
    description: 'Portfolio of Rhico: multimedia design, digital and traditional art, and development work.',
    author: 'Rhico',
    email: 'rhico.potgieter@proton.me',
    url: 'https://rhico.website',
    locale: 'en',
    socials: [
        { label: 'Instagram', href: 'https://www.instagram.com/h0lloh/' },
        { label: 'Dribbble', href: 'https://dribbble.com/H0lloH' },
        { label: 'GitHub', href: 'https://github.com/h0lloh' },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rhico-potgieter/' }
    ]
};

/**
 * Primary navigation. `path` values map 1:1 to router routes in the web app.
 */
export const NAV_ITEMS = [
    { key: 'design', label: 'Design', path: '/design', blurb: 'Multimedia and graphic design work.' },
    { key: 'art', label: 'Art', path: '/art', blurb: 'Digital and traditional art.' },
    { key: 'code', label: 'Code', path: '/code', blurb: 'Development and creative-coding projects.' },
    { key: 'contact', label: 'Contact', path: '/contact', blurb: 'Get in touch.' }
];

/**
 * Origins allowed to call the api. Extend when a preview/staging domain is added.
 */
export const ALLOWED_ORIGINS = ['http://localhost:5173', 'https://rhico.website', 'https://www.rhico.website'];

/**
 * Art portfolio entries — digital and traditional. Images live in
 * apps/web/public/images/art/<category>/ as pre-sized WebP (thumb + full).
 * Newest first within each category. `for_sale` is a hook for the future
 * print-shop phase.
 *
 * Titles, years and descriptions below are placeholders read off each
 * piece — swap in your real titles/blurbs whenever you get a chance.
 *
 * `images` holds one entry per viewable version of the piece (colour,
 * greyscale, etc). The gallery uses images[0] as the tile thumbnail and
 * lets the lightbox toggle between all of them via `label`.
 */
const ART_PIECES = [
    {
        slug: 'portrait-i',
        title: 'Portrait Study I',
        category: 'Digital',
        year: 2026,
        medium: 'Digital painting',
        description: 'Duotone character study, painted digitally.',
        tags: ['Portrait', 'Digital'],
        for_sale: false,
        images: [
            {
                label: 'Colour',
                thumb: '/images/art/digital/portrait-i-thumb.webp',
                image: '/images/art/digital/portrait-i.webp',
                width: 1415,
                height: 2000
            },
            {
                label: 'Greyscale',
                thumb: '/images/art/digital/portrait-i-mono-thumb.webp',
                image: '/images/art/digital/portrait-i-mono.webp',
                width: 1415,
                height: 2000
            }
        ]
    },
    {
        slug: 'portrait-ii',
        title: 'Portrait Study II',
        category: 'Digital',
        year: 2026,
        medium: 'Digital painting',
        description: 'Character study, painted digitally.',
        tags: ['Portrait', 'Digital'],
        for_sale: false,
        images: [
            {
                label: 'Colour',
                thumb: '/images/art/digital/portrait-ii-thumb.webp',
                image: '/images/art/digital/portrait-ii.webp',
                width: 1415,
                height: 2000
            },
            {
                label: 'Greyscale',
                thumb: '/images/art/digital/portrait-ii-mono-thumb.webp',
                image: '/images/art/digital/portrait-ii-mono.webp',
                width: 1415,
                height: 2000
            }
        ]
    },
    {
        slug: 'truffel-on-park',
        title: 'Truffel on Park, Sandton',
        category: 'Traditional',
        year: 2025,
        medium: 'Pen & watercolour',
        description: 'On-location architectural sketch, May 2025.',
        tags: ['Urban Sketching', 'Architecture'],
        for_sale: false,
        images: [
            {
                thumb: '/images/art/traditional/truffel-on-park-thumb.webp',
                image: '/images/art/traditional/truffel-on-park.webp',
                width: 2000,
                height: 707
            }
        ]
    },
    {
        slug: 'the-grand-exotic',
        title: 'The Grand Exotic',
        category: 'Traditional',
        year: 2025,
        medium: 'Pen & watercolour',
        description: 'On-location sketch of the porch, April 2025.',
        tags: ['Urban Sketching'],
        for_sale: false,
        images: [
            {
                thumb: '/images/art/traditional/the-grand-exotic-thumb.webp',
                image: '/images/art/traditional/the-grand-exotic.webp',
                width: 2000,
                height: 690
            }
        ]
    },
    {
        slug: 'hooded-figure',
        title: 'Portrait Study, Hood',
        category: 'Traditional',
        year: 2024,
        medium: 'Pen & ink, cross-hatch',
        description: 'Cross-hatched ink portrait, October 2024.',
        tags: ['Portrait', 'Ink'],
        for_sale: false,
        images: [
            {
                thumb: '/images/art/traditional/hooded-figure-thumb.webp',
                image: '/images/art/traditional/hooded-figure.webp',
                width: 1422,
                height: 2000
            }
        ]
    },
    {
        slug: 'sunday-market',
        title: 'Sunday Market Hall',
        category: 'Traditional',
        year: 2024,
        medium: 'Pen & ink',
        description: 'Urban Sketchers Johannesburg outing, August 2024.',
        tags: ['Urban Sketching', 'Ink'],
        for_sale: false,
        images: [
            {
                thumb: '/images/art/traditional/sunday-market-thumb.webp',
                image: '/images/art/traditional/sunday-market.webp',
                width: 2000,
                height: 1409
            }
        ]
    },
    {
        slug: 'rand-airport',
        title: 'SA Commercial Aviation Museum',
        category: 'Traditional',
        year: 2024,
        medium: 'Pen & ink',
        description: 'Rand Airport, Germiston — Urban Sketchers Johannesburg, June 2024.',
        tags: ['Urban Sketching', 'Ink'],
        for_sale: false,
        images: [
            {
                thumb: '/images/art/traditional/rand-airport-thumb.webp',
                image: '/images/art/traditional/rand-airport.webp',
                width: 2000,
                height: 1405
            }
        ]
    },
    {
        slug: 'old-lake-market',
        title: 'Old Lake Market',
        category: 'Traditional',
        year: 2024,
        medium: 'Pen & ink',
        description: 'Urban Sketchers Johannesburg outing.',
        tags: ['Urban Sketching', 'Ink'],
        for_sale: false,
        images: [
            {
                thumb: '/images/art/traditional/old-lake-market-thumb.webp',
                image: '/images/art/traditional/old-lake-market.webp',
                width: 2000,
                height: 1237
            }
        ]
    },
    {
        slug: 'braamfontein-tower',
        title: 'Braamfontein Tower',
        category: 'Traditional',
        year: 2024,
        medium: 'Pen & ink',
        description: 'On-location architectural study, April 2024.',
        tags: ['Architecture', 'Ink'],
        for_sale: false,
        images: [
            {
                thumb: '/images/art/traditional/braamfontein-tower-thumb.webp',
                image: '/images/art/traditional/braamfontein-tower.webp',
                width: 2000,
                height: 1401
            }
        ]
    },
    {
        slug: 'chartwell-castle',
        title: 'Chartwell Castle',
        category: 'Traditional',
        year: 2024,
        medium: 'Pen & ink',
        description: 'Urban Sketchers outing, early 2024.',
        tags: ['Urban Sketching', 'Architecture'],
        for_sale: false,
        images: [
            {
                thumb: '/images/art/traditional/chartwell-castle-thumb.webp',
                image: '/images/art/traditional/chartwell-castle.webp',
                width: 2000,
                height: 1404
            }
        ]
    },
    {
        slug: 'mamasamba',
        title: 'Mamasamba',
        category: 'Traditional',
        year: 2023,
        medium: 'Pen & watercolour',
        description: 'Streetside restaurant facade, painted on location.',
        tags: ['Urban Sketching', 'Architecture'],
        for_sale: false,
        images: [
            {
                thumb: '/images/art/traditional/mamasamba-thumb.webp',
                image: '/images/art/traditional/mamasamba.webp',
                width: 1184,
                height: 1920
            }
        ]
    },
    {
        slug: 'lucky-fish',
        title: 'Lucky Fish',
        category: 'Traditional',
        year: 2023,
        medium: 'Pen & watercolour',
        description: 'Streetside shopfront under a plane tree, painted on location.',
        tags: ['Urban Sketching'],
        for_sale: false,
        images: [
            {
                thumb: '/images/art/traditional/lucky-fish-thumb.webp',
                image: '/images/art/traditional/lucky-fish.webp',
                width: 1016,
                height: 1665
            }
        ]
    },
    {
        slug: 'village-pond',
        title: 'Village Pond',
        category: 'Traditional',
        year: 2023,
        medium: 'Pen & watercolour',
        description: 'Thatched cottages beside a pond.',
        tags: ['Landscape', 'Watercolour'],
        for_sale: false,
        images: [
            {
                thumb: '/images/art/traditional/village-pond-thumb.webp',
                image: '/images/art/traditional/village-pond.webp',
                width: 1920,
                height: 1135
            }
        ]
    },
    {
        slug: 'parked-car',
        title: 'Parked Car Study',
        category: 'Traditional',
        year: 2023,
        medium: 'Pen & ink',
        description: 'Urban Sketchers Johannesburg outing.',
        tags: ['Urban Sketching', 'Ink'],
        for_sale: false,
        images: [
            {
                thumb: '/images/art/traditional/parked-car-thumb.webp',
                image: '/images/art/traditional/parked-car.webp',
                width: 1418,
                height: 2000
            }
        ]
    }
];

export default ART_PIECES;

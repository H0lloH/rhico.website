/**
 * Art portfolio entries — digital and traditional. Drop images into
 * apps/web/public/images/art/ and reference them as '/images/art/<file>'.
 * Newest first. `for_sale` is a hook for the future print-shop phase.
 */
const ART_PIECES = [
    {
        slug: 'sample-digital-piece',
        title: 'Sample Digital Piece',
        category: 'Digital',
        year: 2025,
        description: 'Placeholder entry — replace with a real piece. Painted in Procreate / Photoshop.',
        image: '',
        tags: ['Illustration', 'Digital'],
        medium: 'Digital painting',
        for_sale: false
    },
    {
        slug: 'sample-traditional-piece',
        title: 'Sample Traditional Piece',
        category: 'Traditional',
        year: 2024,
        description: 'Placeholder entry — ink and watercolour on cotton paper.',
        image: '',
        tags: ['Ink', 'Watercolour'],
        medium: 'Ink & watercolour',
        for_sale: false
    }
];

export default ART_PIECES;

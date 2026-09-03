import Page from '../components/ui/page.jsx';
import ArtGallery from '../components/ui/art_gallery.jsx';

import ART_PIECES from '../data/art.js';

export default function Art() {
    // Render
    return (
        <Page eyebrow="Work" title="Art" intro="Digital and traditional pieces — illustration, painting, and studies. Prints coming later.">
            <ArtGallery pieces={ART_PIECES} empty_message="Art coming soon." />
        </Page>
    );
}

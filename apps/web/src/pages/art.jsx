import Page from '../components/ui/page.jsx';
import ProjectGrid from '../components/ui/project_grid.jsx';

import ART_PIECES from '../data/art.js';

export default function Art() {
    // Render
    return (
        <Page eyebrow="Work" title="Art" intro="Digital and traditional pieces — illustration, painting, and studies. Prints coming later.">
            <ProjectGrid projects={ART_PIECES} empty_message="Art coming soon." />
        </Page>
    );
}

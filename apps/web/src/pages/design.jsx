import Page from '../components/ui/page.jsx';
import ProjectGrid from '../components/ui/project_grid.jsx';

import DESIGN_PROJECTS from '../data/design.js';

export default function Design() {
    // Render
    return (
        <Page eyebrow="Work" title="Design" intro="Multimedia and graphic design — branding, layout, motion, and campaign work.">
            <ProjectGrid projects={DESIGN_PROJECTS} empty_message="Design work coming soon." />
        </Page>
    );
}

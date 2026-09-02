import Page from '../components/ui/page.jsx';
import ProjectGrid from '../components/ui/project_grid.jsx';

import CODE_PROJECTS from '../data/code.js';

export default function Code() {
    // Render
    return (
        <Page eyebrow="Work" title="Code" intro="Development and creative-coding projects — web apps, tools, and generative experiments.">
            <ProjectGrid projects={CODE_PROJECTS} empty_message="Projects coming soon." />
        </Page>
    );
}

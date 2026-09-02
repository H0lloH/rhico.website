import ProjectCard from './project_card.jsx';

export default function ProjectGrid({ projects = [], empty_message = 'Work coming soon.' }) {
    // Render
    if (projects.length === 0) {
        return <p className="rounded-xl border border-dashed border-line px-6 py-16 text-center text-sm text-muted">{empty_message}</p>;
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
                <ProjectCard key={project.slug ?? project.title} project={project} index={index} />
            ))}
        </div>
    );
}

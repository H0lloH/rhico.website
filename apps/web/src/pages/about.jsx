import Page from '../components/ui/page.jsx';
import Timeline from '../components/ui/timeline.jsx';

import { EXPERIENCE, EDUCATION, SKILLS } from '../data/experience.js';

export default function About() {
    // Render
    return (
        <Page eyebrow="About" title="About" intro="Multimedia designer turned junior developer, based in Johannesburg, South Africa.">
            <section className="max-w-2xl">
                <p className="text-lg leading-relaxed text-muted">
                    I studied at North-West University before starting out in graphic and motion design. Over the last few years I&apos;ve moved from producing brand, video and print content into building and
                    maintaining the interfaces that content lives in — most recently redesigning and developing company and client websites. Outside of client work, I sketch on location with Urban Sketchers
                    Johannesburg and paint digitally in my own time.
                </p>
            </section>

            <section className="mt-16 border-t border-line pt-16">
                <h2 className="mb-10 font-display text-2xl font-semibold text-ink">Experience</h2>
                <Timeline items={EXPERIENCE} />
            </section>

            <section className="mt-16 border-t border-line pt-16">
                <h2 className="mb-8 font-display text-2xl font-semibold text-ink">Education</h2>
                <ul className="flex flex-col divide-y divide-line border-y border-line">
                    {EDUCATION.map((entry) => (
                        <li key={`${entry.institution}-${entry.title}`} className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                            <div>
                                <p className="font-display text-base font-semibold text-ink">{entry.title}</p>
                                <p className="text-sm text-muted">
                                    {entry.institution}
                                    {entry.location && <span> &middot; {entry.location}</span>}
                                </p>
                                {entry.note && <p className="mt-1 text-sm text-muted">{entry.note}</p>}
                            </div>
                            <p className="shrink-0 text-sm text-accent">{entry.year}</p>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="mt-16 grid grid-cols-1 gap-10 border-t border-line pt-16 sm:grid-cols-2">
                <div>
                    <h2 className="mb-4 font-display text-lg font-semibold text-ink">Technical skills</h2>
                    <ul className="flex flex-wrap gap-2">
                        {SKILLS.technical.map((skill) => (
                            <li key={skill} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                                {skill}
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h2 className="mb-4 font-display text-lg font-semibold text-ink">Languages</h2>
                    <ul className="flex flex-col gap-1.5 text-sm text-muted">
                        {SKILLS.languages.map((language) => (
                            <li key={language.label}>
                                {language.label} <span className="text-muted/70">({language.level})</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="sm:col-span-2">
                    <h2 className="mb-4 font-display text-lg font-semibold text-ink">Interests</h2>
                    <ul className="flex flex-wrap gap-2">
                        {SKILLS.interests.map((interest) => (
                            <li key={interest} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                                {interest}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </Page>
    );
}

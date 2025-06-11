import React, { useEffect, useState } from "react";

import styles from "./Projects.module.css";

import projects from "../../data/projects.json";
import { ProjectCard } from "./ProjectCard";

export function Projects() {
    const [featuredProjects, setFeaturedProjects] = useState([]);
    const [otherProjects, setOtherProjects] = useState([]);
    useEffect(()=>{
        const featured = projects.filter(project => project.IsFeatured === "true");
        const others = projects.filter(project => project.IsFeatured === "false");
        setFeaturedProjects(featured);
        setOtherProjects(others);
    },[projects])
    return (
        <section className={styles.container} id="projects">
            <h2 className={styles.divider}>Projelerim</h2>
            <div className={styles.projects}>
                {featuredProjects.map((project, id) => {
                    return <ProjectCard key={id} project={project} />;
                })}
            </div>
            <h2 className={styles.divider}>Klon Projeler</h2>
            <div className={styles.projects}>
                {otherProjects.map((project, id) => {
                    return <ProjectCard key={id} project={project} />;
                })}
            </div>
        </section>
    );
}

import React from "react";
import styles from "./ProjectCard.module.css";

export function ProjectCard({
    project: { title, imageSrc, description, skills, demo, source },
}) {
    return (
        <div className={styles.container}>
            <img
                src={imageSrc}
                alt={`Image of ${title}`}
                className={styles.image}
            />
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
            <ul className={styles.skills}>
                {skills.map((skill, id) => (
                    <li key={id} className={styles.skill}>
                        {skill}
                    </li>
                ))}
            </ul>
            <div className={styles.links}>
                <a
                    href={demo?.source || demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                >
                    Demo
                </a>
                <a
                    href={source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                >
                    Kaynak
                </a>
            </div>
        </div>
    );
}

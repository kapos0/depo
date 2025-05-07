import React from "react";

import styles from "./Contact.module.css";
import { getImageUrl } from "../../utils";

export function Contact() {
    return (
        <footer id="contact" className={styles.container}>
            <div className={styles.text}>
                <h2>İletişim</h2>
            </div>
            <ul className={styles.links}>
                <li className={styles.link}>
                    <img
                        src={getImageUrl("contact/emailIcon.png")}
                        alt="Email icon"
                    />
                    <a href="mailto:eden.turhann@gmail.com">
                        eden.turhann@gmail.com
                    </a>
                </li>
                <li className={styles.link}>
                    <img
                        src={getImageUrl("contact/linkedinIcon.png")}
                        alt="LinkedIn icon"
                    />
                    <a
                        href="https://www.linkedin.com/in/mehmet-enes-turhan/"
                        target="_blank"
                    >
                        linkedin.com
                    </a>
                </li>
                <li className={styles.link}>
                    <img
                        src={getImageUrl("contact/githubIcon.png")}
                        alt="Github icon"
                    />
                    <a href="https://github.com/kapos0" target="_blank">
                        github.com/kapos0
                    </a>
                </li>
            </ul>
        </footer>
    );
}

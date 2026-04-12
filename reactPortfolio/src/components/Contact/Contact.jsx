import styles from "./Contact.module.css";
import emailIcon from "../../assets/contact/emailIcon.png";
import linkedinIcon from "../../assets/contact/linkedinIcon.png";
import githubIcon from "../../assets/contact/githubIcon.png";

export function Contact() {
    return (
        <footer id="contact" className={styles.container}>
            <div className={styles.text}>
                <h2>İletişim</h2>
            </div>
            <ul className={styles.links}>
                <li className={styles.link}>
                    <img src={emailIcon} alt="Email icon" />
                    <a href="mailto:memetenesturhan@gmail.com">
                        memetenesturhan@gmail.com
                    </a>
                </li>
                <li className={styles.link}>
                    <img src={linkedinIcon} alt="LinkedIn icon" />
                    <a
                        href="https://www.linkedin.com/in/mehmet-enes-turhan/"
                        target="_blank"
                    >
                        linkedin.com
                    </a>
                </li>
                <li className={styles.link}>
                    <img src={githubIcon} alt="Github icon" />
                    <a href="https://github.com/kapos0" target="_blank">
                        github.com/kapos0
                    </a>
                </li>
            </ul>
        </footer>
    );
}

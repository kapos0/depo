import styles from "./About.module.css";
import aboutImage from "../../assets/about/aboutImage.png";
import uiIcon from "../../assets/about/uiIcon.png";
import serverIcon from "../../assets/about/serverIcon.png";
import cursorIcon from "../../assets/about/cursorIcon.png";

export function About() {
    return (
        <section className={styles.container} id="about">
            <div className={styles.content}>
                <img
                    src={aboutImage}
                    alt="Me sitting with a laptop"
                    className={styles.aboutImage}
                />
                <ul className={styles.aboutItems}>
                    <li className={styles.aboutItem}>
                        <img src={uiIcon} alt="UI icon" />
                        <div className={styles.aboutItemText}>
                            <h3>Front-End Developer</h3>
                            <p>
                                Figma kullanarak modern arayüzler
                                tasarlayabiliyorum ve bu tasarımları React ve
                                Tailwind CSS ile hayata geçirebilirim.
                            </p>
                        </div>
                    </li>
                    <li className={styles.aboutItem}>
                        <img
                            src={serverIcon}
                            alt="server icon"
                            style={{ width: "70px", marginRight: "10px" }}
                        />
                        <div className={styles.aboutItemText}>
                            <h3>Bilgisayar teknikeri</h3>
                            <p>
                                Özellikle karatay belediyesinde çalıştığım süre
                                zarfında birçok bilgisayar teknikerliği işlerini
                                yaptım ve bu işlerde tecrübe kazandım
                            </p>
                        </div>
                    </li>
                    <li className={styles.aboutItem}>
                        <img src={cursorIcon} alt="Cursor icon" />
                        <div className={styles.aboutItemText}>
                            <h3>Full-Stack Developer</h3>
                            <p>
                                Deneyimi olmayan ama tutkuyla öğrenen bir
                                Full-Stack geliştiricisiyim Next.JS,
                                React-Native ve Electron ile çalışmaktayım
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    );
}

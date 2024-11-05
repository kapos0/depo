import React from "react";

import styles from "./About.module.css";
import { getImageUrl } from "../../utils";

export const About = () => {
  return (
    <section className={styles.container} id="about">
      <div className={styles.content}>
        <img
          src={getImageUrl("about/aboutImage.png")}
          alt="Me sitting with a laptop"
          className={styles.aboutImage}
        />
        <ul className={styles.aboutItems}>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/cursorIcon.png")} alt="Server icon" />
            <div className={styles.aboutItemText}>
              <h3>Front-End Developer</h3>
              <p>
                Hızlı ve optimize edilmiş Front-End sistemleri geliştirme
                konusunda deneyimim var React ile çalışmaktayım
              </p>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <img
              src={getImageUrl("about/serverIcon.png")}
              alt="server icon"
              style={{ width: "70px", marginRight: "10px" }}
            />
            <div className={styles.aboutItemText}>
              <h3>Bilgisayar teknikeri</h3>
              <p>
                Özellikle karatay belediyesinde çalıştığım süre zarfında birçok
                bilgisayar teknikerliği işlerini yaptım ve bu işlerde tecrübe
                kazandım
              </p>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/uiIcon.png")} alt="Cursor icon" />
            <div className={styles.aboutItemText}>
              <h3>Full-Stack Developer</h3>
              <p>
                Deneyimi olmayan ama tutkuyla öğrenen bir Full-Stack
                geliştiricisiyim Next.JS ile çalışmaktayım
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

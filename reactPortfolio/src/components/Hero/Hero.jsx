import React from "react";

import styles from "./Hero.module.css";
import { getImageUrl } from "../../utils";

export const Hero = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Mehmet Enes Turhan</h1>
        <p className={styles.description}>
          Full-Stack geliştiricisi olma yolunda azimle çalışıyorum. Ekip
          çalışmalarında kendimi başarılı buluyorum ve birlikte çalışmanın
          getirdiği sinerjiyi önemsiyorum. Ayrıca, bilgisayar teknikeri olarak
          tecrübem bulunmakta; bilgisayar donanımlarına hakimim.
        </p>
        <a
          href="/assets/skills/MehmetEnesTurhanCV.pdf"
          className={styles.contactBtn}
          style={{ marginBlock: 12 }}
          download="MehmetEnesTurhanCV.pdf"
        >
          CV' yi indir
        </a>
        <a href="mailto:eden.turhann@gmail.com" className={styles.contactBtn}>
          Mail iletişim
        </a>
      </div>
      <img
        src={getImageUrl("hero/heroImage.png")}
        alt="Hero image of me"
        className={styles.heroImg}
      />
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
};

import React from "react";

import styles from "./Hero.module.css";
import { getImageUrl } from "../../utils";

export const Hero = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Mehmet Enes Turhan</h1>
        <p className={styles.description}>
          Full-Stack geliştiricisi olmak için sürekli olarak azimli bir şekilde
          çalışmaktayım, Ekip çalışmalarında iyiyimdir (Buradaki yazı daha iyi
          yazılacak, hero image appe' la ki memojiden yapılcak)
        </p>
        <a
          href="/assets/CVMehmetEnesTurhan.pdf"
          className={styles.contactBtn}
          style={{ marginBlock: 12 }}
          download="MehmetEnesTurhanCV.pdf"
        >
          CV' yi indir
        </a>
        <a href="mailto:myemail@email.com" className={styles.contactBtn}>
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

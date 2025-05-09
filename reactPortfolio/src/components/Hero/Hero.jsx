import React from "react";

import styles from "./Hero.module.css";
import { getImageUrl } from "../../utils";

export function Hero() {
    return (
        <section className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Mehmet Enes Turhan</h1>
                <p className={styles.description}>
                    Full-Stack geliştirici olma yolunda azimle ilerliyorum ve
                    teknoloji dünyasındaki yenilikleri yakından takip ediyorum.
                    Şu anda aktif olarak Next.js, React Native ve Electron
                    üzerine çalışıyorum; projelerimde ise Docker, TypeScript ve
                    MongoDB gibi güncel teknolojileri kullanıyorum. Ayrıca,
                    freelancer olarak hem yazılım geliştirme hem de Figma ile
                    modern ve responsive arayüz tasarımı yapıyorum. Ekip
                    çalışmasına büyük önem veriyor, birlikte üretmenin getirdiği
                    sinerjiden keyif alıyorum. Takım içinde etkili iletişim
                    kurarak katkı sağlamayı önemsiyor ve bu alandaki
                    yetkinliğime güveniyorum. Bilgisayar teknikeri olarak sahip
                    olduğum deneyim sayesinde bilgisayar donanımları konusunda
                    güçlü bir bilgiye sahibim. Hem yazılım hem donanım
                    tarafındaki bu bilgi birikimi, projelere çok yönlü katkı
                    sağlamama olanak tanıyor.
                </p>
                <a
                    href="mailto:eden.turhann@gmail.com"
                    className={styles.contactBtn}
                >
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
}

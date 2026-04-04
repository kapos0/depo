import styles from "./Hero.module.css";
import { getImageUrl } from "../../utils";

export function Hero() {
    return (
        <section className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Mehmet Enes Turhan</h1>
                <p className={styles.description}>
                    <p>
                        Bilişim alanına duyduğum ilgi ve sürekli öğrenme
                        motivasyonumla kendimi teknoloji sektöründe
                        geliştirmekteyim. Bilgisayar Programcılığı altyapım ile
                        yazılım geliştirme (Web & Mobil) ve IT teknik destek
                        süreçlerinde yetkinlik kazanırken, devam eden İşletme
                        eğitimim sayesinde projelerin ticari bir bakış açısı
                        kazanmaktayım.
                    </p>
                    <br />
                    <p>
                        Sektörel gelişmelere entegre olabilmek amacıyla, Veri
                        Analizi Okulu bünyesinde yapay zeka ve veri analizi
                        üzerine eğitimler alıyorum. Yapay zeka araçlarını
                        programlama süreçlerime dahil ederek daha üretken ve
                        verimli çalışmayı hedefliyorum. Mevcut bilgi birikimi ve
                        pratiğimi, Bionluk üzerinden üstlendiğim freelance web
                        projeleriyle sahaya döküyor, müşteri odaklı çözümler
                        üretiyorum.
                    </p>
                    <br />
                    <p>
                        Global kaynakları ve teknik dökümanları rahatlıkla takip
                        edebilecek düzeyde İngilizce bilgisine sahibim. Ekip
                        çalışmasına uyumlu, bireysel görevlerde ise disiplinli
                        ve sonuç odaklı bir çalışma prensibi benimsiyorum.
                    </p>
                    <br />
                    <p>
                        Kendi gayretimle edindiğim bu birikimi, zorlu koşullara
                        rağmen yeşermeyi başaran bir fidana benzetiyorum.
                        Potansiyelimi besleyecek ve karşılıklı değer
                        üretebileceğimiz doğru profesyonel ortamı, yani o
                        "bahçeyi" bulduğumda kurumunuza çok daha verimli
                        katkılar sağlayacağıma inanıyorum.
                    </p>
                </p>
                <div style={{ display: "flex", gap: "32px" }}>
                    <a
                        href="mailto:eden.turhann@gmail.com"
                        className={styles.contactBtn}
                    >
                        Mail iletişim
                    </a>
                    <a
                        href="https://bionluk.com/turhan0"
                        className={styles.contactBtn}
                        target="_blank"
                    >
                        Bionluk profilim
                    </a>
                </div>
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

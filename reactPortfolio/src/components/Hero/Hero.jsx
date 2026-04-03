import styles from "./Hero.module.css";
import { getImageUrl } from "../../utils";

export function Hero() {
    return (
        <section className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Mehmet Enes Turhan</h1>
                <p className={styles.description}>
                    Bilişim (IT) dünyasına duyduğum köklü sevgi ve her gün yeni
                    bir şeyler öğrenme tutkumla, kendimi sürekli yenileyen bir
                    teknoloji profesyoneliyim. Bilgisayar Programcılığı
                    eğitimimle kendimi hem bir yazılım geliştirici (Web & Mobil)
                    hem de bir IT teknikeri olarak çok yönlü şekilde inşa
                    ediyorum. İşin teknik mutfağında sistemleri kurup kodlarken,
                    İşletme eğitimim sayesinde projelerin ticari mantığını ve
                    operasyonel işleyişini de stratejik bir bakış açısıyla
                    kavrıyorum. Hızla ivmelenen teknoloji dünyasında sağlam
                    temeller atmak adına, mülakatlarını başarıyla geçtiğim Veri
                    Analizi Okulu bünyesinde veri analizi ve yapay zeka üzerine
                    uzmanlaşıyorum. Amacım yapay zeka ekosistemine güçlü bir
                    giriş yapmak; AI ile programcılığı harmanlayarak onu günümüz
                    dinamiklerinde en efektif şekilde kullanmak. Yapay zekayı
                    süreçlerime entegre ederek çok daha üretken, hızlı ve
                    yenilikçi çözümler üretmeye çalışıyorum. Tüm bu teorik ve
                    pratik kazanımlarımı, Bionluk üzerinden geliştirdiğim
                    freelance web projeleriyle sahaya döküyor ve müşterilerime
                    yüksek memnuniyet oranlarıyla teslim ediyorum. Global
                    kaynakları ve teknik dökümanları rahatlıkla takip edebilecek
                    düzeyde iyi derecede İngilizce bilgisine sahibim. Ekip
                    içinde sıcakkanlı, paylaşımcı ve uyumlu; bireysel çalışırken
                    ise son derece disiplinli ve sonuç odaklıyım. Kariyer
                    yolculuğumda kendimi, zorlu koşullara rağmen kaldırım
                    taşları arasından yeşermeyi başaran direngen bir çiçeğe
                    benzetiyorum. Bugüne dek kendi çabam ve tutkumla o taşların
                    arasından filizlenip gelişmeyi bildim; potansiyelimi
                    besleyecek, vizyonumu paylaşacak o "bahçeyi" bulduğumda ise
                    çok daha güçlü dallanıp budaklanacağıma ve şirketinize büyük
                    bir değer katacağıma eminim.
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

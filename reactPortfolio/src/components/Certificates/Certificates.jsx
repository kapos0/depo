import styles from "./Certificates.module.css";

import certificates from "../../data/certificates.json";

export function Certificates() {
    return (
        <section className={styles.container} id="certificates">
            <h2 className={styles.title}>Sertifikalar</h2>
            <p className={styles.subtitle}>
                Eğitim sürecimde tamamladığım teknik programlar ve
                doğrulanabilir sertifikalar.
            </p>

            <div className={styles.grid}>
                {certificates.map((certificate, id) => {
                    return (
                        <article key={id} className={styles.card}>
                            <div className={styles.cardTop}>
                                <span className={styles.badge}>Sertifika</span>
                                <span className={styles.year}>
                                    {certificate.issuedAt}
                                </span>
                            </div>

                            <h3 className={styles.cardTitle}>
                                {certificate.title}
                            </h3>

                            <div className={styles.meta}>
                                <span className={styles.metaLabel}>Kurum</span>
                                <span className={styles.metaValue}>
                                    {certificate.issuer}
                                </span>
                            </div>

                            <div className={styles.meta}>
                                <span className={styles.metaLabel}>Kimlik</span>
                                <span className={styles.metaValue}>
                                    {certificate.credentialId}
                                </span>
                            </div>

                            <ul className={styles.skills}>
                                {certificate.skills.map((skill, skillId) => {
                                    return (
                                        <li
                                            key={skillId}
                                            className={styles.skill}
                                        >
                                            {skill}
                                        </li>
                                    );
                                })}
                            </ul>

                            <a
                                href={certificate.verifyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.verifyBtn}
                            >
                                Sertifikayı Görüntüle
                            </a>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}

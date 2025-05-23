import React from "react";

import styles from "./Comments.module.css";

export function Comments() {
    return (
        <section className={styles.container} id="comments">
            <h1 className={styles.title}>
                Bionluk Platformunda ki müşteri yorumlarım
            </h1>
            <div className={styles.content}>
                <ul className={styles.commentsItems}>
                    <li className={styles.commentsItem}>
                        <div className={styles.commentsItemText}>
                            <h3 className={styles.commentUser}>oleander87</h3>
                            <span className={styles.commentUserRating}>
                                ⭐ 5.0
                            </span>
                            <p>
                                Enes Bey hem çok profesyonel hem de UX/UI
                                konusunda oldukça deneyimli. Öncelikle
                                ihtiyaçlarımı benimle netleştirdi ve benim
                                taleplerimi de dikkate alarak, çok kısa sürede
                                harika bir çalışma yaptı. Başka projelerde de
                                görüşeceğimize eminim. Aşırı tavsiyedir!
                            </p>
                        </div>
                    </li>
                    <li className={styles.commentsItem}>
                        <div className={styles.commentsItemText}>
                            <h3 className={styles.commentUser}>mertcan7896</h3>
                            <span className={styles.commentUserRating}>
                                ⭐ 5.0
                            </span>
                            <p>
                                İşinin ehli ve mütevazi biri kendisiyle iş
                                yapmak iyiydi
                            </p>
                        </div>
                    </li>
                    <li className={styles.commentsItem}>
                        <div className={styles.commentsItemText}>
                            <h3 className={styles.commentUser}>martin1</h3>
                            <span className={styles.commentUserRating}>
                                ⭐ 5.0
                            </span>
                            <p>
                                Tarif edilen tüm detayları içeren çözümü
                                eksiksiz ve teslim süresinden önce bitirdi.
                                Özenli çalışan ve işine hakim bir arkadaş.
                                Teşekkürler.
                            </p>
                        </div>
                    </li>
                    <li className={styles.commentsItem}>
                        <div className={styles.commentsItemText}>
                            <h3 className={styles.commentUser}>cattusapps</h3>
                            <span className={styles.commentUserRating}>
                                ⭐ 5.0
                            </span>
                            <p>
                                Çok profesyonel bir iş çıkardı. Kendisiyle
                                tekrar çalışmayı kesinlikle çok isterim.
                            </p>
                        </div>
                    </li>
                    <li className={styles.commentsItem}>
                        <div className={styles.commentsItemText}>
                            <h3 className={styles.commentUser}>cattusapps</h3>
                            <span className={styles.commentUserRating}>
                                ⭐ 5.0
                            </span>
                            <p>
                                Oldukça profesyonel ve hızlı bir iş çıkardı.
                                Kendisiyle tekrardan çalışmak isteriz.
                            </p>
                        </div>
                    </li>
                    <li className={styles.commentsItem}>
                        <div className={styles.commentsItemText}>
                            <h3 className={styles.commentUser}>cenk3564</h3>
                            <span className={styles.commentUserRating}>
                                ⭐ 5.0
                            </span>
                            <p>Eline sağlık çözüm odaklı ve temiz çalışıyor</p>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    );
}

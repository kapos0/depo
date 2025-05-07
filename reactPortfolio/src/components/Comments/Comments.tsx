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

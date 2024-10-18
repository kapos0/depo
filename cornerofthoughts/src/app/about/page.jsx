import styles from "@/app/about/about.module.css";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h2 className={styles.subtitle}>About Agency</h2>
        <h1 className={styles.title}>
          We create digital ideas that are bigger, bolder, braver and better
        </h1>
        <p className={styles.desc}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error
          doloribus ipsum molestias dolor eaque magnam, nostrum hic ad ducimus
          mollitia temporibus. Quasi expedita ut quo laborum aperiam velit
          delectus culpa.
        </p>
        <div className={styles.boxes}>
          <div className={styles.box}>
            <h1>10 K+</h1>
            <p>Year of experience</p>
          </div>
          <div className={styles.box}>
            <h1>10 K+</h1>
            <p>Year of experience</p>
          </div>
          <div className={styles.box}>
            <h1>10 K+</h1>
            <p>Year of experience</p>
          </div>
        </div>
      </div>
      <div className={styles.imgContainer}>
        <Image src="/about.png" alt="about hero" fill className={styles.img} />
      </div>
    </div>
  );
}

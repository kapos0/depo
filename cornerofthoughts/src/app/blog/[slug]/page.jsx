import PostUser from "@/components/postUser/postUser";
import styles from "./singlePost.module.css";
import Image from "next/image";
import { Suspense } from "react";
export default function SinglePostPage({ params }) {
  console.log(params);
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image
          src="/placeholder.jpg"
          alt=""
          width={480}
          height={300}
          className={styles.img}
        />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Title</h1>
        <div className={styles.detail}>
          <Image
            className={styles.avatar}
            src="/noavatar.png"
            alt=""
            width={50}
            height={50}
          />
          <Suspense fallback={<div>Loading...</div>}>
            <PostUser userName="Mehmet Enes Turhan" />
          </Suspense>
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>18.10.2024</span>
          </div>
        </div>
        <div className={styles.content}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        </div>
      </div>
    </div>
  );
}

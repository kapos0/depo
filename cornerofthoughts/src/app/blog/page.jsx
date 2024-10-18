import PostCard from "@/components/postCard/postCard";
import styles from "./blog.module.css";
export default function BlogPage({ searchParams }) {
  console.log(searchParams);
  const post = {
    title: "Post title",
    body: "Post content",
    createdAt: "01.01.2024",
    img: "/placeholder.jpg",
    slug: "post-title",
  };
  return (
    <div className={styles.container}>
      <div className={styles.post}>
        <PostCard post={post} />
      </div>
      <div className={styles.post}>
        <PostCard post={post} />
      </div>
      <div className={styles.post}>
        <PostCard post={post} />
      </div>
      <div className={styles.post}>
        <PostCard post={post} />
      </div>
    </div>
  );
}

import Link from "next/link";
import styles from "./navbar.module.css";
import Links from "@/components/navbar/links/Links";

export default function Navbar() {
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>
        Logo
      </Link>
      <div>
        <Links />
      </div>
    </div>
  );
}

import styles from "./page.module.css";
import { PostList } from "@/components/post-list";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>

        <h1 className={styles.title}>
          DrunkX
        </h1>

        <h2 className={styles.subtitle}>
          Share your tipsy thoughts
        </h2>

        <PostList />
      </div>
    </main>
  );
}

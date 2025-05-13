import styles from "./page.module.css";

import Image from "next/image";

import heroImg from "../../public/assets/hero.png";

import { db } from "@/services/firebaseConnection";

import { collection, getDocs } from "firebase/firestore";

async function getComments() {
  const commentRef = collection(db, "comments");

  const commentSnapshot = await getDocs(commentRef);

  const postsRef = collection(db, "tasks");

  const postsSnapshot = await getDocs(postsRef);

  return {
    posts: postsSnapshot.size || 0,
    comments: commentSnapshot.size || 0,
  };
}

export const revalidate = 60 * 2;

export default async function Home() {
  const data = await getComments();

  const { posts, comments } = data;

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.logoContent}>
          <Image
            className={styles.hero}
            alt="Logo tarefas+"
            src={heroImg}
            priority //prioridade para carregar a imagem primeiro
          />
        </div>
        <h1 className={styles.title}>
          Sistema feito para você organizar <br />
          seus estudos e tarefas
        </h1>

        <div className={styles.infoContent}>
          <section className={styles.box}>
            <span>+{posts} posts</span>
          </section>
          <section className={styles.box}>
            <span>+{comments} comentários</span>
          </section>
        </div>
      </main>
    </div>
  );
}

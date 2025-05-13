"use client";

import styles from "./styles.module.css";

import Textarea from "@/components/textarea";

import { ChangeEvent, useState } from "react";

import { useSession } from "next-auth/react";

import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";

import { db } from "@/services/firebaseConnection";

import { FaTrash } from "react-icons/fa";

interface CommentsProps {
  id: string;
  comment: string;
  taskId: string;
  user: string;
  name: string;
}

interface TaskProps {
  task: {
    tarefa: string;
    public: boolean;
    user: string;
    taskId: string;
    created: string;
  };
  allComments: CommentsProps[];
}

export default function TaskInfo({ task, allComments }: TaskProps) {
  const { data: session } = useSession();

  const [comment, setComment] = useState<string>("");

  const [comments, setComments] = useState<CommentsProps[]>(allComments || []);

  const handleComments = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (comment === "") return;

    if (!session?.user?.email || !session?.user?.name) {
      return;
    }

    if (!task?.taskId) return;

    try {
      const docRef = collection(db, "comments");

      const doc = await addDoc(docRef, {
        comment: comment,
        created: new Date(),
        user: session?.user?.email,
        userName: session?.user?.name,
        taskId: task?.taskId,
      });

      const data = {
        id: doc.id,
        comment: String(comment),
        user: session?.user?.email,
        name: session?.user?.name,
        taskId: task?.taskId,
      };

      setComments((prev) => [...prev, data]);

      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async (id: string) => {
    try {
      const docRef = doc(db, "comments", id);

      await deleteDoc(docRef).then(() => {
        setComments((prev) => prev.filter((item) => item.id != id));
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>Tarefa</h1>
        <article className={styles.task}>
          <p>{task.tarefa}</p>
        </article>
      </main>

      <section className={styles.commentsContainer}>
        <h2>Deixar comentário</h2>
        <form onSubmit={handleComments}>
          <Textarea
            placeholder="Digite seu comentário..."
            value={comment}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setComment(e.target.value)
            }
          />
          <button className={styles.button} disabled={!session?.user}>
            Enviar comentário
          </button>
        </form>
      </section>

      <section className={styles.commentsContainer}>
        <h2>Todos os comentários</h2>
        {comments.length === 0 && <span>Nenhum comentário encontrado...</span>}
        {comments.map((item) => (
          <article className={styles.comment} key={item.id}>
            <div className={styles.headComment}>
              <label className={styles.labelComments}>{item.name}</label>
              {item.user === session?.user?.email && (
                <button
                  className={styles.trashBtn}
                  onClick={() => handleDeleteComment(item.id)}
                >
                  <FaTrash size={18} color="#ea3140" />
                </button>
              )}
            </div>
            <p>{item.comment}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

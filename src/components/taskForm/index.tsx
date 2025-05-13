"use client";

import { FiShare2 } from "react-icons/fi";

import { FaTrash } from "react-icons/fa";

import styles from "./styles.module.css";

import Textarea from "../textarea";

import { ChangeEvent, FormEvent, useState, useEffect } from "react";

import { db } from "@/services/firebaseConnection";

import Link from "next/link";

import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";

interface TaskFormProps {
  user: string | undefined;
}

interface TaskProps {
  id: string;
  created: Date;
  public: boolean;
  tarefa: string;
  user: string;
}

const TaskForm = ({ user }: TaskFormProps) => {
  const [input, setInput] = useState<string>("");

  const [publicTask, setPublicTask] = useState<boolean>(false);

  const [tasks, setTasks] = useState<TaskProps[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      const tasksRef = collection(db, "tasks");

      const q = query(
        tasksRef,
        orderBy("created", "desc"),
        where("user", "==", user)
      );

      onSnapshot(q, (snapshot) => {
        let list = [] as TaskProps[];

        snapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            tarefa: doc.data().tarefa,
            created: doc.data().created,
            user: doc.data().user,
            public: doc.data().public,
          });
        });

        setTasks(list);
      });
    };

    loadTasks();
  }, [user]);

  const handleChangePublic = (e: ChangeEvent<HTMLInputElement>) => {
    setPublicTask(e.target.checked);
  };

  const handleRegisterTask = async (e: FormEvent) => {
    e.preventDefault();

    if (input === "") {
      return;
    }

    try {
      await addDoc(collection(db, "tasks"), {
        tarefa: input,
        created: new Date(),
        user: user,
        public: publicTask,
      });

      setInput("");

      setPublicTask(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShare = async (id: string) => {
    await navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_URL}/task/${id}`
    );
  };

  const handleDeleteTask = async (id: string) => {
    try {
      const docRef = doc(db, "tasks", id);

      await deleteDoc(docRef);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <section className={styles.content}>
          <div className={styles.contentForm}>
            <h1 className={styles.title}>Qual sua tarefa?</h1>
            <form onSubmit={handleRegisterTask}>
              <Textarea
                placeholder="Digite qual sua tarefa..."
                value={input}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setInput(e.target.value)
                }
              />
              <div className={styles.checkboxArea}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={publicTask}
                  onChange={handleChangePublic}
                />
                <label htmlFor="checkbox">Deixar tarefa pública</label>
              </div>

              <button type="submit" className={styles.button}>
                Registrar
              </button>
            </form>
          </div>
        </section>
        <section className={styles.taskContainer}>
          <h1>Minhas tarefas</h1>
          {tasks.map((task) => (
            <article className={styles.task} key={task.id}>
              {task.public && (
                <div className={styles.tagContainer}>
                  <label className={styles.tag}>PUBLICA</label>
                  <button
                    className={styles.shareButton}
                    onClick={() => handleShare(task.id)}
                  >
                    <FiShare2 size={22} color="#4183ff" />
                  </button>
                </div>
              )}
              <div className={styles.taskContent}>
                {task.public ? (
                  <Link href={`/task/${task.id}`}>
                    <p>{task.tarefa}</p>
                  </Link>
                ) : (
                  <p>{task.tarefa}</p>
                )}
                <button
                  className={styles.trash}
                  onClick={() => handleDeleteTask(task.id)}
                >
                  <FaTrash size={24} color="#ea3140" />
                </button>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
};

export default TaskForm;

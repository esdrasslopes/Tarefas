import { db } from "@/services/firebaseConnection";

import {
  doc,
  query,
  collection,
  where,
  getDocs,
  getDoc,
} from "firebase/firestore";

import { redirect } from "next/navigation";

interface CommentProps {
  id: string;
  comment: string;
  taskId: string;
  user: string;
  name: string;
}

export async function getTask(id: string) {
  const docRef = doc(db, "tasks", id);

  const snapshot = await getDoc(docRef);

  if (snapshot.data() === undefined) {
    return redirect("/");
  }

  if (!snapshot.data()?.public) {
    return redirect("/");
  }

  const milliseconds = snapshot.data()?.created.seconds * 1000;

  const task = {
    tarefa: snapshot.data()?.tarefa,
    created: new Date(milliseconds).toLocaleDateString(),
    public: snapshot.data()?.public,
    user: snapshot.data()?.user,
    taskId: id,
  };

  return task;
}

export async function getComments(id: string) {
  const q = query(collection(db, "comments"), where("taskId", "==", id));

  const snapshotComments = await getDocs(q);

  let allComments: CommentProps[] = [];

  snapshotComments.forEach((doc) => {
    allComments.push({
      id: doc.id,
      comment: String(doc.data().comment),
      user: doc.data().user,
      name: doc.data().userName,
      taskId: doc.data().taskId,
    });
  });

  return allComments;
}

import { Metadata } from "next";

import { getTask, getComments } from "./actions";

import TaskInfo from "@/components/TaskInfo";

export const metadata: Metadata = {
  title: "Detalhes da tarefa",
};

interface ParamsProps {
  params: { id: string };
}

export default async function Task({ params }: ParamsProps) {
  const { id } = await params;

  const task = await getTask(id);

  const allComments = await getComments(id);

  return <TaskInfo task={task} allComments={allComments} />;
}

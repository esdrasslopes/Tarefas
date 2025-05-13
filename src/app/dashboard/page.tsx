import { Metadata } from "next";

import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { redirect } from "next/navigation";

import TaskForm from "@/components/taskForm";

export const metadata: Metadata = {
  title: "Dashboard | Tarefas+",
  description: "Gerencie suas tarefas no dashboard",
};

const getUserSession = async () => {
  const session = await getServerSession(authOptions);

  return session;
};

export default async function Dashboard() {
  const session = await getUserSession();

  if (!session?.user?.email) {
    redirect("/");
  }

  return <TaskForm user={session.user.email} />;
}

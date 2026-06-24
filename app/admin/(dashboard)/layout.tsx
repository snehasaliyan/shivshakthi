import { ReactNode } from "react";
import styles from "./Admin.module.css";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Sidebar from "./Sidebar";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const userName = session.user?.name || "Administrator";
  const userEmail = session.user?.email || "";
  const userInitial = (session.user?.name?.charAt(0) || session.user?.email?.charAt(0) || "A").toUpperCase();

  return (
    <div className={styles.adminLayout}>
      <Sidebar userName={userName} userEmail={userEmail} userInitial={userInitial} />
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}


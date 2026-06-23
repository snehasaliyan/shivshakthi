import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import styles from "../Admin.module.css";
import SettingsForm from "./SettingsForm";

export default async function AdminSettings() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Admin Settings</h1>
      </div>
      
      <SettingsForm 
        initialName={session.user?.name || ""} 
        email={session.user?.email || ""} 
      />
    </div>
  );
}

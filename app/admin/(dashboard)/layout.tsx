import { ReactNode } from "react";
import styles from "./Admin.module.css";
import Link from "next/link";
import { LogOut, LayoutDashboard, Settings } from "lucide-react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>CPT Admin</h2>
          <p className={styles.sidebarSub}>Shiva Shakthi Marketing</p>
        </div>
        <nav className={styles.sidebarNav}>
          <Link href="/admin" className={styles.navLink}>
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>
          <Link href="/admin/settings" className={styles.navLink}>
            <Settings size={18} />
            <span>Settings</span>
          </Link>
        </nav>
        <div className={styles.sidebarFooter}>
          <div className={styles.userProfile}>
            <div className={styles.avatar}>{session.user?.name?.charAt(0) || 'A'}</div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{session.user?.name}</span>
              <span className={styles.userRole}>Administrator</span>
            </div>
          </div>
          <Link href="/api/auth/signout" className={styles.logoutBtn}>
            <LogOut size={16} />
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}

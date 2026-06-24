import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import styles from "./Admin.module.css";
import { Users, Inbox, PackageSearch } from "lucide-react";
import LeadsTable from "./LeadsTable";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const requests = await prisma.quoteRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  const total = requests.length;
  const newRequests = requests.filter(r => r.status === "New").length;
  const samples = requests.filter(r => r.action === "sample").length;

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Lead Dashboard</h1>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={styles.statTitle}>Total Requests</div>
            <div className={styles.statIcon}><Users size={20} /></div>
          </div>
          <div className={styles.statValue}>{total}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={styles.statTitle}>New / Uncontacted</div>
            <div className={styles.statIcon} style={{ color: "#EF4444", background: "rgba(239, 68, 68, 0.1)" }}><Inbox size={20} /></div>
          </div>
          <div className={styles.statValue} style={{ color: "#EF4444" }}>{newRequests}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={styles.statTitle}>Sample Swatch Orders</div>
            <div className={styles.statIcon} style={{ color: "#34D399", background: "rgba(16, 185, 129, 0.1)" }}><PackageSearch size={20} /></div>
          </div>
          <div className={styles.statValue} style={{ color: "#34D399" }}>{samples}</div>
        </div>
      </div>

      <LeadsTable initialRequests={requests} />
    </div>
  );
}

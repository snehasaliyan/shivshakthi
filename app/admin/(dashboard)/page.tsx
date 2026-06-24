import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import styles from "./Admin.module.css";
import StatusUpdater from "./StatusUpdater";
import { Users, Inbox, PackageSearch } from "lucide-react";

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

      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <h3>Recent Inquiries</h3>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Company / Contact</th>
              <th>Thread Spec</th>
              <th>Region</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td>{req.createdAt.toLocaleDateString()}</td>
                <td>
                  <span className={req.action === "quote" ? styles.badgeQuote : styles.badgeSample}>
                    {req.action === "quote" ? "Bulk Quote" : "Sample"}
                  </span>
                </td>
                <td>
                  <strong>{req.companyName}</strong>
                  <br />
                  <span style={{ fontSize: "0.75rem", color: "#A8A09A" }}>{req.fullName} • {req.phone || req.email}</span>
                </td>
                <td>
                  {req.threadType}
                  {req.colorCode && (
                    <>
                      <br />
                      <span style={{ fontSize: "0.75rem", color: "#A8A09A" }}>Color: {req.colorCode}</span>
                    </>
                  )}
                </td>
                <td>{req.region}</td>
                <td>
                  <StatusUpdater requestId={req.id} initialStatus={req.status} />
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", padding: "4rem", color: "#A8A09A" }}>
                  <Inbox size={48} style={{ opacity: 0.2, marginBottom: "1rem" }} />
                  <p style={{ margin: 0 }}>No requests yet.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

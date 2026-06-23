import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import styles from "./Admin.module.css";
import StatusUpdater from "./StatusUpdater"; // Client component

// Mark as dynamic since we want to always fetch the latest DB rows
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
          <div className={styles.statTitle}>Total Requests</div>
          <div className={styles.statValue}>{total}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statTitle}>New / Uncontacted</div>
          <div className={styles.statValue} style={{ color: "#EF4444" }}>{newRequests}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statTitle}>Sample Swatch Orders</div>
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
                <td colSpan={6} style={{ textAlign: "center", padding: "3rem", color: "#A8A09A" }}>
                  No requests yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

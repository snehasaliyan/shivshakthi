"use client";

import { useState } from "react";
import styles from "./Admin.module.css";
import { useRouter } from "next/navigation";

export default function StatusUpdater({ requestId, initialStatus }: { requestId: string, initialStatus: string }) {
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setLoading(true);

    try {
      const res = await fetch("/api/quote", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: requestId, status: newStatus }),
      });

      if (res.ok) {
        // Refresh the server component to update the stats header
        router.refresh();
      } else {
        setStatus(initialStatus);
        alert("Failed to update status");
      }
    } catch (error) {
      console.error(error);
      setStatus(initialStatus);
      alert("Error updating status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <select
      className={styles.statusSelect}
      value={status}
      onChange={handleStatusChange}
      disabled={loading}
      style={{
        borderColor: status === "New" ? "#EF4444" : status === "Contacted" ? "#F59E0B" : "#10B981",
        color: status === "New" ? "#EF4444" : status === "Contacted" ? "#F59E0B" : "#10B981"
      }}
    >
      <option value="New">New</option>
      <option value="Contacted">Contacted</option>
      <option value="Resolved">Resolved</option>
    </select>
  );
}

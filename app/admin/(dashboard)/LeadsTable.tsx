"use client";

import { useState } from "react";
import styles from "./Admin.module.css";
import StatusUpdater from "./StatusUpdater";
import { Inbox, Search, Download, Eye, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";

// The shape of our request object based on Prisma schema
type QuoteRequest = {
  id: string;
  action: string;
  companyName: string;
  fullName: string;
  email: string;
  phone: string | null;
  region: string;
  threadType: string;
  colorCode: string | null;
  message: string | null;
  status: string;
  createdAt: Date;
};

export default function LeadsTable({ initialRequests }: { initialRequests: QuoteRequest[] }) {
  const [requests, setRequests] = useState<QuoteRequest[]>(initialRequests);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  
  const [selectedLead, setSelectedLead] = useState<QuoteRequest | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const router = useRouter();

  // Filter logic
  const filteredRequests = requests.filter(req => {
    const matchesSearch = 
      req.companyName.toLowerCase().includes(search.toLowerCase()) ||
      req.fullName.toLowerCase().includes(search.toLowerCase()) ||
      req.email.toLowerCase().includes(search.toLowerCase());
      
    const matchesStatus = statusFilter === "All" || req.status === statusFilter;
    const matchesType = typeFilter === "All" || req.action === typeFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesType;
  });

  const handleExportCSV = () => {
    if (filteredRequests.length === 0) return;
    
    const headers = ["Date", "Type", "Company", "Name", "Email", "Phone", "Region", "Thread Spec", "Color", "Status", "Notes"];
    const rows = filteredRequests.map(req => [
      new Date(req.createdAt).toLocaleDateString(),
      req.action === "quote" ? "Bulk Quote" : "Sample Swatch",
      `"${req.companyName.replace(/"/g, '""')}"`,
      `"${req.fullName.replace(/"/g, '""')}"`,
      req.email,
      req.phone || "",
      `"${req.region.replace(/"/g, '""')}"`,
      `"${req.threadType.replace(/"/g, '""')}"`,
      req.colorCode ? `"${req.colorCode.replace(/"/g, '""')}"` : "",
      req.status,
      req.message ? `"${req.message.replace(/"/g, '""')}"` : ""
    ]);

    const csvContent = [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `CPT_Leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this lead?")) return;
    
    setIsDeleting(id);
    try {
      const res = await fetch(`/api/quote/${id}`, { method: "DELETE" });
      if (res.ok) {
        setRequests(requests.filter(r => r.id !== id));
        router.refresh();
      } else {
        alert("Failed to delete lead");
      }
    } catch (error) {
      alert("Error deleting lead");
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <>
      <div className={styles.tableContainer}>
        <div className={styles.tableTools}>
          <div className={styles.searchWrapper}>
            <Search size={16} className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search by company, name, or email..." 
              className={styles.searchInput}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className={styles.filtersWrapper}>
            <select 
              className={styles.filterSelect}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Resolved">Resolved</option>
            </select>
            
            <select 
              className={styles.filterSelect}
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Quote">Bulk Quotes</option>
              <option value="Sample">Sample Swatches</option>
            </select>

            <button onClick={handleExportCSV} className={styles.exportBtn}>
              <Download size={16} /> Export CSV
            </button>
          </div>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Company / Contact</th>
              <th>Thread Spec</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((req) => (
              <tr key={req.id}>
                <td>{new Date(req.createdAt).toLocaleDateString()}</td>
                <td>
                  <span className={req.action === "quote" ? styles.badgeQuote : styles.badgeSample}>
                    {req.action === "quote" ? "Bulk Quote" : "Sample"}
                  </span>
                </td>
                <td>
                  <strong>{req.companyName}</strong>
                  <br />
                  <span style={{ fontSize: "0.75rem", color: "#A8A09A" }}>{req.fullName} • {req.email}</span>
                </td>
                <td>
                  {req.threadType}
                </td>
                <td>
                  <StatusUpdater requestId={req.id} initialStatus={req.status} />
                </td>
                <td>
                  <div className={styles.actionGroup}>
                    <button 
                      onClick={() => setSelectedLead(req)} 
                      className={styles.iconBtn}
                      title="View Details"
                    >
                      <Eye size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(req.id)} 
                      className={`${styles.iconBtn} ${styles.iconBtnDelete}`}
                      title="Delete Lead"
                      disabled={isDeleting === req.id}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredRequests.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", padding: "4rem", color: "#A8A09A" }}>
                  <Inbox size={48} style={{ opacity: 0.2, marginBottom: "1rem" }} />
                  <p style={{ margin: 0 }}>No leads found matching your filters.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Details */}
      {selectedLead && (
        <div className={styles.modalOverlay} onClick={() => setSelectedLead(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Lead Details</h2>
              <button className={styles.closeBtn} onClick={() => setSelectedLead(null)}>
                <X size={24} />
              </button>
            </div>
            
            <div className={styles.modalBody}>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Type</span>
                <span className={styles.detailValue}>
                  <span className={selectedLead.action === "quote" ? styles.badgeQuote : styles.badgeSample}>
                    {selectedLead.action === "quote" ? "Bulk Quote Request" : "Sample Swatch Order"}
                  </span>
                </span>
              </div>
              
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Date Submitted</span>
                <span className={styles.detailValue}>{new Date(selectedLead.createdAt).toLocaleString()}</span>
              </div>

              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Company</span>
                <span className={styles.detailValue}>{selectedLead.companyName}</span>
              </div>

              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Contact Name</span>
                <span className={styles.detailValue}>{selectedLead.fullName}</span>
              </div>

              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Email</span>
                <span className={styles.detailValue}><a href={`mailto:${selectedLead.email}`} style={{ color: "#D4AF37", textDecoration: "none" }}>{selectedLead.email}</a></span>
              </div>

              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Phone</span>
                <span className={styles.detailValue}>{selectedLead.phone || "Not provided"}</span>
              </div>

              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Region</span>
                <span className={styles.detailValue}>{selectedLead.region}</span>
              </div>

              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Thread Spec</span>
                <span className={styles.detailValue}>{selectedLead.threadType}</span>
              </div>

              {selectedLead.colorCode && (
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Color Code</span>
                  <span className={styles.detailValue}>{selectedLead.colorCode}</span>
                </div>
              )}

              {selectedLead.message && (
                <div className={styles.detailRow} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <span className={styles.detailLabel}>Additional Notes / Message</span>
                  <div className={styles.notesBox}>
                    {selectedLead.message}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

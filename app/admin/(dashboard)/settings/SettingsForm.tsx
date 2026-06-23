"use client";

import { useState } from "react";
import styles from "../Admin.module.css";
import { User, Lock, Bell, CheckCircle } from "lucide-react";

export default function SettingsForm({ initialName, email }: { initialName: string; email: string }) {
  const [name, setName] = useState(initialName);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      
      const data = await res.json();
      if (res.ok) {
        setMessage({ text: "Profile updated successfully!", type: "success" });
      } else {
        setMessage({ text: data.error || "Failed to update profile", type: "error" });
      }
    } catch (err) {
      setMessage({ text: "An error occurred", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage({ text: "New passwords do not match", type: "error" });
      return;
    }

    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      
      const data = await res.json();
      if (res.ok) {
        setMessage({ text: "Password changed successfully!", type: "success" });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setMessage({ text: data.error || "Failed to change password", type: "error" });
      }
    } catch (err) {
      setMessage({ text: "An error occurred", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {message.text && (
        <div style={{
          padding: "1rem",
          borderRadius: "8px",
          backgroundColor: message.type === "success" ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
          color: message.type === "success" ? "#34D399" : "#EF4444",
          border: `1px solid ${message.type === "success" ? "rgba(16, 185, 129, 0.3)" : "rgba(239, 68, 68, 0.3)"}`,
          display: "flex",
          alignItems: "center",
          gap: "0.5rem"
        }}>
          {message.type === "success" && <CheckCircle size={18} />}
          {message.text}
        </div>
      )}

      {/* Profile Section */}
      <div className={styles.tableContainer} style={{ padding: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
          <User size={20} color="#D4AF37" />
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.25rem", color: "#F5F0E8" }}>Admin Profile</h2>
        </div>
        
        <form onSubmit={handleUpdateProfile} style={{ display: "flex", flexDirection: "column", gap: "1.25rem", maxWidth: "400px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={{ fontSize: "0.85rem", color: "#A8A09A" }}>Email Address</label>
            <input
              type="text"
              value={email}
              disabled
              style={{ backgroundColor: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.05)", padding: "0.75rem", borderRadius: "8px", color: "#6B6560", outline: "none", cursor: "not-allowed" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label htmlFor="name" style={{ fontSize: "0.85rem", color: "#A8A09A" }}>Display Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ backgroundColor: "rgba(0,0,0,0.5)", border: "1px solid rgba(212,175,55,0.2)", padding: "0.75rem", borderRadius: "8px", color: "#F5F0E8", outline: "none" }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{ alignSelf: "flex-start", backgroundColor: "rgba(212,175,55,0.1)", color: "#D4AF37", border: "1px solid rgba(212,175,55,0.3)", padding: "0.5rem 1rem", borderRadius: "8px", fontWeight: "600", cursor: loading ? "not-allowed" : "pointer", transition: "all 0.2s" }}
          >
            Update Profile
          </button>
        </form>
      </div>

      {/* Security Section */}
      <div className={styles.tableContainer} style={{ padding: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
          <Lock size={20} color="#D4AF37" />
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.25rem", color: "#F5F0E8" }}>Security</h2>
        </div>
        
        <form onSubmit={handleUpdatePassword} style={{ display: "flex", flexDirection: "column", gap: "1.25rem", maxWidth: "400px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label htmlFor="currentPassword" style={{ fontSize: "0.85rem", color: "#A8A09A" }}>Current Password</label>
            <input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              style={{ backgroundColor: "rgba(0,0,0,0.5)", border: "1px solid rgba(212,175,55,0.2)", padding: "0.75rem", borderRadius: "8px", color: "#F5F0E8", outline: "none" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label htmlFor="newPassword" style={{ fontSize: "0.85rem", color: "#A8A09A" }}>New Password</label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={6}
              style={{ backgroundColor: "rgba(0,0,0,0.5)", border: "1px solid rgba(212,175,55,0.2)", padding: "0.75rem", borderRadius: "8px", color: "#F5F0E8", outline: "none" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label htmlFor="confirmPassword" style={{ fontSize: "0.85rem", color: "#A8A09A" }}>Confirm New Password</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{ backgroundColor: "rgba(0,0,0,0.5)", border: "1px solid rgba(212,175,55,0.2)", padding: "0.75rem", borderRadius: "8px", color: "#F5F0E8", outline: "none" }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{ alignSelf: "flex-start", backgroundColor: "rgba(212,175,55,0.1)", color: "#D4AF37", border: "1px solid rgba(212,175,55,0.3)", padding: "0.5rem 1rem", borderRadius: "8px", fontWeight: "600", cursor: loading ? "not-allowed" : "pointer", transition: "all 0.2s" }}
          >
            Change Password
          </button>
        </form>
      </div>

      {/* Notifications Section (Mock) */}
      <div className={styles.tableContainer} style={{ padding: "2rem", opacity: 0.7 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
          <Bell size={20} color="#D4AF37" />
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.25rem", color: "#F5F0E8" }}>Notifications</h2>
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }}>
            <input type="checkbox" defaultChecked style={{ accentColor: "#D4AF37", width: "16px", height: "16px" }} />
            <span style={{ fontSize: "0.9rem", color: "#A8A09A" }}>Email me when a new Quote is requested</span>
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }}>
            <input type="checkbox" defaultChecked style={{ accentColor: "#D4AF37", width: "16px", height: "16px" }} />
            <span style={{ fontSize: "0.9rem", color: "#A8A09A" }}>Email me when a new Sample Swatch is ordered</span>
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }}>
            <input type="checkbox" style={{ accentColor: "#D4AF37", width: "16px", height: "16px" }} />
            <span style={{ fontSize: "0.9rem", color: "#A8A09A" }}>Weekly lead generation digest</span>
          </label>
        </div>
      </div>
    </div>
  );
}

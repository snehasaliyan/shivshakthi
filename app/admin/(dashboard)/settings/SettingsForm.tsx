"use client";

import { useState } from "react";
import styles from "../Admin.module.css";
import { User, Lock, Bell, CheckCircle, Mail } from "lucide-react";
import { signOut } from "next-auth/react";

export default function SettingsForm({ initialName, email: initialEmail }: { initialName: string; email: string }) {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
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
        body: JSON.stringify({ name, email }),
      });
      
      const data = await res.json();
      if (res.ok) {
        if (data.emailChanged) {
          setMessage({ text: "Email changed. Please log in again.", type: "success" });
          setTimeout(() => {
            signOut({ callbackUrl: "/admin/login" });
          }, 2000);
        } else {
          setMessage({ text: "Profile updated successfully!", type: "success" });
        }
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
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.25rem", color: "#F5F0E8", margin: 0 }}>Admin Profile</h2>
        </div>
        
        <form onSubmit={handleUpdateProfile} style={{ display: "flex", flexDirection: "column", gap: "1.25rem", maxWidth: "400px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label htmlFor="email" style={{ fontSize: "0.85rem", color: "#A8A09A" }}>Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
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
              className={styles.input}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={styles.btnPrimary}
            style={{ alignSelf: "flex-start", marginTop: "0.5rem" }}
          >
            Update Profile
          </button>
        </form>
      </div>

      {/* Security Section */}
      <div className={styles.tableContainer} style={{ padding: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
          <Lock size={20} color="#D4AF37" />
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.25rem", color: "#F5F0E8", margin: 0 }}>Security</h2>
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
              className={styles.input}
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
              className={styles.input}
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
              className={styles.input}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={styles.btnPrimary}
            style={{ alignSelf: "flex-start", marginTop: "0.5rem" }}
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}

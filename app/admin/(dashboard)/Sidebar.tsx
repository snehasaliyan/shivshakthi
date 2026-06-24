"use client";

import { useState } from "react";
import Link from "next/link";
import { LogOut, LayoutDashboard, Settings, Menu, X } from "lucide-react";
import styles from "./Admin.module.css";

type SidebarProps = {
  userName: string;
  userEmail: string;
  userInitial: string;
};

export default function Sidebar({ userName, userEmail, userInitial }: SidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className={styles.mobileTopBar}>
        <div className={styles.mobileLogoGroup}>
          <span className={styles.mobileLogoText}>CPT Admin</span>
        </div>
        <button
          className={styles.hamburgerBtn}
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Overlay for mobile */}
      {open && (
        <div
          className={styles.sidebarOverlay}
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar itself */}
      <aside className={`${styles.sidebar} ${open ? styles.sidebarOpen : ""}`}>
        <div className={styles.sidebarHeader}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <h2>CPT Admin</h2>
            <button className={styles.closeSidebarBtn} onClick={() => setOpen(false)} aria-label="Close menu">
              <X size={20} />
            </button>
          </div>
          <p className={styles.sidebarSub}>Shiva Shakthi Marketing</p>
        </div>
        <nav className={styles.sidebarNav}>
          <Link href="/admin" className={styles.navLink} onClick={() => setOpen(false)}>
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>
          <Link href="/admin/settings" className={styles.navLink} onClick={() => setOpen(false)}>
            <Settings size={18} />
            <span>Settings</span>
          </Link>
        </nav>
        <div className={styles.sidebarFooter}>
          <div className={styles.userProfile}>
            <div className={styles.avatar}>{userInitial}</div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{userName}</span>
              <span className={styles.userRole}>{userEmail}</span>
            </div>
          </div>
          <Link href="/api/auth/signout" className={styles.logoutBtn}>
            <LogOut size={16} />
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>
    </>
  );
}

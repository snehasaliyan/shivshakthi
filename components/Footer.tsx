"use client";
import Image from "next/image";
import styles from "./Footer.module.css";
import { Phone, Mail, MapPin, ArrowUp } from "lucide-react";

const navLinks = [
  { label: "Our Story", href: "#story" },
  { label: "Products", href: "#products" },
  { label: "Shade Card", href: "#products" },
  { label: "ETP & Eco", href: "#etp" },
  { label: "Clients", href: "#clients" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className={styles.footer}>
      {/* Top border gradient */}
      <div className={styles.topBorder} />

      <div className="container">
        <div className={styles.grid}>
          {/* Brand Column */}
          <div className={styles.brandCol}>
            <div className={styles.logoWrap}>
              <Image
                src="/logo.png"
                alt="Classic Poly Threads Logo"
                width={64}
                height={64}
                className={styles.logoImg}
              />
              <div>
                <p className={styles.brandName}>Classic Poly Threads</p>
                <p className={styles.brandSub}>Shiva Shakthi Marketing</p>
              </div>
            </div>
            <p className={styles.brandDesc}>
              Premier Azo-free sewing thread manufacturer operational since 1997.
              Trusted by India&apos;s leading garment brands. ISO 9002 certified.
              35 tons/month dyeing capacity.
            </p>
            <div className={styles.estBadge}>
              <span className="badge badge-gold">Est. 1997</span>
              <span className="badge badge-gold">ISO 9002</span>
              <span className="badge badge-gold">Azo-Free</span>
            </div>
          </div>

          {/* Navigation Column */}
          <div className={styles.navCol}>
            <h4 className={styles.colTitle}>Quick Links</h4>
            <ul className={styles.navList}>
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={styles.navLink}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Corporate HQ Column */}
          <div className={styles.addressCol}>
            <h4 className={styles.colTitle}>Corporate Office</h4>
            <div className={styles.contactGroup}>
              <div className={styles.contactRow}>
                <MapPin size={14} className={styles.contactIcon} />
                <p className={styles.contactText}>
                  #30, Govinda Nilaya, 1st Floor,<br />
                  1st Cross Road, RRMR Extension,<br />
                  Sudhama Nagar, Bengaluru — 560027
                </p>
              </div>
              <div className={styles.contactRow}>
                <Phone size={14} className={styles.contactIcon} />
                <div>
                  <a href="tel:+919880720646" className={styles.contactLink}>+91 98807 20646</a>
                  <p className={styles.contactMeta}>Mr. Chandrashekar T Anchan · Proprietor</p>
                </div>
              </div>
              <div className={styles.contactRow}>
                <Mail size={14} className={styles.contactIcon} />
                <a href="mailto:dasshikthmar@gmail.com" className={styles.contactLink}>
                  dasshikthmar@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Factory Column */}
          <div className={styles.addressCol}>
            <h4 className={styles.colTitle}>Manufacturing Plant</h4>
            <div className={styles.contactGroup}>
              <div className={styles.contactRow}>
                <MapPin size={14} className={styles.contactIcon} />
                <p className={styles.contactText}>
                  Shed No. 19, Doddaballapura<br />
                  Integrated Textile Park,<br />
                  Arehalli Guddadahalli — 561205
                </p>
              </div>
              <div className={styles.contactRow}>
                <Phone size={14} className={styles.contactIcon} />
                <div>
                  <a href="tel:+919844031435" className={styles.contactLink}>+91 98440 31435</a>
                  <p className={styles.contactMeta}>Mr. Kishore Kumar · Factory Manager</p>
                </div>
              </div>
            </div>

            <div className={styles.capabilities}>
              <h5 className={styles.capTitle}>Production Capabilities</h5>
              {[
                "Core Spun Polyester Thread",
                "Spun Polyester Thread",
                "CF Poly (Continuous Filament)",
                "Recycled Material Thread",
              ].map((cap) => (
                <p key={cap} className={styles.capItem}>· {cap}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Shiva Shakthi Marketing. Classic Poly Threads®.
            All rights reserved. Bengaluru, Karnataka, India.
          </p>
          <div className={styles.bottomRight}>
            <p className={styles.seoText}>
              Azo-free thread manufacturer Bangalore · Bulk sewing thread supplier Karnataka
            </p>
            <button
              className={styles.scrollTopBtn}
              onClick={scrollToTop}
              aria-label="Scroll to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

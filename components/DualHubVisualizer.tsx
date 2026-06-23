"use client";
import { useRef } from "react";
import Image from "next/image";
import styles from "./DualHubVisualizer.module.css";
import { MapPin, Building2, Factory, Phone, Mail } from "lucide-react";

export default function DualHubVisualizer() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section id="story" ref={ref} className={`section bg-charcoal-mid ${styles.section}`}>
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <span className="label-text">Our Infrastructure</span>
          <div className="gold-divider center" />
          <h2 className="section-title">
            Dual-Hub Operations Across <span className="gold-text">Karnataka</span>
          </h2>
          <p className={styles.headerSub}>
            From our corporate headquarters in Bengaluru to our state-of-the-art
            manufacturing facility in the Doddaballapura Textile Park — engineered
            for seamless B2B supply chain execution.
          </p>
        </div>

        {/* Dual Cards */}
        <div className={styles.grid}>
          {/* Head Office */}
          <div className={`glass-card corner-accent ${styles.hubCard} ${styles.officeCard}`}>
            <div className={styles.hubIcon}>
              <Building2 size={32} strokeWidth={1.5} />
            </div>
            <div className={styles.hubBadge}>
              <span className="badge badge-gold">Corporate HQ</span>
            </div>
            <h3 className={styles.hubTitle}>Main Branch Office</h3>
            <p className={styles.hubSubtitle}>Commercial & Business Operations</p>
            <div className="gold-divider" />

            <div className={styles.hubDetails}>
              <div className={styles.detailRow}>
                <MapPin size={16} className={styles.detailIcon} />
                <div>
                  <p className={styles.detailLabel}>Address</p>
                  <p className={styles.detailValue}>
                    #30, Govinda Nilaya, 1st Floor,<br />
                    1st Cross Road, RRMR Extension,<br />
                    Sudhama Nagar, Bengaluru — 560027
                  </p>
                </div>
              </div>
              <div className={styles.detailRow}>
                <Building2 size={16} className={styles.detailIcon} />
                <div>
                  <p className={styles.detailLabel}>Proprietor</p>
                  <p className={styles.detailValue}>Mr. Chandrashekar T Anchan</p>
                </div>
              </div>
              <div className={styles.detailRow}>
                <Phone size={16} className={styles.detailIcon} />
                <div>
                  <p className={styles.detailLabel}>Contact</p>
                  <a href="tel:+919880720646" className={styles.detailLink}>+91 98807 20646</a>
                </div>
              </div>
              <div className={styles.detailRow}>
                <Mail size={16} className={styles.detailIcon} />
                <div>
                  <p className={styles.detailLabel}>Email</p>
                  <a href="mailto:dasshikthmar@gmail.com" className={styles.detailLink}>
                    dasshikthmar@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className={styles.hubFunctions}>
              {["Sales & Procurement", "Client Relations", "Finance & Compliance", "Logistics Coordination"].map((fn) => (
                <span key={fn} className={`badge badge-gold ${styles.fnBadge}`}>{fn}</span>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className={styles.dividerCol}>
            <div className={styles.dividerLine} />
            <div className={styles.dividerDiamond}>
              <div className={styles.diamond} />
            </div>
            <div className={styles.dividerLine} />
          </div>

          {/* Factory */}
          <div className={`glass-card corner-accent ${styles.hubCard} ${styles.factoryCard}`}>
            <div className={styles.hubIcon} style={{ color: "#D4AF37", borderColor: "rgba(212,175,55,0.3)", background: "rgba(212,175,55,0.08)" }}>
              <Factory size={32} strokeWidth={1.5} />
            </div>
            <div className={styles.hubBadge}>
              <span className="badge badge-gold">Production Facility</span>
            </div>
            <h3 className={styles.hubTitle}>Manufacturing Plant</h3>
            <p className={styles.hubSubtitle}>Dyeing, Winding & Quality Operations</p>
            <div className="gold-divider" />

            <div className={styles.hubDetails}>
              <div className={styles.detailRow}>
                <MapPin size={16} className={styles.detailIcon} />
                <div>
                  <p className={styles.detailLabel}>Address</p>
                  <p className={styles.detailValue}>
                    Shed No. 19, Doddaballapura<br />
                    Integrated Textile Park,<br />
                    Arehalli Guddadahalli — 561205
                  </p>
                </div>
              </div>
              <div className={styles.detailRow}>
                <Factory size={16} className={styles.detailIcon} />
                <div>
                  <p className={styles.detailLabel}>Factory Manager</p>
                  <p className={styles.detailValue}>Mr. Kishore Kumar</p>
                </div>
              </div>
              <div className={styles.detailRow}>
                <Phone size={16} className={styles.detailIcon} />
                <div>
                  <p className={styles.detailLabel}>Contact</p>
                  <a href="tel:+919844031435" className={styles.detailLink}>+91 98440 31435</a>
                </div>
              </div>
            </div>

            <div className={styles.hubFunctions}>
              {["35T/Month Dyeing", "Winding (Reshmi)", "ETP Operations", "QC & Dispatch"].map((fn) => (
                <span key={fn} className={`badge badge-gold ${styles.fnBadge}`}>{fn}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Factory Image Strip */}
        <div className={styles.imageStrip}>
          <div className={styles.imageCard}>
            <Image src="/dyeing_section.png" alt="Dyeing Section" fill className="img-cover" />
            <div className={styles.imageLabel}>Dyeing Section</div>
          </div>
          <div className={styles.imageCard}>
            <Image src="/winding_section.png" alt="Winding Section (Reshmi)" fill className="img-cover" />
            <div className={styles.imageLabel}>Winding Section · Reshmi</div>
          </div>
        </div>
      </div>
    </section>
  );
}

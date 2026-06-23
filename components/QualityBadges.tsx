"use client";
import styles from "./QualityBadges.module.css";
import { Shield, CheckCircle, Award, Microscope } from "lucide-react";

const badges = [
  {
    icon: Award,
    title: "ISO 9002 Certified",
    subtitle: "Quality Management System",
    description:
      "100% of our yarn inputs are sourced exclusively from ISO 9002 certified mills, ensuring every spool meets international manufacturing quality standards.",
    highlight: "International Standard",
    color: "#D4AF37",
  },
  {
    icon: Shield,
    title: "100% Azo-Free",
    subtitle: "Certified Non-Toxic Dyes",
    description:
      "Guaranteed zero Azo-dye compounds across all 700 color formulations. Fully compliant with REACH regulations and global safety standards for garment exports.",
    highlight: "REACH Compliant",
    color: "#4CAF80",
  },
  {
    icon: CheckCircle,
    title: "Certified Mills Only",
    subtitle: "Controlled Yarn Sourcing",
    description:
      "Every raw material batch is procured from verified, certified supply partners. No exceptions. Full traceability from fiber to finished thread.",
    highlight: "100% Traceable",
    color: "#14A085",
  },
  {
    icon: Microscope,
    title: "Lab-Tested Quality",
    subtitle: "Pre-Dispatch Verification",
    description:
      "Each production batch undergoes multi-point QC verification including tensile strength testing, colorfast ratings, and chemical compound analysis.",
    highlight: "Multi-Point QC",
    color: "#B8860B",
  },
];

export default function QualityBadges() {
  return (
    <section className={`section bg-charcoal ${styles.section}`}>
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <span className="label-text">Compliance & Quality</span>
          <div className="gold-divider center" />
          <h2 className="section-title">
            Quality <span className="gold-text">Assurance Framework</span>
          </h2>
          <p className={styles.headerSub}>
            Every thread we produce is backed by an uncompromising commitment to certification,
            traceability, and chemical safety.
          </p>
        </div>

        {/* Badge Grid */}
        <div className={`grid-4 ${styles.grid}`}>
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.title}
                className={`glass-card ${styles.badgeCard}`}
                style={{ "--badge-color": badge.color } as React.CSSProperties}
              >
                <div className={styles.iconWrap}>
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                <div className={styles.highlightTag}>{badge.highlight}</div>
                <h3 className={styles.badgeTitle}>{badge.title}</h3>
                <p className={styles.badgeSubtitle}>{badge.subtitle}</p>
                <p className={styles.badgeDesc}>{badge.description}</p>
              </div>
            );
          })}
        </div>

        {/* Central ISO Badge */}
        <div className={styles.isoBanner}>
          <div className={styles.isoLeft}>
            <div className={styles.isoIconWrap}>
              <Award size={40} strokeWidth={1} />
            </div>
            <div>
              <h3 className={styles.isoTitle}>ISO 9002 Quality Assured</h3>
              <p className={styles.isoSub}>
                All raw yarn inputs sourced exclusively from ISO 9002 certified mills.
                Every spool guaranteed 100% Azo-free.
              </p>
            </div>
          </div>
          <div className={styles.isoRight}>
            <div className={styles.isoStat}>
              <span className={styles.isoStatNum}>100%</span>
              <span className={styles.isoStatLabel}>Certified Sources</span>
            </div>
            <div className={styles.isoStatDiv} />
            <div className={styles.isoStat}>
              <span className={styles.isoStatNum}>0</span>
              <span className={styles.isoStatLabel}>Azo Compounds</span>
            </div>
            <div className={styles.isoStatDiv} />
            <div className={styles.isoStat}>
              <span className={styles.isoStatNum}>∞</span>
              <span className={styles.isoStatLabel}>Batch Traceability</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

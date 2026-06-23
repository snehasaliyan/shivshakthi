"use client";
import styles from "./ClientMarquee.module.css";
import { Star } from "lucide-react";

const clients = [
  "Mufti",
  "Pan America",
  "Korrun",
  "Pantaloons",
  "Zudio",
  "Myntra",
  "Killer",
];

// Double the array for seamless loop
const marqueeItems = [...clients, ...clients, ...clients];

export default function ClientMarquee() {
  return (
    <section id="clients" className={`section-sm bg-charcoal-mid ${styles.section}`}>
      <div className="container">
        <div className={styles.header}>
          <span className="label-text">Trusted By India&apos;s Best</span>
          <div className="gold-divider center" />
          <h2 className={`section-title ${styles.headline}`}>
            Enterprise <span className="gold-text">Client Portfolio</span>
          </h2>
          <p className={styles.headerSub}>
            Supplying precision-engineered threads to 100+ garment hubs and India&apos;s
            leading fashion conglomerates.
          </p>
        </div>
      </div>

      {/* Full-width marquee */}
      <div className={styles.marqueeWrapper} aria-label="Client brands">
        <div className={styles.marqueeTrack}>
          {marqueeItems.map((client, i) => (
            <div key={`${client}-${i}`} className={styles.clientChip}>
              <Star size={12} className={styles.star} />
              <span className={styles.clientName}>{client}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Second row, opposite direction */}
      <div className={`${styles.marqueeWrapper} ${styles.marqueeReverse}`} aria-hidden="true">
        <div className={`${styles.marqueeTrack} ${styles.marqueeTrackReverse}`}>
          {marqueeItems.map((client, i) => (
            <div key={`${client}-rev-${i}`} className={`${styles.clientChip} ${styles.clientChipAlt}`}>
              <Star size={12} className={styles.star} />
              <span className={styles.clientName}>{client}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Footer */}
      <div className="container">
        <div className={styles.statsRow}>
          <div className={styles.stat}>
            <span className={styles.statNum}>100+</span>
            <span className={styles.statLabel}>Active Enterprise Clients</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>29+</span>
            <span className={styles.statLabel}>Years of B2B Partnerships</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>PAN India</span>
            <span className={styles.statLabel}>Supply Network</span>
          </div>
        </div>
      </div>
    </section>
  );
}

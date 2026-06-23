"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./HeroSection.module.css";

interface StatItem {
  end: number;
  suffix: string;
  prefix?: string;
  label: string;
  decimals?: number;
}

const stats: StatItem[] = [
  { end: 29, suffix: "+", label: "Years of Industrial Expertise", prefix: "" },
  { end: 35, suffix: " Tons", label: "Monthly Dyeing Throughput", prefix: "" },
  { end: 100, suffix: "+", label: "Enterprise Garment Hubs Supplied", prefix: "" },
];

function useCountUp(end: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(end);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);

  return count;
}

function StatCard({ stat, trigger }: { stat: StatItem; trigger: boolean }) {
  const count = useCountUp(stat.end, 2200, trigger);
  return (
    <div className={styles.statCard}>
      <div className="stat-number">
        {stat.prefix}{count}
        <span className="stat-unit">{stat.suffix}</span>
      </div>
      <div className="stat-label">{stat.label}</div>
    </div>
  );
}

export default function HeroSection() {
  const [triggerCount, setTriggerCount] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setTriggerCount(true), 400);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="hero" ref={sectionRef} className={styles.hero}>
      {/* Background */}
      <div className={styles.bg}>
        <Image
          src="/hero_background.png"
          alt="Classic Poly Threads manufacturing facility"
          fill
          className={styles.bgImg}
          priority
          quality={85}
        />
        <div className={styles.overlay} />
        <div className={styles.overlayGold} />
      </div>

      {/* Particle Lines */}
      <div className={styles.lines} aria-hidden="true">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={styles.line} style={{ animationDelay: `${i * 0.8}s` }} />
        ))}
      </div>

      {/* Content */}
      <div className={`container ${styles.content}`}>
        <div className={styles.eyebrow}>
          <div className={styles.eyebrowLine} />
          <span className="label-text">Classic Poly Threads · Since 1997</span>
          <div className={styles.eyebrowLine} />
        </div>

        <h1 className={`display-xl ${styles.headline}`}>
          India&apos;s Premier<br />
          <span className="shimmer-text">Azo-Free Thread</span><br />
          Manufacturer
        </h1>

        <p className={styles.subtext}>
          Precision-engineered sewing threads. ISO 9002 certified. Trusted by
          India&apos;s leading fashion & garment conglomerates.
        </p>

        <div className={styles.ctas}>
          <a href="#contact" className="btn-primary" id="hero-cta-quote">
            <span>Request Bulk Quote</span>
          </a>
          <a href="#products" className="btn-outline" id="hero-cta-products">
            Explore Products
          </a>
        </div>

        {/* Stats Bar */}
        <div className={styles.statsBar}>
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} trigger={triggerCount} />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator}>
        <span className={styles.scrollText}>Scroll to Explore</span>
        <div className={styles.scrollArrow} />
      </div>
    </section>
  );
}

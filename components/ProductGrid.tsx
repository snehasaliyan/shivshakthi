"use client";
import { useState } from "react";
import styles from "./ProductGrid.module.css";
import { ChevronDown, Zap, Layers, Sparkles, Recycle, Check } from "lucide-react";

interface Product {
  id: string;
  icon: React.ElementType;
  name: string;
  tagline: string;
  description: string;
  applications: string[];
  specs: { label: string; value: string }[];
  color: string;
}

const products: Product[] = [
  {
    id: "core-spun",
    icon: Zap,
    name: "Core Spun Polyester",
    tagline: "High-Tensile Precision Thread",
    description:
      "Engineered with a polyester filament core wrapped in staple fibers, delivering exceptional tensile strength, seam security, and heat resistance. The industry standard for heavy-duty automated sewing applications across denim, workwear, and technical textiles.",
    applications: [
      "Heavy-duty denim sewing",
      "Workwear & industrial garments",
      "Automated high-speed machines",
      "Upholstery & leather goods",
      "Technical & protective gear",
    ],
    specs: [
      { label: "Tensile Strength", value: "Exceptional" },
      { label: "Heat Resistance", value: "High" },
      { label: "Seam Security", value: "Maximum" },
      { label: "Machine Speed", value: "High-Speed Compatible" },
    ],
    color: "#D4AF37",
  },
  {
    id: "spun-poly",
    icon: Layers,
    name: "Spun Polyester",
    tagline: "Universal Application Matrix",
    description:
      "A versatile, premium-grade thread crafted from 100% polyester staple fibers. Offers a soft hand-feel similar to natural fibers while delivering superior durability, colorfastness, and resistance to chemical and biological degradation.",
    applications: [
      "Apparel & fashion garments",
      "Knitwear & t-shirts",
      "Shirts & lightweight fabrics",
      "Bags & accessories",
      "General-purpose sewing",
    ],
    specs: [
      { label: "Hand-feel", value: "Soft & Natural" },
      { label: "Colorfastness", value: "Superior" },
      { label: "Application Range", value: "Universal" },
      { label: "Dye Absorption", value: "Excellent" },
    ],
    color: "#B8860B",
  },
  {
    id: "cf-poly",
    icon: Sparkles,
    name: "CF Poly — Continuous Filament",
    tagline: "Zero-Friction Luster Profiles",
    description:
      "Continuous filament polyester thread engineered for maximum luster, silky smoothness, and frictionless passage through needle eyes. Ideal for high-speed embroidery, decorative stitching, and applications demanding a premium visual finish.",
    applications: [
      "Embroidery & decorative stitching",
      "Lingerie & fine apparel",
      "High-speed serging",
      "Elastic & stretch fabrics",
      "Premium fashion brands",
    ],
    specs: [
      { label: "Luster", value: "High Shine" },
      { label: "Surface Friction", value: "Minimal" },
      { label: "Smoothness", value: "Silky Filament" },
      { label: "Needle Pass", value: "Zero-Friction" },
    ],
    color: "#C0A060",
  },
  {
    id: "recycled",
    icon: Recycle,
    name: "Recycled Material Thread",
    tagline: "Traceable Sustainable Fibers",
    description:
      "Manufactured from certified post-consumer and post-industrial recycled polyester fibers. Each spool is fully traceable through our documented waste-to-thread chain. Meets international sustainability compliance standards for ESG-focused garment brands.",
    applications: [
      "Sustainable fashion brands",
      "ESG-compliant supply chains",
      "Eco-certified garments",
      "Organic & green collections",
      "Export apparel (EU markets)",
    ],
    specs: [
      { label: "Source", value: "Post-Consumer rPET" },
      { label: "Traceability", value: "Full Chain Documented" },
      { label: "Certification", value: "Sustainability Compliant" },
      { label: "CO₂ Footprint", value: "Significantly Reduced" },
    ],
    color: "#4CAF80",
  },
];

export default function ProductGrid() {
  const [expanded, setExpanded] = useState<string | null>("core-spun");

  return (
    <section id="products" className={`section bg-charcoal ${styles.section}`}>
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <span className="label-text">Products & Technical Capacities</span>
          <div className="gold-divider center" />
          <h2 className="section-title">
            The <span className="gold-text">Filament & Blend</span> Matrix
          </h2>
          <p className={styles.headerSub}>
            Four precision-engineered thread categories covering the full spectrum of modern garment manufacturing requirements.
          </p>
        </div>

        {/* Product Cards */}
        <div className={styles.productList}>
          {products.map((product) => {
            const Icon = product.icon;
            const isOpen = expanded === product.id;

            return (
              <div
                key={product.id}
                className={`${styles.productCard} ${isOpen ? styles.productCardOpen : ""}`}
                style={{ "--product-color": product.color } as React.CSSProperties}
              >
                {/* Card Header (always visible) */}
                <button
                  className={styles.cardHeader}
                  onClick={() => setExpanded(isOpen ? null : product.id)}
                  aria-expanded={isOpen}
                  id={`product-btn-${product.id}`}
                >
                  <div className={styles.cardHeaderLeft}>
                    <div className={styles.iconWrap}>
                      <Icon size={24} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className={styles.cardName}>{product.name}</p>
                      <p className={styles.cardTagline}>{product.tagline}</p>
                    </div>
                  </div>
                  <ChevronDown
                    size={20}
                    className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
                  />
                </button>

                {/* Expanded Content */}
                <div className={`${styles.cardBody} ${isOpen ? styles.cardBodyOpen : ""}`}>
                  <div className={styles.cardInner}>
                    <div className={styles.bodyGrid}>
                      {/* Description */}
                      <div className={styles.descCol}>
                        <p className={styles.description}>{product.description}</p>
                        <div className={styles.applications}>
                          <p className={styles.appTitle}>Key Applications</p>
                          <ul className={styles.appList}>
                            {product.applications.map((app) => (
                              <li key={app} className={styles.appItem}>
                                <Check size={14} className={styles.checkIcon} />
                                {app}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Specs */}
                      <div className={styles.specsCol}>
                        <p className={styles.appTitle}>Technical Specifications</p>
                        <div className={styles.specsList}>
                          {product.specs.map((spec) => (
                            <div key={spec.label} className={styles.specRow}>
                              <span className={styles.specLabel}>{spec.label}</span>
                              <span className={styles.specValue}>{spec.value}</span>
                            </div>
                          ))}
                        </div>
                        <a href="#contact" className="btn-primary" style={{ marginTop: "1.5rem", fontSize: "0.8rem" }}>
                          <span>Request Sample</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

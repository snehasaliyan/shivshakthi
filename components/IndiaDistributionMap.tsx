"use client";
import { useState } from "react";
import styles from "./IndiaDistributionMap.module.css";
import { MapPin, Package } from "lucide-react";

interface City {
  id: string;
  name: string;
  x: number; // SVG percentage X
  y: number; // SVG percentage Y
  category: string;
  products: string;
  state: string;
}

const cities: City[] = [
  { id: "bangalore", name: "Bangalore", x: 37.5, y: 72, category: "Headquarters & Distribution Hub", products: "All Thread Types", state: "Karnataka" },
  { id: "rayadurga", name: "Rayadurga", x: 36, y: 65, category: "Garment Cluster", products: "Core Spun, Spun Poly", state: "Andhra Pradesh" },
  { id: "bellary", name: "Bellary", x: 38, y: 60, category: "Industrial Zone", products: "Core Spun Polyester", state: "Karnataka" },
  { id: "vapi", name: "Vapi", x: 26, y: 40, category: "Textile SEZ", products: "CF Poly, Recycled", state: "Gujarat" },
  { id: "mumbai", name: "Mumbai", x: 25, y: 45, category: "Fashion Hub", products: "All Thread Types", state: "Maharashtra" },
  { id: "hyderabad", name: "Hyderabad", x: 42, y: 58, category: "Garment Cluster", products: "Spun Poly, Core Spun", state: "Telangana" },
  { id: "coimbatore", name: "Coimbatore", x: 36, y: 79, category: "Textile City", products: "All Thread Types", state: "Tamil Nadu" },
  { id: "kannur", name: "Kannur", x: 32, y: 76, category: "Bag Manufacturing", products: "CF Poly, Core Spun", state: "Kerala" },
  { id: "namakkal", name: "Namakkal", x: 37, y: 78, category: "Knitwear Hub", products: "Spun Poly, Recycled", state: "Tamil Nadu" },
];

export default function IndiaDistributionMap() {
  const [hoveredCity, setHoveredCity] = useState<City | null>(null);
  const [activeCity, setActiveCity] = useState<City | null>(null);

  const displayCity = activeCity || hoveredCity;

  return (
    <section className={`section bg-charcoal ${styles.section}`}>
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <span className="label-text">Supply Network</span>
          <div className="gold-divider center" />
          <h2 className="section-title">
            Pan-India <span className="gold-text">Distribution Network</span>
          </h2>
          <p className={styles.headerSub}>
            Active supply channels spanning India&apos;s premier garment, knitwear, and bag manufacturing corridors.
          </p>
        </div>

        <div className={styles.mapContainer}>
          {/* Map SVG */}
          <div className={styles.mapWrap}>
            <svg
              viewBox="0 0 100 120"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.indiaMap}
              aria-label="India distribution map"
            >
              {/* India outline - simplified path */}
              <path
                d="M 35 5 L 42 5 L 52 8 L 58 12 L 65 10 L 70 15 L 72 22 L 75 25 L 72 30 L 68 28 L 65 32 L 68 38 L 65 42 L 60 40 L 55 45 L 58 50 L 55 55 L 50 58 L 48 65 L 45 70 L 42 75 L 38 80 L 35 85 L 32 88 L 28 90 L 25 85 L 20 78 L 18 70 L 15 65 L 12 58 L 15 52 L 12 45 L 15 40 L 18 35 L 15 28 L 18 22 L 22 18 L 25 12 L 30 8 Z"
                className={styles.indiaOutline}
              />
              {/* Internal state lines - simplified */}
              <path d="M 35 30 L 55 30 M 30 45 L 60 45 M 28 60 L 55 60 M 32 70 L 50 70" className={styles.stateLines} />

              {/* Connection lines from Bangalore */}
              {cities.filter(c => c.id !== "bangalore").map(city => (
                <line
                  key={`line-${city.id}`}
                  x1={cities[0].x}
                  y1={cities[0].y}
                  x2={city.x}
                  y2={city.y}
                  className={styles.connectionLine}
                  strokeDasharray="2 2"
                />
              ))}

              {/* City Dots */}
              {cities.map((city) => (
                <g
                  key={city.id}
                  transform={`translate(${city.x}, ${city.y})`}
                  className={styles.cityGroup}
                  onMouseEnter={() => setHoveredCity(city)}
                  onMouseLeave={() => setHoveredCity(null)}
                  onClick={() => setActiveCity(activeCity?.id === city.id ? null : city)}
                  role="button"
                  aria-label={city.name}
                >
                  {/* Pulse ring for Bangalore */}
                  {city.id === "bangalore" && (
                    <>
                      <circle r="4" className={styles.pulseRing1} />
                      <circle r="3" className={styles.pulseRing2} />
                    </>
                  )}
                  {/* Dot */}
                  <circle
                    r={city.id === "bangalore" ? 2.2 : 1.5}
                    className={`${styles.cityDot} ${activeCity?.id === city.id ? styles.cityDotActive : ""} ${city.id === "bangalore" ? styles.hqDot : ""}`}
                  />
                </g>
              ))}
            </svg>

            {/* Map Overlay Legend */}
            <div className={styles.mapLegend}>
              <div className={styles.legendItem}>
                <div className={styles.legendDotHq} />
                <span>Headquarters</span>
              </div>
              <div className={styles.legendItem}>
                <div className={styles.legendDot} />
                <span>Distribution Point</span>
              </div>
            </div>
          </div>

          {/* City List Panel */}
          <div className={styles.cityPanel}>
            <div className={styles.panelHeader}>
              <Package size={16} className={styles.panelIcon} />
              <span className={styles.panelTitle}>Active Distribution Points</span>
            </div>

            <div className={styles.cityList}>
              {cities.map((city) => (
                <button
                  key={city.id}
                  className={`${styles.cityItem} ${displayCity?.id === city.id ? styles.cityItemActive : ""} ${city.id === "bangalore" ? styles.cityItemHq : ""}`}
                  onMouseEnter={() => setHoveredCity(city)}
                  onMouseLeave={() => setHoveredCity(null)}
                  onClick={() => setActiveCity(activeCity?.id === city.id ? null : city)}
                  id={`city-btn-${city.id}`}
                >
                  <MapPin size={14} className={styles.cityPin} />
                  <div className={styles.cityInfo}>
                    <span className={styles.cityName}>{city.name}</span>
                    <span className={styles.cityState}>{city.state}</span>
                  </div>
                  {city.id === "bangalore" && (
                    <span className="badge badge-gold" style={{ fontSize: "0.6rem" }}>HQ</span>
                  )}
                </button>
              ))}
            </div>

            {/* City Detail Card */}
            {displayCity && (
              <div className={styles.cityDetail}>
                <div className={styles.detailHeader}>
                  <MapPin size={14} />
                  <span>{displayCity.name}, {displayCity.state}</span>
                </div>
                <p className={styles.detailCategory}>{displayCity.category}</p>
                <div className={styles.detailProducts}>
                  <span className={styles.detailProdLabel}>Products Supplied:</span>
                  <span className={styles.detailProdValue}>{displayCity.products}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

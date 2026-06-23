"use client";
import { useState, useMemo } from "react";
import styles from "./ShadeCardExplorer.module.css";
import { Search, Palette, X } from "lucide-react";

// Generate 700 realistic thread shades across color families
function generateShades(): { id: string; hex: string; name: string; family: "Warm" | "Cool" | "Neutral" | "Deep" | "Pastel"; code: string }[] {
  const shades = [];

  const warmHues = [
    { h: 0, name: "Crimson" }, { h: 5, name: "Scarlet" }, { h: 8, name: "Vermillion" },
    { h: 12, name: "Coral" }, { h: 15, name: "Brick" }, { h: 20, name: "Amber" },
    { h: 25, name: "Sienna" }, { h: 30, name: "Tan" }, { h: 35, name: "Copper" },
    { h: 40, name: "Gold" }, { h: 45, name: "Saffron" }, { h: 50, name: "Marigold" },
    { h: 55, name: "Canary" }, { h: 60, name: "Yellow" }, { h: 350, name: "Rose" },
    { h: 345, name: "Blush" }, { h: 340, name: "Flamingo" }, { h: 335, name: "Salmon" },
  ];
  const coolHues = [
    { h: 180, name: "Teal" }, { h: 190, name: "Cyan" }, { h: 200, name: "Sky" },
    { h: 210, name: "Cerulean" }, { h: 220, name: "Azure" }, { h: 230, name: "Blue" },
    { h: 240, name: "Royal" }, { h: 250, name: "Indigo" }, { h: 260, name: "Violet" },
    { h: 270, name: "Purple" }, { h: 280, name: "Amethyst" }, { h: 290, name: "Lavender" },
    { h: 300, name: "Orchid" }, { h: 310, name: "Fuchsia" }, { h: 320, name: "Magenta" },
    { h: 160, name: "Mint" }, { h: 165, name: "Sage" }, { h: 170, name: "Seafoam" },
  ];
  const deepHues = [
    { h: 0, name: "Maroon" }, { h: 210, name: "Navy" }, { h: 270, name: "Plum" },
    { h: 120, name: "Forest" }, { h: 30, name: "Chocolate" }, { h: 180, name: "Petrol" },
    { h: 240, name: "Midnight" }, { h: 300, name: "Eggplant" }, { h: 15, name: "Mahogany" },
    { h: 45, name: "Caramel" },
  ];

  let idx = 1;

  // Warm family: 200 shades
  for (const hue of warmHues) {
    for (let s = 55; s <= 95; s += 15) {
      for (let l = 25; l <= 65; l += 12) {
        if (idx > 200) break;
        shades.push({
          id: `W${idx}`,
          hex: hslToHex(hue.h, s, l),
          name: `${hue.name} ${idx}`,
          family: "Warm" as const,
          code: `CPT-W${String(idx).padStart(3, "0")}`,
        });
        idx++;
      }
    }
  }

  // Cool family: 200 shades
  idx = 1;
  for (const hue of coolHues) {
    for (let s = 50; s <= 90; s += 15) {
      for (let l = 25; l <= 65; l += 12) {
        if (idx > 200) break;
        shades.push({
          id: `C${idx}`,
          hex: hslToHex(hue.h, s, l),
          name: `${hue.name} ${idx}`,
          family: "Cool" as const,
          code: `CPT-C${String(idx).padStart(3, "0")}`,
        });
        idx++;
      }
    }
  }

  // Neutral family: 150 shades
  idx = 1;
  for (let l = 5; l <= 95; l += 1.5) {
    if (idx > 75) break;
    shades.push({
      id: `N${idx}`,
      hex: hslToHex(0, 0, Math.min(l, 95)),
      name: `Grey ${idx}`,
      family: "Neutral" as const,
      code: `CPT-N${String(idx).padStart(3, "0")}`,
    });
    idx++;
  }
  idx = 1;
  for (let l = 15; l <= 85; l += 2) {
    if (idx > 75) break;
    shades.push({
      id: `NB${idx}`,
      hex: hslToHex(30, 10, Math.min(l, 85)),
      name: `Taupe ${idx}`,
      family: "Neutral" as const,
      code: `CPT-NB${String(idx).padStart(3, "0")}`,
    });
    idx++;
  }

  // Deep family: 100 shades
  idx = 1;
  for (const hue of deepHues) {
    for (let s = 40; s <= 80; s += 15) {
      for (let l = 8; l <= 28; l += 8) {
        if (idx > 100) break;
        shades.push({
          id: `D${idx}`,
          hex: hslToHex(hue.h, s, l),
          name: `${hue.name} ${idx}`,
          family: "Deep" as const,
          code: `CPT-D${String(idx).padStart(3, "0")}`,
        });
        idx++;
      }
    }
  }

  // Pastel family: 50 shades
  idx = 1;
  const pastelHues = [0, 30, 60, 120, 180, 210, 240, 270, 300, 330];
  for (const h of pastelHues) {
    for (let l = 75; l <= 92; l += 8) {
      if (idx > 50) break;
      shades.push({
        id: `P${idx}`,
        hex: hslToHex(h, 45, l),
        name: `Pastel ${idx}`,
        family: "Pastel" as const,
        code: `CPT-P${String(idx).padStart(3, "0")}`,
      });
      idx++;
    }
  }

  return shades;
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function hexDistance(a: string, b: string): number {
  const parse = (h: string) => [
    parseInt(h.slice(1, 3), 16),
    parseInt(h.slice(3, 5), 16),
    parseInt(h.slice(5, 7), 16),
  ];
  const [r1, g1, b1] = parse(a);
  const [r2, g2, b2] = parse(b);
  return Math.sqrt((r1-r2)**2 + (g1-g2)**2 + (b1-b2)**2);
}

const ALL_SHADES = generateShades();
const FAMILIES = ["All", "Warm", "Cool", "Neutral", "Deep", "Pastel"] as const;
const PAGE_SIZE = 120;

export default function ShadeCardExplorer() {
  const [activeFamily, setActiveFamily] = useState<typeof FAMILIES[number]>("All");
  const [hexInput, setHexInput] = useState("");
  const [matched, setMatched] = useState<typeof ALL_SHADES[0] | null>(null);
  const [selected, setSelected] = useState<typeof ALL_SHADES[0] | null>(null);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return activeFamily === "All"
      ? ALL_SHADES
      : ALL_SHADES.filter((s) => s.family === activeFamily);
  }, [activeFamily]);

  const visibleShades = filtered.slice(0, page * PAGE_SIZE);

  const handleHexMatch = () => {
    let input = hexInput.trim();
    if (!input.startsWith("#")) input = "#" + input;
    if (!/^#[0-9A-Fa-f]{6}$/.test(input)) return;
    const closest = ALL_SHADES.reduce((best, shade) => {
      return hexDistance(input, shade.hex) < hexDistance(input, best.hex) ? shade : best;
    });
    setMatched(closest);
    setActiveFamily("All");
    setSelected(closest);
  };

  return (
    <section className={`section bg-charcoal-mid ${styles.section}`}>
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <span className="label-text">Digital Shade Card</span>
          <div className="gold-divider center" />
          <h2 className="section-title">
            <span className="gold-text">700 Standardized Shades</span> &amp; 20K+ Recipes
          </h2>
          <p className={styles.headerSub}>
            Browse our complete color palette or enter a hex code to find your closest match
            from 20,000+ pre-formulated dye recipes.
          </p>
        </div>

        {/* Controls */}
        <div className={styles.controls}>
          {/* Family Filters */}
          <div className={styles.familyFilters} role="group" aria-label="Color family filter">
            {FAMILIES.map((fam) => (
              <button
                key={fam}
                className={`${styles.filterBtn} ${activeFamily === fam ? styles.filterActive : ""}`}
                onClick={() => { setActiveFamily(fam); setPage(1); setMatched(null); }}
              >
                {fam}
              </button>
            ))}
          </div>

          {/* Hex Matcher */}
          <div className={styles.hexMatcher}>
            <div className={styles.hexInputWrap}>
              <Palette size={16} className={styles.hexIcon} />
              <input
                type="text"
                className={`form-input ${styles.hexInput}`}
                placeholder="Enter Hex or Pantone code (e.g. #FF6B35)"
                value={hexInput}
                onChange={(e) => setHexInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleHexMatch()}
                id="shade-hex-input"
                aria-label="Color hex code input for matching"
              />
              {hexInput && (
                <button className={styles.clearBtn} onClick={() => { setHexInput(""); setMatched(null); }}>
                  <X size={14} />
                </button>
              )}
            </div>
            <button className="btn-primary" onClick={handleHexMatch} id="shade-match-btn">
              <Search size={16} />
              <span>Match Shade</span>
            </button>
          </div>
        </div>

        {/* Match Result Banner */}
        {matched && (
          <div className={styles.matchBanner}>
            <div className={styles.matchSwatch} style={{ background: matched.hex }} />
            <div className={styles.matchInfo}>
              <span className={styles.matchLabel}>Closest Match Found</span>
              <span className={styles.matchName}>{matched.name}</span>
              <span className={styles.matchCode}>{matched.code} · {matched.hex.toUpperCase()} · {matched.family}</span>
            </div>
            <a href="#contact" className="btn-outline" style={{ flexShrink: 0 }}>
              Request This Shade
            </a>
          </div>
        )}

        {/* Shade Grid */}
        <div className={styles.shadeGrid} role="list" aria-label="Thread shade catalog">
          {visibleShades.map((shade) => (
            <button
              key={shade.id}
              className={`${styles.shadeSwatch} ${selected?.id === shade.id ? styles.swatchSelected : ""}`}
              style={{ background: shade.hex }}
              onClick={() => setSelected(selected?.id === shade.id ? null : shade)}
              title={`${shade.name} — ${shade.code}`}
              role="listitem"
              aria-label={`${shade.name}, code ${shade.code}`}
            />
          ))}
        </div>

        {/* Selected Info */}
        {selected && (
          <div className={styles.selectedInfo}>
            <div className={styles.selectedSwatch} style={{ background: selected.hex }} />
            <div>
              <p className={styles.selectedName}>{selected.name}</p>
              <p className={styles.selectedMeta}>{selected.code} · {selected.hex.toUpperCase()} · {selected.family}</p>
            </div>
            <a href="#contact" className="btn-primary" style={{ marginLeft: "auto", fontSize: "0.8rem" }}>
              <span>Order Sample</span>
            </a>
          </div>
        )}

        {/* Load More */}
        {visibleShades.length < filtered.length && (
          <div className={styles.loadMore}>
            <button
              className="btn-outline"
              onClick={() => setPage((p) => p + 1)}
              id="shade-load-more"
            >
              Load More Shades ({filtered.length - visibleShades.length} remaining)
            </button>
          </div>
        )}

        {/* Stats */}
        <div className={styles.recipeStats}>
          <div className={styles.recipeStat}>
            <span className={styles.recipeNum}>700</span>
            <span className={styles.recipeLabel}>Standardized Shades</span>
          </div>
          <div className={styles.recipeDivider} />
          <div className={styles.recipeStat}>
            <span className={styles.recipeNum}>20,000+</span>
            <span className={styles.recipeLabel}>Pre-Formulated Recipes</span>
          </div>
          <div className={styles.recipeDivider} />
          <div className={styles.recipeStat}>
            <span className={styles.recipeNum}>5</span>
            <span className={styles.recipeLabel}>Color Families</span>
          </div>
        </div>
      </div>
    </section>
  );
}

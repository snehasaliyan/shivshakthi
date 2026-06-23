"use client";
import { useState } from "react";
import styles from "./QuoteForm.module.css";
import { Send, Package, FileText, CheckCircle2 } from "lucide-react";

const regions = [
  "Bangalore, Karnataka",
  "Rayadurga, Andhra Pradesh",
  "Bellary, Karnataka",
  "Vapi, Gujarat",
  "Mumbai, Maharashtra",
  "Hyderabad, Telangana",
  "Coimbatore, Tamil Nadu",
  "Kannur, Kerala",
  "Namakkal, Tamil Nadu",
  "Other Region",
];

const threadTypes = [
  "Core Spun Polyester",
  "Spun Polyester",
  "CF Poly (Continuous Filament)",
  "Recycled Material Thread",
  "Mixed / Multiple Types",
];

type ActionType = "quote" | "sample";

interface FormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  region: string;
  threadType: string;
  colorCode: string;
  message: string;
  action: ActionType;
}

const initialForm: FormData = {
  fullName: "",
  companyName: "",
  email: "",
  phone: "",
  region: "",
  threadType: "",
  colorCode: "",
  message: "",
  action: "quote",
};

export default function QuoteForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAction = (action: ActionType) => {
    setForm((prev) => ({ ...prev, action }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        console.error('Failed to submit form');
        alert('Failed to submit request. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className={`section bg-charcoal-mid ${styles.section}`}>
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <span className="label-text">B2B Procurement</span>
          <div className="gold-divider center" />
          <h2 className="section-title">
            <span className="gold-text">Sample Order</span> &amp; Quote Engine
          </h2>
          <p className={styles.headerSub}>
            Structured lead capture for procurement managers. Get bulk pricing or
            physical thread swatches delivered directly to your facility.
          </p>
        </div>

        <div className={styles.formGrid}>
          {/* Left — info */}
          <div className={styles.infoPanel}>
            <h3 className={styles.infoPanelTitle}>Why Partner With Us?</h3>
            <div className={styles.infoList}>
              {[
                { icon: "🏭", text: "35 Tons/Month production capacity" },
                { icon: "🎨", text: "700+ standardized shades ready to ship" },
                { icon: "🌿", text: "100% Azo-free, ISO 9002 certified" },
                { icon: "🚚", text: "Pan-India logistics network" },
                { icon: "🔬", text: "20,000+ pre-formulated dye recipes" },
                { icon: "⚡", text: "Fast turnaround on samples & quotes" },
              ].map((item) => (
                <div key={item.text} className={styles.infoItem}>
                  <span className={styles.infoEmoji}>{item.icon}</span>
                  <span className={styles.infoText}>{item.text}</span>
                </div>
              ))}
            </div>

            <div className={styles.contactCard}>
              <p className={styles.contactCardTitle}>Direct Enquiry</p>
              <a href="tel:+919880720646" className={styles.contactLink}>+91 98807 20646</a>
              <p className={styles.contactSub}>Mr. Chandrashekar T Anchan · Proprietor</p>
              <a href="mailto:dasshikthmar@gmail.com" className={styles.contactLink}>
                dasshikthmar@gmail.com
              </a>
            </div>
          </div>

          {/* Right — Form */}
          <div className={`glass-card ${styles.formCard}`}>
            {submitted ? (
              <div className="success-alert">
                <CheckCircle2 size={48} style={{ color: "#34D399", margin: "0 auto 1rem" }} />
                <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.4rem", marginBottom: "0.75rem", color: "#F5F0E8" }}>
                  Request Submitted Successfully
                </h3>
                <p style={{ color: "#A8A09A", marginBottom: "1.5rem", lineHeight: 1.6 }}>
                  Thank you, <strong style={{ color: "#F5F0E8" }}>{form.fullName}</strong>. Our team will contact
                  {form.action === "sample" ? " you to arrange sample swatch delivery" : " you with bulk pricing within 24 hours"}.
                </p>
                <button
                  className="btn-outline"
                  onClick={() => { setSubmitted(false); setForm(initialForm); }}
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form} id="b2b-quote-form">
                {/* Action Toggle */}
                <div className={styles.formSection}>
                  <p className="form-label">Request Type</p>
                  <div className="radio-group">
                    <label
                      className={`radio-card ${form.action === "quote" ? "selected" : ""}`}
                      id="action-quote-label"
                    >
                      <input
                        type="radio"
                        name="action"
                        value="quote"
                        checked={form.action === "quote"}
                        onChange={() => handleAction("quote")}
                        id="action-quote"
                      />
                      <div className="radio-dot" />
                      <div>
                        <FileText size={16} style={{ marginBottom: "0.25rem", opacity: 0.7 }} />
                        <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 600, fontSize: "0.88rem" }}>
                          Bulk Price Quote
                        </p>
                        <p style={{ fontSize: "0.72rem", opacity: 0.6 }}>Get wholesale pricing</p>
                      </div>
                    </label>
                    <label
                      className={`radio-card ${form.action === "sample" ? "selected" : ""}`}
                      id="action-sample-label"
                    >
                      <input
                        type="radio"
                        name="action"
                        value="sample"
                        checked={form.action === "sample"}
                        onChange={() => handleAction("sample")}
                        id="action-sample"
                      />
                      <div className="radio-dot" />
                      <div>
                        <Package size={16} style={{ marginBottom: "0.25rem", opacity: 0.7 }} />
                        <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 600, fontSize: "0.88rem" }}>
                          Sample Swatch
                        </p>
                        <p style={{ fontSize: "0.72rem", opacity: 0.6 }}>Physical thread delivery</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Personal Info */}
                <div className={`${styles.formRow} grid-2`}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="fullName">Full Name *</label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      className="form-input"
                      placeholder="Your full name"
                      required
                      value={form.fullName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="companyName">Company Name *</label>
                    <input
                      id="companyName"
                      name="companyName"
                      type="text"
                      className="form-input"
                      placeholder="Your company name"
                      required
                      value={form.companyName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className={`${styles.formRow} grid-2`}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Business Email *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="form-input"
                      placeholder="procurement@company.com"
                      required
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">Phone Number</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="form-input"
                      placeholder="+91 XXXXX XXXXX"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Thread Spec */}
                <div className={`${styles.formRow} grid-2`}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="region">Target Region *</label>
                    <select
                      id="region"
                      name="region"
                      className="form-select"
                      required
                      value={form.region}
                      onChange={handleChange}
                    >
                      <option value="" disabled>Select your region</option>
                      {regions.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="threadType">Thread Specification *</label>
                    <select
                      id="threadType"
                      name="threadType"
                      className="form-select"
                      required
                      value={form.threadType}
                      onChange={handleChange}
                    >
                      <option value="" disabled>Select thread type</option>
                      {threadTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="colorCode">Color Code Target</label>
                  <input
                    id="colorCode"
                    name="colorCode"
                    type="text"
                    className="form-input"
                    placeholder="e.g. CPT-W042, Pantone 185 C, or #FF0000"
                    value={form.colorCode}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="message">Additional Requirements</label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-textarea"
                    placeholder="Describe your quantity requirements, delivery timeline, or any custom specifications..."
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  className={`btn-primary ${styles.submitBtn}`}
                  disabled={loading}
                  id="form-submit-btn"
                >
                  {loading ? (
                    <span className={styles.loadingSpinner} />
                  ) : (
                    <Send size={16} />
                  )}
                  <span>
                    {loading
                      ? "Submitting..."
                      : form.action === "sample"
                      ? "Request Sample Swatch"
                      : "Submit Bulk Quote Request"}
                  </span>
                </button>

                <p className={styles.formDisclaimer}>
                  Your information is encrypted and will only be used to process your request.
                  We respond within 24 business hours.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

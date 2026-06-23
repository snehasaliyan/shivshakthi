"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#0F0F0F", color: "#F5F0E8" }}>
      <div style={{ backgroundColor: "rgba(26,26,26,0.8)", padding: "3rem 2.5rem", borderRadius: "12px", border: "1px solid rgba(212,175,55,0.2)", width: "100%", maxWidth: "420px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Image src="/logo.png" alt="Logo" width={64} height={64} style={{ borderRadius: "50%", marginBottom: "1rem" }} />
        <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.5rem", color: "#D4AF37", marginBottom: "0.5rem" }}>Admin Portal</h1>
        <p style={{ fontFamily: "Outfit, sans-serif", fontSize: "0.85rem", color: "#A8A09A", marginBottom: "2rem" }}>Shiva Shakthi Marketing</p>

        <form onSubmit={handleSubmit} style={{ width: "100%", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {error && (
            <div style={{ backgroundColor: "rgba(239, 68, 68, 0.1)", color: "#EF4444", padding: "0.75rem", borderRadius: "8px", fontSize: "0.85rem", textAlign: "center", border: "1px solid rgba(239, 68, 68, 0.3)" }}>
              {error}
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label htmlFor="email" style={{ fontSize: "0.85rem", color: "#A8A09A" }}>Email Address</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ backgroundColor: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.1)", padding: "0.75rem", borderRadius: "8px", color: "#F5F0E8", outline: "none" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label htmlFor="password" style={{ fontSize: "0.85rem", color: "#A8A09A" }}>Password</label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ backgroundColor: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.1)", padding: "0.75rem", borderRadius: "8px", color: "#F5F0E8", outline: "none" }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ marginTop: "1rem", backgroundColor: "#D4AF37", color: "#1A1A1A", border: "none", padding: "0.875rem", borderRadius: "8px", fontWeight: "bold", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, transition: "background 0.2s" }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

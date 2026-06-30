"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function MobileHeader() {
  const [open, setOpen] = useState(false);

  // Expose toggle to Sidebar via custom event
  useEffect(() => {
    const handler = (e: CustomEvent) => setOpen(e.detail);
    window.addEventListener("sidebar-toggle" as any, handler);
    return () => window.removeEventListener("sidebar-toggle" as any, handler);
  }, []);

  const toggle = () => {
    const next = !open;
    setOpen(next);
    window.dispatchEvent(new CustomEvent("sidebar-toggle", { detail: next }));
  };

  return (
    <header
      className="hide-desktop"
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        height: "var(--header-h)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 16px",
        background: "rgba(8,11,20,.9)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <span style={{ fontSize: "1.15rem", fontWeight: 800, letterSpacing: "-0.3px" }}>
        <span style={{ color: "var(--green)" }}>DAVI</span>
        <span style={{ color: "var(--blue)" }}>Data</span>
      </span>

      <button onClick={toggle} style={{
        background: "rgba(255,255,255,.06)", border: "1px solid var(--border)",
        borderRadius: "var(--radius-sm)", padding: "6px",
        color: "var(--text-2)", cursor: "pointer", display: "flex",
      }}>
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>
    </header>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ArrowLeftRight, TrendingUp, Settings, ChevronRight } from "lucide-react";

const nav = [
  { href: "/",             label: "Dashboard",     icon: LayoutDashboard, accent: "var(--green)" },
  { href: "/transactions", label: "Gelir / Gider", icon: ArrowLeftRight,  accent: "var(--blue)" },
  { href: "/investments",  label: "Yatırım",        icon: TrendingUp,      accent: "var(--purple)" },
  { href: "/settings",     label: "Ayarlar",        icon: Settings,        accent: "var(--text-2)" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = (e: CustomEvent) => setMobileOpen(e.detail);
    window.addEventListener("sidebar-toggle", handler as EventListener);
    return () => window.removeEventListener("sidebar-toggle", handler as EventListener);
  }, []);

  useEffect(() => {
    const id = setTimeout(() => setMobileOpen(false), 0);
    return () => clearTimeout(id);
  }, [pathname]);

  const close = () => {
    setMobileOpen(false);
    window.dispatchEvent(new CustomEvent("sidebar-toggle", { detail: false }));
  };

  return (
    <>
      {/* Mobile overlay */}
      <div className={`sidebar-overlay ${mobileOpen ? "open" : ""}`} onClick={close} />

      <style>{`
        .sidebar-aside {
          width: var(--sidebar-w);
          min-width: var(--sidebar-w);
          height: 100vh;
          position: sticky;
          top: 0;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          padding: 0 12px 20px;
          background: rgba(8,11,20,.97);
          border-right: 1px solid var(--border);
          backdrop-filter: blur(20px);
          z-index: 45;
          transition: transform .25s cubic-bezier(.4,0,.2,1);
        }
        @media (max-width: 768px) {
          .sidebar-aside {
            position: fixed;
            top: var(--header-h);
            height: calc(100vh - var(--header-h));
          }
          .sidebar-aside.closed { transform: translateX(-100%); }
          .sidebar-aside.open   { transform: translateX(0); }
        }
      `}</style>

      <aside className={`sidebar-aside ${mobileOpen ? "open" : "closed"}`}>
        {/* Logo — desktop only */}
        <div className="hide-mobile" style={{ padding: "28px 8px 24px", marginBottom: "4px" }}>
          <span style={{ fontSize: "1.3rem", fontWeight: 800, letterSpacing: "-0.4px" }}>
            <span style={{ color: "var(--green)" }}>DAVI</span>
            <span style={{ color: "var(--blue)" }}>Data</span>
          </span>
          <div style={{ fontSize: "11px", color: "var(--text-3)", marginTop: "2px", paddingLeft: "1px" }}>
            Kişisel Finans Takibi
          </div>
        </div>

        {/* Mobile top padding */}
        <div className="hide-desktop" style={{ height: "16px" }} />

        {/* Section label */}
        <div style={{
          fontSize: "10px", fontWeight: 600, color: "var(--text-3)",
          letterSpacing: "0.08em", padding: "0 8px 8px", textTransform: "uppercase",
        }}>
          Menü
        </div>

        {/* Nav */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {nav.map(({ href, label, icon: Icon, accent }) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href}>
                <div
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    gap: "10px", padding: "9px 10px", borderRadius: "var(--radius-sm)",
                    background: active ? "rgba(255,255,255,.07)" : "transparent",
                    color: active ? "var(--text-1)" : "var(--text-2)",
                    fontWeight: active ? 600 : 400, fontSize: "13.5px",
                    cursor: "pointer", transition: "all .15s", position: "relative", overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,.04)";
                      (e.currentTarget as HTMLDivElement).style.color = "var(--text-1)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLDivElement).style.background = "transparent";
                      (e.currentTarget as HTMLDivElement).style.color = "var(--text-2)";
                    }
                  }}
                >
                  {active && (
                    <span style={{
                      position: "absolute", left: 0, top: "20%", bottom: "20%",
                      width: "3px", borderRadius: "0 3px 3px 0", background: accent,
                    }} />
                  )}
                  <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <Icon size={16} style={{ color: active ? accent : "var(--text-3)", flexShrink: 0 }} />
                    {label}
                  </span>
                  {active && <ChevronRight size={13} style={{ color: "var(--text-3)" }} />}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div style={{ marginTop: "auto", padding: "12px 8px 0", borderTop: "1px solid var(--border)" }}>
          <div style={{ fontSize: "11px", color: "var(--text-3)" }}>v1.0 · LocalStorage</div>
        </div>
      </aside>
    </>
  );
}

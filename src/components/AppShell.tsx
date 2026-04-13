"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBrain, faComments, faChartLine, faUserCircle,
  faUsers, faCalendarCheck, faClipboardList,
  faRightFromBracket, faHouse,
} from "@fortawesome/free-solid-svg-icons";

type NavItem = { href: string; icon: any; label: string };

const patientNav: NavItem[] = [
  { href: "/dashboard", icon: faHouse, label: "Home" },
  { href: "/chat", icon: faComments, label: "Chat" },
  { href: "/insights", icon: faChartLine, label: "Insights" },
  { href: "/profile", icon: faUserCircle, label: "Profile" },
];

const therapistNav: NavItem[] = [
  { href: "/therapist", icon: faHouse, label: "Home" },
  { href: "/therapist/patients", icon: faUsers, label: "Patients" },
  { href: "/therapist/sessions", icon: faCalendarCheck, label: "Sessions" },
  { href: "/therapist/notes", icon: faClipboardList, label: "Notes" },
  { href: "/profile", icon: faUserCircle, label: "Profile" },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const role = (session?.user as any)?.role ?? "patient";
  const nav = role === "therapist" ? therapistNav : patientNav;
  const accentColor = role === "therapist" ? "#0284c7" : "#00d4aa";

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f1f5f9" }}>

      {/* SIDEBAR — desktop only */}
      <aside style={{
        width: 220, flexShrink: 0,
        background: "#050d1a",
        display: "flex", flexDirection: "column",
        padding: "1.5rem 0",
        position: "sticky", top: 0, height: "100vh",
      }} className="tb-sidebar">

        {/* Logo */}
        <div style={{ padding: "0 1.25rem 1.75rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none" }}>
            <div style={{
              width: 34, height: 34, borderRadius: 8,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 800, fontSize: "0.95rem", color: "#fff",
            }}><img src="/therabuddy.png" alt="Therabuddy" style={{ width: 34, height: 34, borderRadius: 8 }} /></div>
          </Link>
        </div>

        {/* Role badge */}
        <div style={{ padding: "1rem 1.25rem 0.5rem" }}>
          <span style={{
            fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase",
            letterSpacing: "0.08em", color: accentColor,
          }}>
            {role === "therapist" ? "Therapist Portal" : "Patient Portal"}
          </span>
        </div>

        {/* Nav links */}
        <nav style={{ flex: 1, padding: "0.5rem 0.75rem", display: "flex", flexDirection: "column", gap: "0.2rem" }}>
          {nav.map(({ href, icon, label }) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href} style={{
                display: "flex", alignItems: "center", gap: "0.75rem",
                padding: "0.65rem 0.75rem", borderRadius: 10,
                textDecoration: "none", fontSize: "0.875rem", fontWeight: 500,
                color: active ? "#fff" : "#64748b",
                background: active ? `rgba(${role === "therapist" ? "2,132,199" : "0,212,170"},0.15)` : "transparent",
                borderLeft: active ? `3px solid ${accentColor}` : "3px solid transparent",
                transition: "all 0.15s",
              }}>
                <FontAwesomeIcon icon={icon} style={{ fontSize: "0.9rem", color: active ? accentColor : "#475569", width: 16 }} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* User + logout */}
        <div style={{ padding: "1rem 1.25rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <div style={{
              width: 34, height: 34, borderRadius: "50%",
              background: `linear-gradient(135deg, #00d4aa, #0284c7)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 700, fontSize: "0.8rem", color: "#fff", flexShrink: 0,
            }}>
              {session?.user?.name?.[0]?.toUpperCase() ?? "U"}
            </div>
            <div style={{ overflow: "hidden" }}>
              <p style={{ color: "#e2e8f0", fontSize: "0.8rem", fontWeight: 600, margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {session?.user?.name ?? "User"}
              </p>
              <p style={{ color: "#475569", fontSize: "0.7rem", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {session?.user?.email}
              </p>
            </div>
          </div>
          <button onClick={() => signOut({ callbackUrl: "/login" })} style={{
            width: "100%", display: "flex", alignItems: "center", gap: "0.5rem",
            background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)",
            color: "#ef4444", padding: "0.5rem 0.75rem", borderRadius: 8,
            fontSize: "0.78rem", fontWeight: 600, cursor: "pointer",
          }}>
            <FontAwesomeIcon icon={faRightFromBracket} style={{ fontSize: "0.8rem" }} />
            Sign out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, minWidth: 0, paddingBottom: "5rem" }} className="tb-main">
        {children}
      </main>

      {/* BOTTOM NAV — mobile only */}
      <nav style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "#050d1a", borderTop: "1px solid rgba(255,255,255,0.08)",
        display: "flex", zIndex: 100, padding: "0.5rem 0",
      }} className="tb-bottomnav">
        {nav.map(({ href, icon, label }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} style={{
              flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem",
              textDecoration: "none", padding: "0.4rem 0",
              color: active ? accentColor : "#475569",
            }}>
              <FontAwesomeIcon icon={icon} style={{ fontSize: "1.1rem" }} />
              <span style={{ fontSize: "0.6rem", fontWeight: 600 }}>{label}</span>
            </Link>
          );
        })}
      </nav>

      <style>{`
        @media (min-width: 768px) {
          .tb-bottomnav { display: none !important; }
          .tb-main { padding-bottom: 0 !important; }
        }
        @media (max-width: 767px) {
          .tb-sidebar { display: none !important; }
        }
      `}</style>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import {
  faHouse, faComments as faCommentsSolid, faChartLine,
  faUserCircle, faUsers, faCalendarCheck,
  faClipboardList, faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { faComments, faCircleUser, faBell } from "@fortawesome/free-regular-svg-icons";

type NavItem = { href: string; icon: any; label: string };

const patientNav: NavItem[] = [
  { href: "/dashboard", icon: faHouse,         label: "Home"     },
  { href: "/chat",      icon: faComments,       label: "Chat"     },
  { href: "/insights",  icon: faChartLine,      label: "Insights" },
  { href: "/profile",   icon: faCircleUser,     label: "Profile"  },
];

const therapistNav: NavItem[] = [
  { href: "/therapist",          icon: faHouse,         label: "Home"     },
  { href: "/therapist/patients", icon: faUsers,         label: "Patients" },
  { href: "/therapist/sessions", icon: faCalendarCheck, label: "Sessions" },
  { href: "/therapist/notes",    icon: faClipboardList, label: "Notes"    },
  { href: "/profile",            icon: faCircleUser,    label: "Profile"  },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const role = (session?.user as any)?.role ?? "patient";
  const nav = role === "therapist" ? therapistNav : patientNav;

  useEffect(() => {
    if (session?.user) {
      // Check for theme in user data (via API for freshest state)
      fetch("/api/profile")
        .then(r => r.json())
        .then(data => {
          if (data?.darkMode) document.documentElement.setAttribute("data-theme", "dark");
          else document.documentElement.setAttribute("data-theme", "light");
        })
        .catch(() => {});
    }
  }, [session]);

  const initials = (session?.user?.name || "?")[0]?.toUpperCase();
  const avatarImage = session?.user?.image;

  return (
    <div className="tb-bg" style={{ display: "flex", minHeight: "100vh" }}>
      {/* Background Blobs */}
      <div className="tb-blob-container">
        <div className="tb-blob tb-blob-1"></div>
        <div className="tb-blob tb-blob-2"></div>
        <div className="tb-blob tb-blob-3"></div>
      </div>

      {/* ── SIDEBAR (desktop) ── */}
      <aside className="tb-sidebar" style={{
        width: 240, flexShrink: 0,
        background: "var(--glass-bg)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRight: "1px solid var(--glass-border)",
        display: "flex", flexDirection: "column",
        position: "sticky", top: 0, height: "100vh",
        zIndex: 10,
      }}>

        {/* Logo */}
        <div style={{ padding: "1.25rem 1rem", borderBottom: "1px solid var(--glass-border)" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
            <div style={{
              width: 50, height: 50, flexShrink: 0,
              borderRadius: 14, overflow: "hidden",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 12px rgba(139, 92, 246, 0.15)",
            }}>
              <Image
                src="/therabuddy.png"
                alt="Therabuddy Logo"
                width={50}
                height={50}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.1rem", color: "var(--text-primary)", fontWeight: 400, lineHeight: 1.2, margin: 0 }}>Therabuddy</p>
              <p style={{ fontSize: "0.62rem", color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.05em", margin: 0 }}>
                {role === "therapist" ? "THERAPIST PORTAL" : "PATIENT PORTAL"}
              </p>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "1.25rem 0.75rem", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
          {nav.map(({ href, icon, label }) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href} style={{
                display: "flex", alignItems: "center", gap: "0.75rem",
                padding: "0.7rem 0.9rem", borderRadius: "100px",
                textDecoration: "none", fontSize: "0.875rem",
                fontWeight: active ? 600 : 500,
                color: active ? "#fff" : "var(--text-secondary)",
                background: active ? "linear-gradient(135deg, #a78bfa, #818cf8)" : "transparent",
                boxShadow: active ? "0 4px 15px rgba(139, 92, 246, 0.2)" : "none",
                transition: "all 0.25s ease",
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%",
                  background: active ? "rgba(255, 255, 255, 0.2)" : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "background 0.25s",
                }}>
                  <FontAwesomeIcon icon={icon} style={{
                    fontSize: "0.85rem",
                    color: active ? "#fff" : "var(--text-muted)",
                  }} />
                </div>
                {label}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div style={{ padding: "1.25rem", borderTop: "1px solid var(--glass-border)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.85rem" }}>
            {avatarImage ? (
              <img src={avatarImage} alt="Avatar" style={{ 
                width: 38, height: 38, borderRadius: "50%", objectFit: "cover",
                boxShadow: "0 2px 8px rgba(139, 92, 246, 0.15)"
              }} />
            ) : (
              <div style={{
                width: 38, height: 38, borderRadius: "50%", flexShrink: 0,
                background: "linear-gradient(135deg, var(--violet-400), var(--violet-600))",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, fontSize: "0.85rem", color: "#fff",
                boxShadow: "0 2px 8px rgba(139, 92, 246, 0.2)"
              }}>
                {initials}
              </div>
            )}
            <div style={{ overflow: "hidden", flex: 1 }}>
              <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {session?.user?.name ?? "User"}
              </p>
              <p style={{ fontSize: "0.68rem", color: "var(--text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {session?.user?.email}
              </p>
            </div>
          </div>
          <button onClick={() => signOut({ callbackUrl: "/login" })} style={{
            width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
            background: "rgba(239, 68, 68, 0.05)", border: "1px solid rgba(239, 68, 68, 0.25)",
            color: "#f87171", padding: "0.6rem", borderRadius: "100px",
            fontSize: "0.775rem", fontWeight: 600, cursor: "pointer",
            fontFamily: "'Inter', sans-serif", transition: "all 0.2s ease",
          }}
          className="hover:bg-red-500/10 hover:border-red-500/40">
            <FontAwesomeIcon icon={faRightFromBracket} style={{ fontSize: "0.75rem" }} />
            Sign out
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main style={{ flex: 1, minWidth: 0, position: "relative", zIndex: 5 }} className="tb-main">
        {children}
      </main>

      {/* ── BOTTOM NAV (mobile) ── */}
      <nav className="tb-bottomnav" style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "var(--glass-bg)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderTop: "1px solid var(--glass-border)",
        display: "flex",
        zIndex: 100,
        paddingBottom: "env(safe-area-inset-bottom)",
        boxShadow: "0 -4px 20px rgba(139, 92, 246, 0.08)",
      }}>
        {nav.map(({ href, icon, label }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} style={{
              flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
              gap: "0.25rem", padding: "0.6rem 0.25rem 0.5rem",
              textDecoration: "none",
              color: active ? "var(--violet-600)" : "var(--text-muted)",
              position: "relative",
            }}>
              {active && (
                <div style={{
                  position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                  width: 24, height: 3, background: "linear-gradient(90deg, #a78bfa, #818cf8)", borderRadius: 100,
                }} />
              )}
              <div style={{
                width: 34, height: 34, borderRadius: "50%",
                background: active ? "var(--violet-100)" : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.2s ease",
              }}>
                <FontAwesomeIcon icon={icon} style={{ fontSize: "0.95rem" }} />
              </div>
              <span style={{ fontSize: "0.6rem", fontWeight: active ? 600 : 500 }}>{label}</span>
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
          .tb-main { padding-bottom: 6rem !important; }
        }
      `}</style>
    </div>
  );
}

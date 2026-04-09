"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrain, faComments, faChartLine, faUserCircle, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const links = [
  { href: "/dashboard", icon: faBrain, label: "Dashboard" },
  { href: "/chat", icon: faComments, label: "Chat" },
  { href: "/insights", icon: faChartLine, label: "Insights" },
  { href: "/profile", icon: faUserCircle, label: "Profile" },
];

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <nav style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 2rem", height: "64px",
      background: "#fff", borderBottom: "1px solid #e2e8f0",
      position: "sticky", top: 0, zIndex: 50,
    }}>
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none" }}>
        <div style={{
          width: 200, height: 48, borderRadius: 8,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 800, fontSize: "0.9rem", color: "#fff",
        }}><img src="/logo.png" alt="Therabuddy" width={200} height={48} /></div>
      </Link>

      {session && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          {links.map(({ href, icon, label }) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href} style={{
                display: "flex", alignItems: "center", gap: "0.4rem",
                padding: "0.5rem 0.9rem", borderRadius: 8,
                textDecoration: "none", fontSize: "0.875rem", fontWeight: 500,
                color: active ? "#00d4aa" : "#64748b",
                background: active ? "rgba(0,212,170,0.08)" : "transparent",
                transition: "all 0.15s",
              }}>
                <FontAwesomeIcon icon={icon} style={{ fontSize: "0.8rem" }} />
                <span className="nav-label">{label}</span>
              </Link>
            );
          })}
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {session ? (
          <>
            <div style={{
              width: 34, height: 34, borderRadius: "50%",
              background: "linear-gradient(135deg, #00d4aa, #0284c7)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 700, fontSize: "0.8rem", color: "#fff",
            }}>
              {session.user?.name?.[0]?.toUpperCase() ?? "U"}
            </div>
            <button onClick={() => signOut({ callbackUrl: "/login" })} style={{
              display: "flex", alignItems: "center", gap: "0.4rem",
              background: "none", border: "none", cursor: "pointer",
              color: "#ef4444", fontSize: "0.8rem", fontWeight: 500, padding: "0.4rem 0.75rem",
              borderRadius: 8, transition: "background 0.15s",
            }}>
              <FontAwesomeIcon icon={faRightFromBracket} />
              <span className="nav-label">Logout</span>
            </button>
          </>
        ) : (
          <>
            <Link href="/login" style={{ color: "#64748b", textDecoration: "none", fontSize: "0.875rem" }}>Login</Link>
            <Link href="/signup" style={{
              background: "#00d4aa", color: "#050d1a", padding: "0.5rem 1.25rem",
              borderRadius: 8, textDecoration: "none", fontSize: "0.875rem", fontWeight: 600,
            }}>Sign Up</Link>
          </>
        )}
      </div>

      <style>{`
        @media (max-width: 640px) { .nav-label { display: none; } }
      `}</style>
    </nav>
  );
}

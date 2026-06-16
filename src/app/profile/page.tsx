"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import AppShell from "@/components/AppShell";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faCheck, 
  faBrain, 
  faUser, 
  faEnvelope, 
  faCamera, 
  faShieldHalved,
  faCircleCheck,
  faGlobe,
  faTriangleExclamation
} from "@fortawesome/free-solid-svg-icons";
import { 
  faCircleUser, 
  faBell, 
  faMoon, 
  faTrashCan,
  faImage,
  faFileLines
} from "@fortawesome/free-regular-svg-icons";

type Profile = {
  id: string;
  name: string | null;
  email: string;
  image?: string | null;
  createdAt: string;
};

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [settings, setSettings] = useState({
    dailyAffirmations: true,
    darkMode: false,
    publicProfile: false,
    dailyReminders: true,
    crisisAlerts: true
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/profile")
      .then(r => r.json())
      .then(data => {
        if (data && !data.error) {
          setProfile(data);
          setName(data.name ?? "");
          setImage(data.image ?? "");
          setSettings({
            dailyAffirmations: data.dailyAffirmations ?? true,
            darkMode: data.darkMode ?? false,
            publicProfile: data.publicProfile ?? false,
            dailyReminders: data.dailyReminders ?? true,
            crisisAlerts: data.crisisAlerts ?? true
          });
          if (data.darkMode) document.documentElement.setAttribute("data-theme", "dark");
        }
      })
      .catch(() => {});
  }, []);

  const handleToggle = async (key: keyof typeof settings) => {
    const newVal = !settings[key];
    setSettings(prev => ({ ...prev, [key]: newVal }));

    if (key === "darkMode") {
      document.documentElement.setAttribute("data-theme", newVal ? "dark" : "light");
    }

    await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [key]: newVal }),
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true); 
    setError("");
    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, image }),
    });
    if (res.ok) { 
      setSaved(true); 
      // Update session to reflect changes immediately in AppShell
      await update({ name, image });
      setTimeout(() => setSaved(false), 2000); 
    }
    else setError("Failed to save changes.");
    setSaving(false);
  };

  const joinDate = profile?.createdAt
    ? new Date(profile.createdAt).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })
    : null;

  const initials = (name || session?.user?.name || "?")[0]?.toUpperCase();
  const displayImage = image || session?.user?.image;

  return (
    <AppShell>
      <div className="tb-container">
        
        {/* Header Section */}
        <div style={{ marginBottom: "2.5rem" }}>
          <h1 style={{ 
            fontFamily: "'DM Serif Display', serif", 
            fontSize: "2.2rem", 
            fontWeight: 400, 
            color: "var(--text-primary)", 
            marginBottom: "0.5rem" 
          }}>
            Account Settings
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            Personalize your experience and manage your account details.
          </p>
        </div>

        <div className="tb-grid tb-grid-2" style={{ gap: "2rem" }}>
          
          {/* Left Column: Personal Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            
            {/* Profile Card */}
            <div className="tb-card" style={{ 
              display: "flex", 
              flexDirection: "column", 
              alignItems: "center", 
              textAlign: "center",
              padding: "2.5rem 2rem",
              background: "linear-gradient(to bottom, var(--warm-50), #fff)",
              position: "relative",
              overflow: "hidden"
            }}>
              {/* Decorative background element */}
              <div style={{ 
                position: "absolute", top: -50, right: -50, width: 150, height: 150, 
                borderRadius: "50%", background: "var(--sage-50)", zIndex: 0 
              }} />
              
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ position: "relative", marginBottom: "1.5rem" }}>
                  {displayImage ? (
                    <img src={displayImage} alt="Avatar" style={{ 
                      width: 100, height: 100, borderRadius: "50%", 
                      objectFit: "cover", border: "4px solid #fff",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
                    }} />
                  ) : (
                    <div style={{
                      width: 100, height: 100, borderRadius: "50%",
                      background: "linear-gradient(135deg, var(--sage-300), var(--sage-500))",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 700, fontSize: "2.5rem", color: "#fff",
                      border: "4px solid #fff", boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
                    }}>{initials}</div>
                  )}
                  <div style={{ 
                    position: "absolute", bottom: 0, right: 0, 
                    width: 32, height: 32, borderRadius: "50%", 
                    background: "var(--sage-500)", color: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    border: "2px solid #fff", boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                  }}>
                    <FontAwesomeIcon icon={faCamera} style={{ fontSize: "0.8rem" }} />
                  </div>
                </div>
                
                <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)", margin: "0 0 0.25rem" }}>
                  {profile?.name || session?.user?.name || "User"}
                </h2>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                  {profile?.email || session?.user?.email}
                </p>
                {joinDate && (
                  <div style={{ 
                    display: "inline-flex", alignItems: "center", gap: "0.4rem",
                    padding: "0.3rem 0.75rem", borderRadius: "100px",
                    background: "var(--sage-50)", color: "var(--sage-600)",
                    fontSize: "0.75rem", fontWeight: 600
                  }}>
                    <FontAwesomeIcon icon={faBrain} style={{ fontSize: "0.7rem" }} />
                    Member since {joinDate}
                  </div>
                )}
              </div>
            </div>

            {/* Edit Details Card */}
            <div className="tb-card">
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                <FontAwesomeIcon icon={faCircleUser} style={{ color: "var(--sage-500)", fontSize: "1.1rem" }} />
                <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>Edit Details</h3>
              </div>
              
              <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div>
                  <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.5rem" }}>
                    <FontAwesomeIcon icon={faUser} style={{ fontSize: "0.75rem" }} /> Full Name
                  </label>
                  <input
                    type="text" value={name} onChange={e => setName(e.target.value)}
                    placeholder="Your name" className="tb-input"
                  />
                </div>
                
                <div>
                  <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.5rem" }}>
                    <FontAwesomeIcon icon={faImage} style={{ fontSize: "0.75rem" }} /> Profile Picture URL
                  </label>
                  <input
                    type="text" value={image} onChange={e => setImage(e.target.value)}
                    placeholder="https://example.com/avatar.jpg" className="tb-input"
                  />
                  <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "0.4rem" }}>
                    Leave empty to use your default Google account picture.
                  </p>
                </div>

                <div>
                  <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.5rem" }}>
                    <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: "0.75rem" }} /> Email Address
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="email"
                      value={profile?.email || session?.user?.email || ""}
                      disabled
                      style={{ 
                        width: "100%", padding: "0.75rem 1rem", borderRadius: 12, 
                        border: "1.5px solid var(--sage-100)", background: "var(--sage-50)", 
                        fontSize: "0.9rem", color: "var(--text-muted)", cursor: "not-allowed",
                        paddingRight: "2.5rem"
                      }}
                    />
                    <FontAwesomeIcon icon={faShieldHalved} style={{ 
                      position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)",
                      color: "var(--sage-300)", fontSize: "0.85rem"
                    }} />
                  </div>
                </div>

                {error && (
                  <div style={{ 
                    display: "flex", alignItems: "center", gap: "0.5rem", 
                    padding: "0.75rem", borderRadius: 10, background: "var(--high-bg)", color: "var(--high-color)",
                    fontSize: "0.85rem"
                  }}>
                    <FontAwesomeIcon icon={faTriangleExclamation} /> {error}
                  </div>
                )}
                
                <button type="submit" disabled={saving} className="tb-btn" style={{ padding: "0.8rem 1.5rem", justifyContent: "center" }}>
                  {saving ? "Saving Changes..." : (
                    <>
                      <FontAwesomeIcon icon={saved ? faCircleCheck : faCheck} />
                      {saved ? "Saved!" : "Update Profile"}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Preferences & Security */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            
            {/* Preferences */}
            <div className="tb-card">
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                <FontAwesomeIcon icon={faBell} style={{ color: "var(--sage-500)", fontSize: "1.1rem" }} />
                <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>Preferences</h3>
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {[
                  { id: "dailyReminders",    label: "Daily Reminders",    desc: "Log your mood each day", icon: faBell },
                  { id: "crisisAlerts",      label: "Crisis Alerts",      desc: "Help resources on high-risk signals", icon: faShieldHalved },
                  { id: "dailyAffirmations", label: "Daily Affirmations", desc: "Encouragement every morning", icon: faBrain },
                  { id: "darkMode",          label: "Dark Mode",          desc: "Toggle dark theme interface", icon: faMoon },
                  { id: "publicProfile",     label: "Public Profile",     desc: "Allow others to see your stats", icon: faGlobe },
                ].map((pref) => (
                  <div key={pref.label} style={{ 
                    display: "flex", alignItems: "center", justifyContent: "space-between", 
                    padding: "1rem", borderRadius: 12, border: "1px solid var(--sage-50)",
                    background: "transparent", transition: "all 0.2s"
                  }} className="pref-item">
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <div style={{ 
                        width: 40, height: 40, borderRadius: 10, background: "var(--warm-100)",
                        display: "flex", alignItems: "center", justifyContent: "center", color: "var(--sage-500)"
                      }}>
                        <FontAwesomeIcon icon={pref.icon} />
                      </div>
                      <div>
                        <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>{pref.label}</p>
                        <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: "0.1rem 0 0" }}>{pref.desc}</p>
                      </div>
                    </div>
                    <label className="tb-switch">
                      <input 
                        type="checkbox" 
                        checked={settings[pref.id as keyof typeof settings]} 
                        onChange={() => handleToggle(pref.id as keyof typeof settings)}
                      />
                      <span className="tb-slider"></span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Account Actions */}
            <div className="tb-card" style={{ background: "var(--high-bg)", borderColor: "transparent" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                <FontAwesomeIcon icon={faTriangleExclamation} style={{ color: "var(--high-color)", fontSize: "1.1rem" }} />
                <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--high-color)", margin: 0 }}>Danger Zone</h3>
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ 
                  display: "flex", alignItems: "center", gap: "1rem", padding: "1rem", 
                  borderRadius: 12, background: "rgba(255,255,255,0.5)", border: "1px dashed #ef9a9a" 
                }}>
                   <div style={{ 
                    width: 40, height: 40, borderRadius: 10, background: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center", color: "var(--high-color)"
                  }}>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--high-color)", margin: 0 }}>Delete Account</p>
                    <p style={{ fontSize: "0.75rem", color: "#b71c1c", margin: "0.1rem 0 0" }}>Once deleted, data cannot be recovered.</p>
                  </div>
                  <button style={{ 
                    padding: "0.5rem 1rem", borderRadius: 8, background: "var(--high-color)", 
                    color: "#fff", border: "none", fontSize: "0.75rem", fontWeight: 600, cursor: "pointer" 
                  }}>
                    Delete
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        <style>{`
          .tb-switch {
            position: relative;
            display: inline-block;
            width: 44px;
            height: 24px;
          }
          .tb-switch input { opacity: 0; width: 0; height: 0; }
          .tb-slider {
            position: absolute;
            cursor: pointer;
            top: 0; left: 0; right: 0; bottom: 0;
            background-color: var(--sage-200);
            transition: .3s;
            border-radius: 34px;
          }
          .tb-slider:before {
            position: absolute;
            content: "";
            height: 18px;
            width: 18px;
            left: 3px;
            bottom: 3px;
            background-color: white;
            transition: .3s;
            border-radius: 50%;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          input:checked + .tb-slider { background-color: var(--sage-500); }
          input:checked + .tb-slider:before { transform: translateX(20px); }
          
          .pref-item:hover {
            background: var(--warm-50) !important;
            border-color: var(--sage-100) !important;
            transform: translateX(4px);
          }
        `}</style>
      </div>
    </AppShell>
  );
}

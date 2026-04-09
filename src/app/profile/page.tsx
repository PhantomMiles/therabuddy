"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Image from "next/image";

type Profile = {
  id: string;
  name: string;
  email: string;
  image?: string;
  createdAt: string;
};

export default function ProfilePage() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/profile")
      .then((r) => r.json())
      .then((data) => {
        setProfile(data);
        setName(data.name || "");
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } else {
      setError("Failed to save. Please try again.");
    }
    setSaving(false);
  };

  const joinDate = profile?.createdAt
    ? new Date(profile.createdAt).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })
    : "—";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <Navbar />
      <div className="max-w-xl mx-auto p-6 md:p-10 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Profile & Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your account information.</p>
        </div>

        {/* Avatar + Info */}
        <div className="medical-card flex items-center gap-5">
          {profile?.image ? (
            <Image
              src={profile.image}
              alt="Avatar"
              width={64}
              height={64}
              className="rounded-full"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600">
              {name?.[0]?.toUpperCase() || "?"}
            </div>
          )}
          <div>
            <p className="font-semibold text-lg">{profile?.name || "—"}</p>
            <p className="text-sm text-gray-500">{profile?.email}</p>
            <p className="text-xs text-gray-400 mt-1">Member since {joinDate}</p>
          </div>
        </div>

        {/* Edit Name */}
        <div className="medical-card space-y-4">
          <h2 className="font-semibold">Edit Profile</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="text-sm font-medium block mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Email</label>
              <input
                type="email"
                value={profile?.email || ""}
                disabled
                className="w-full border rounded-lg p-3 text-sm bg-gray-50 dark:bg-neutral-900 text-gray-400 cursor-not-allowed"
              />
              <p className="text-xs text-gray-400 mt-1">Email cannot be changed.</p>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}
            {saved && <p className="text-sm text-green-600">✓ Saved successfully!</p>}

            <button
              type="submit"
              disabled={saving}
              className="primary-btn disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>

        {/* App Preferences (static for now) */}
        <div className="medical-card space-y-4">
          <h2 className="font-semibold">Preferences</h2>
          <div className="flex items-center justify-between text-sm">
            <div>
              <p className="font-medium">Daily Check-in Reminder</p>
              <p className="text-gray-400 text-xs">Get reminded to log your mood each day</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-10 h-5 bg-gray-300 peer-checked:bg-blue-500 rounded-full transition peer-focus:ring-2 peer-focus:ring-blue-300 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:w-4 after:h-4 after:transition peer-checked:after:translate-x-5" />
            </label>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div>
              <p className="font-medium">Crisis Alerts</p>
              <p className="text-gray-400 text-xs">Show urgent help resources on high-risk signals</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-10 h-5 bg-gray-300 peer-checked:bg-blue-500 rounded-full transition peer-focus:ring-2 peer-focus:ring-blue-300 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:w-4 after:h-4 after:transition peer-checked:after:translate-x-5" />
            </label>
          </div>
        </div>

        {/* Sign Out / Danger */}
        <div className="medical-card space-y-3 border border-red-100">
          <h2 className="font-semibold text-red-600">Account Actions</h2>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full border border-red-300 text-red-600 rounded-lg py-2.5 text-sm font-medium hover:bg-red-50 transition"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

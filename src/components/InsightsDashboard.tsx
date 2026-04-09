"use client";

import { useEffect, useState } from "react";

type MoodLog = { mood: string; createdAt: string };
type DiagnosticLog = { risk: string; recommendation: string; flags: string[]; createdAt: string };

const moodEmoji: Record<string, string> = {
  happy: "😊", neutral: "😐", sad: "😢", angry: "😠", tired: "😴",
};

const riskColors: Record<string, string> = {
  low: "bg-green-100 text-green-700 border-green-300",
  moderate: "bg-yellow-100 text-yellow-700 border-yellow-300",
  high: "bg-red-100 text-red-700 border-red-300",
};

const moodScore: Record<string, number> = {
  happy: 5, neutral: 3, tired: 2, sad: 1, angry: 1,
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export default function InsightsDashboard() {
  const [moodLogs, setMoodLogs] = useState<MoodLog[]>([]);
  const [diagnosticLogs, setDiagnosticLogs] = useState<DiagnosticLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/insights")
      .then((r) => r.json())
      .then((data) => {
        setMoodLogs(data.moodLogs || []);
        setDiagnosticLogs(data.diagnosticLogs || []);
        setLoading(false);
      });
  }, []);

  // Mood frequency count
  const moodCounts = moodLogs.reduce<Record<string, number>>((acc, log) => {
    acc[log.mood] = (acc[log.mood] || 0) + 1;
    return acc;
  }, {});

  // Average mood score
  const avgScore = moodLogs.length
    ? (moodLogs.reduce((s, l) => s + (moodScore[l.mood] ?? 3), 0) / moodLogs.length).toFixed(1)
    : null;

  // Risk distribution
  const riskCounts = diagnosticLogs.reduce<Record<string, number>>((acc, log) => {
    acc[log.risk] = (acc[log.risk] || 0) + 1;
    return acc;
  }, {});

  const latestDiag = diagnosticLogs[0];

  if (loading) {
    return (
      <div className="medical-card animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
        <div className="h-20 bg-gray-100 rounded" />
      </div>
    );
  }

  if (!moodLogs.length && !diagnosticLogs.length) {
    return (
      <div className="medical-card text-center py-10 text-gray-400">
        <p className="text-3xl mb-3">📊</p>
        <p className="font-medium">No data yet</p>
        <p className="text-sm mt-1">Log your mood and complete a check-in to see insights here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="medical-card text-center">
          <p className="text-3xl font-bold text-blue-600">{moodLogs.length}</p>
          <p className="text-xs text-gray-500 mt-1">Mood Logs</p>
        </div>
        <div className="medical-card text-center">
          <p className="text-3xl font-bold text-purple-600">{avgScore ?? "—"}</p>
          <p className="text-xs text-gray-500 mt-1">Avg Mood Score</p>
        </div>
        <div className="medical-card text-center">
          <p className="text-3xl font-bold text-teal-600">{diagnosticLogs.length}</p>
          <p className="text-xs text-gray-500 mt-1">Check-ins Done</p>
        </div>
        <div className="medical-card text-center">
          {latestDiag ? (
            <>
              <p className={`text-sm font-bold uppercase px-2 py-1 rounded-full inline-block border ${riskColors[latestDiag.risk]}`}>
                {latestDiag.risk}
              </p>
              <p className="text-xs text-gray-500 mt-1">Latest Risk</p>
            </>
          ) : (
            <p className="text-xs text-gray-400 pt-3">No check-ins yet</p>
          )}
        </div>
      </div>

      {/* Mood Frequency */}
      {moodLogs.length > 0 && (
        <div className="medical-card">
          <h3 className="font-semibold mb-4">Mood Frequency (last 30 logs)</h3>
          <div className="space-y-3">
            {Object.entries(moodCounts).sort((a, b) => b[1] - a[1]).map(([mood, count]) => (
              <div key={mood} className="flex items-center gap-3">
                <span className="text-xl w-8">{moodEmoji[mood]}</span>
                <span className="capitalize text-sm w-16">{mood}</span>
                <div className="flex-1 bg-gray-100 dark:bg-neutral-800 rounded-full h-3">
                  <div
                    className="bg-blue-500 h-3 rounded-full transition-all"
                    style={{ width: `${(count / moodLogs.length) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-gray-500 w-8 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Risk History */}
      {diagnosticLogs.length > 0 && (
        <div className="medical-card">
          <h3 className="font-semibold mb-4">Check-in History</h3>
          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {diagnosticLogs.map((log, i) => (
              <div key={i} className={`border rounded-xl p-3 ${riskColors[log.risk]}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold uppercase">{log.risk} risk</span>
                  <span className="text-xs opacity-60">{formatDate(log.createdAt)}</span>
                </div>
                <p className="text-xs">{log.recommendation}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Risk Distribution */}
      {diagnosticLogs.length > 1 && (
        <div className="medical-card">
          <h3 className="font-semibold mb-4">Risk Distribution</h3>
          <div className="flex gap-4">
            {["low", "moderate", "high"].map((level) => (
              <div key={level} className="flex-1 text-center">
                <div className={`rounded-xl py-4 border ${riskColors[level]}`}>
                  <p className="text-2xl font-bold">{riskCounts[level] || 0}</p>
                  <p className="text-xs capitalize mt-1">{level}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

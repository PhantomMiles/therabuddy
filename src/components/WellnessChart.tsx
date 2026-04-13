"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

export default function WellnessChart({ logs }: { logs: any[] }) {
  const data = logs.map(log => ({
    date: format(new Date(log.createdAt), 'MMM d'),
    score: log.risk === 'low' ? 1 : log.risk === 'moderate' ? 2 : 3,
  }));

  return (
    <div style={{ width: '100%', height: 300, background: '#fff', borderRadius: 12, padding: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="date" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} ticks={[1, 2, 3]} />
          <Tooltip
            contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            labelStyle={{ fontWeight: 600, color: '#0f172a' }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#00d4aa"
            strokeWidth={3}
            dot={{ r: 4, fill: '#00d4aa' }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
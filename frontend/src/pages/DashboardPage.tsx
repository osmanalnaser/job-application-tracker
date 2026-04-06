import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import axiosInstance from "../api/axiosInstance";
import type { DashboardData } from "../types";

const STATUS_COLORS: Record<string, string> = {
  APPLIED: "#3b82f6",
  INTERVIEW: "#f59e0b",
  OFFER: "#10b981",
  REJECTED: "#ef4444",
};

function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await axiosInstance.get("/api/dashboard");
        setDashboardData(response.data);
      } catch (error) {
        console.error("ERROR FETCHING DASHBOARD:", error);
      }
    };

    fetchDashboard();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!dashboardData) return <div>Loading...</div>;

  const { stats, recentApplications, upcomingReminders } = dashboardData;

  const pieData = [
    { name: "Applied", value: Number(stats.applied), status: "APPLIED" },
    { name: "Interview", value: Number(stats.interview), status: "INTERVIEW" },
    { name: "Offer", value: Number(stats.offer), status: "OFFER" },
    { name: "Rejected", value: Number(stats.rejected), status: "REJECTED" },
  ].filter((d) => d.value > 0);

  const barData = [
    { name: "Applied", count: Number(stats.applied) },
    { name: "Interview", count: Number(stats.interview) },
    { name: "Offer", count: Number(stats.offer) },
    { name: "Rejected", count: Number(stats.rejected) },
  ];

  return (
    <div style={{ padding: "24px", fontFamily: "sans-serif" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h1 style={{ margin: 0 }}>Dashboard</h1>
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={() => navigate("/applications")}>Applications</button>
          <button onClick={() => navigate("/kanban")}>Kanban Board</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "32px", flexWrap: "wrap" }}>
        {[
          { label: "Total", value: stats.total, color: "#6366f1" },
          { label: "Applied", value: stats.applied, color: "#3b82f6" },
          { label: "Interview", value: stats.interview, color: "#f59e0b" },
          { label: "Offer", value: stats.offer, color: "#10b981" },
          { label: "Rejected", value: stats.rejected, color: "#ef4444" },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              background: "white",
              border: `2px solid ${stat.color}`,
              borderRadius: "8px",
              padding: "16px 24px",
              minWidth: "120px",
              textAlign: "center",
              boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
            }}
          >
            <div style={{ fontSize: "28px", fontWeight: "bold", color: stat.color }}>
              {stat.value}
            </div>
            <div style={{ color: "#555", marginTop: "4px" }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div style={{ display: "flex", gap: "32px", flexWrap: "wrap", marginBottom: "32px" }}>

        {/* Pie Chart */}
        <div style={{ background: "white", borderRadius: "8px", padding: "16px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
          <h3 style={{ marginTop: 0 }}>Status Distribution</h3>
          {pieData.length === 0 ? (
            <p style={{ color: "#888" }}>No data yet</p>
          ) : (
            <PieChart width={280} height={250}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={90}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${percent !== undefined ? (percent * 100).toFixed(0) : 0}%`
                }
              >
                {pieData.map((entry) => (
                  <Cell
                    key={entry.status}
                    fill={STATUS_COLORS[entry.status]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          )}
        </div>

        {/* Bar Chart */}
        <div style={{ background: "white", borderRadius: "8px", padding: "16px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)", flex: 1, minWidth: "300px" }}>
          <h3 style={{ marginTop: 0 }}>Applications by Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" name="Applications">
                {barData.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={STATUS_COLORS[entry.name.toUpperCase()]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Recent Applications */}
      <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: "300px", background: "white", borderRadius: "8px", padding: "16px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
          <h3 style={{ marginTop: 0 }}>Recent Applications</h3>
          {recentApplications.length === 0 ? (
            <p style={{ color: "#888" }}>No applications yet.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #eee" }}>
                  <th style={{ textAlign: "left", padding: "8px 0", color: "#555" }}>Company</th>
                  <th style={{ textAlign: "left", padding: "8px 0", color: "#555" }}>Position</th>
                  <th style={{ textAlign: "left", padding: "8px 0", color: "#555" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentApplications.map((app) => (
                  <tr key={app.id} style={{ borderBottom: "1px solid #f4f4f4" }}>
                    <td style={{ padding: "8px 0" }}>{app.company}</td>
                    <td style={{ padding: "8px 0" }}>{app.position}</td>
                    <td style={{ padding: "8px 0" }}>
                      <span style={{
                        background: STATUS_COLORS[app.status],
                        color: "white",
                        borderRadius: "4px",
                        padding: "2px 8px",
                        fontSize: "12px",
                      }}>
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Upcoming Reminders */}
        <div style={{ flex: 1, minWidth: "300px", background: "white", borderRadius: "8px", padding: "16px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
          <h3 style={{ marginTop: 0 }}>Upcoming Reminders</h3>
          {upcomingReminders.length === 0 ? (
            <p style={{ color: "#888" }}>No upcoming reminders.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {upcomingReminders.map((app) => (
                <li key={app.id} style={{ padding: "8px 0", borderBottom: "1px solid #f4f4f4" }}>
                  <strong>{app.company}</strong> — {app.position}
                  <br />
                  <span style={{ fontSize: "12px", color: "#888" }}>
                    {app.reminderDate}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

    </div>
  );
}

export default DashboardPage;
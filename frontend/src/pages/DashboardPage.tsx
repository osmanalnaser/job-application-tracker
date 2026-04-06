import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import type { DashboardData } from "../types";

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

  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  const { stats, recentApplications, upcomingReminders } = dashboardData;

  return (
    <div>
      <h1>Dashboard</h1>

      <button onClick={() => navigate("/applications")}>Go to Applications</button>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={() => navigate("/kanban")}>Kanban Board</button>

      <h2>Stats</h2>
      <ul>
        <li>Total: {stats.total}</li>
        <li>Applied: {stats.applied}</li>
        <li>Interview: {stats.interview}</li>
        <li>Offer: {stats.offer}</li>
        <li>Rejected: {stats.rejected}</li>
      </ul>

      <h2>Recent Applications</h2>
      {recentApplications.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        <ul>
          {recentApplications.map((app) => (
            <li key={app.id}>
              {app.company} — {app.position} ({app.status})
            </li>
          ))}
        </ul>
      )}

      <h2>Upcoming Reminders</h2>
      {upcomingReminders.length === 0 ? (
        <p>No upcoming reminders.</p>
      ) : (
        <ul>
          {upcomingReminders.map((app) => (
            <li key={app.id}>
              {app.company} — {app.position} ({app.appliedDate})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DashboardPage;
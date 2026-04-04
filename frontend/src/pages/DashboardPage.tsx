import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axiosInstance.get(
          "/api/dashboard"
        );

        console.log("DASHBOARD DATA:", response.data);
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

  return (
  <div>
    <button onClick={handleLogout}>
      Logout
    </button>

    <h1>Dashboard</h1>

    <p>Total Applications: {dashboardData.totalApplications}</p>

    <h2>Applications by Status</h2>

    <ul>
      {Object.entries(dashboardData.applicationsByStatus).map(
        ([status, count]) => (
          <li key={status}>
            {status}: {count as number}
          </li>
        )
      )}
    </ul>
  </div>
);
}

export default DashboardPage;
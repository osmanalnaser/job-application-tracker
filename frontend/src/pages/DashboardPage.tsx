import { useEffect, useState } from "react";
import axios from "axios";

function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<any>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:8080/api/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("DASHBOARD DATA:", response.data);
        setDashboardData(response.data);
      } catch (error) {
        console.error("ERROR FETCHING DASHBOARD:", error);
      }
    };

    fetchDashboard();
  }, []);

  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
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
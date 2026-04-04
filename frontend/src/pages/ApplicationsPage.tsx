import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

interface JobApplication {
  id: number;
  company: string;
  position: string;
  status: string;
}

function ApplicationsPage() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [page, setPage] = useState(0);

  const fetchApplications = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/applications/page?page=${page}&size=5`
      );

      console.log("APPLICATIONS:", response.data);

      setApplications(response.data.content);

    } catch (error) {
      console.error("ERROR FETCHING APPLICATIONS:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [page]);

  return (
    <div>
      <h1>Applications</h1>

      <table border={1}>
        <thead>
          <tr>
            <th>Company</th>
            <th>Position</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {applications.map((app) => (
            <tr key={app.id}>
              <td>{app.company}</td>
              <td>{app.position}</td>
              <td>{app.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 0}
      >
        Previous
      </button>

      <button
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default ApplicationsPage;
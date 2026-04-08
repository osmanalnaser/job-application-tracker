import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import type { JobApplication } from "../types";

function ApplicationsPage() {
  const [applications, setApplications] =
    useState<JobApplication[]>([]);

  const [page, setPage] = useState(0);

  const navigate = useNavigate();

  const fetchApplications = async () => {
    try {
      const response =
        await axiosInstance.get(
          `/api/applications/page?page=${page}&size=5`
        );

      setApplications(
        response.data.content
      );

    } catch (error) {
      console.error(
        "ERROR FETCHING APPLICATIONS:",
        error
      );
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [page]);

  const handleDelete = async (
    id: number
  ) => {
    try {

      await axiosInstance.delete(
        `/api/applications/${id}`
      );

      fetchApplications();

    } catch (error) {
      console.error(
        "ERROR DELETING APPLICATION:",
        error
      );
    }
  };

  return (
    <div className="page">
      <div className="navbar">
        <h1>Applications</h1>
        <div className="navbar-actions">
          <button className="btn-secondary" onClick={() => navigate("/dashboard")}>
            Dashboard
          </button>
          <button className="btn-secondary" onClick={() => navigate("/kanban")}>
            Kanban
          </button>
          <button className="btn-primary" onClick={() => navigate("/applications/create")}>
            + New Application
          </button>
        </div>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Position</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td>{app.company}</td>
                <td>{app.position}</td>
                <td>
                  <span className={`badge badge-${app.status}`}>
                    {app.status}
                  </span>
                </td>
                <td style={{ display: "flex", gap: "8px" }}>
                  <button
                    className="btn-secondary btn-sm"
                    onClick={() => navigate(`/applications/${app.id}/edit`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-danger btn-sm"
                    onClick={() => handleDelete(app.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button
            className="btn-secondary"
            onClick={() => setPage(page - 1)}
            disabled={page === 0}
          >
            Previous
          </button>
          <span style={{ fontSize: "14px", color: "#6b7280" }}>Page {page + 1}</span>
          <button
            className="btn-secondary"
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApplicationsPage;
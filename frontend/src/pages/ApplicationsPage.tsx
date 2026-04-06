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
    <div>

      <h1>Applications</h1>

      <button
        onClick={() =>
          navigate("/applications/create")
        }
      >
        Create Application
      </button>

      <button
        onClick={() =>
          navigate("/dashboard")
        }
      >
        Back to Dashboard
      </button>

      <table border={1}>

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

              <td>
                {app.company}
              </td>

              <td>
                {app.position}
              </td>

              <td>
                {app.status}
              </td>

              <td>
                <button 
                
                    onClick={() => 
                    navigate(`/applications/${app.id}/edit`)}>
                Edit
                </button>
                
                <button

                  onClick={() =>
                    handleDelete(app.id)
                  }
                >
                  Delete
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

      <br />

      <button
        onClick={() =>
          setPage(page - 1)
        }
        disabled={page === 0}
      >
        Previous
      </button>

      <button
        onClick={() =>
          setPage(page + 1)
        }
      >
        Next
      </button>

    </div>
  );
}

export default ApplicationsPage;
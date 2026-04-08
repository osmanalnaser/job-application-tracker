import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

function CreateApplicationPage() {

  const [company, setCompany] =
    useState("");

  const [position, setPosition] =
    useState("");

  const [status, setStatus] =
    useState("APPLIED");

  const navigate = useNavigate();

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      await axiosInstance.post(
        "/api/applications",
        {
          company,
          position,
          status,
        }
      );

      navigate("/applications");

    } catch (error) {
      console.error(
        "ERROR CREATING APPLICATION:",
        error
      );
    }
  };

  return (
    <div className="page">
      <div className="navbar">
        <h1>New Application</h1>
        <button className="btn-secondary" onClick={() => navigate("/applications")}>
          Cancel
        </button>
      </div>

      <div className="card" style={{ maxWidth: "600px" }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Company *</label>
            <input
              type="text"
              placeholder="e.g. Google"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Position *</label>
            <input
              type="text"
              placeholder="e.g. Software Engineer"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="APPLIED">Applied</option>
              <option value="INTERVIEW">Interview</option>
              <option value="OFFER">Offer</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>

          <button type="submit" className="btn-primary">
            Create Application
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateApplicationPage;
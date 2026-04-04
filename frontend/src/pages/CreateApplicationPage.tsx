import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

function CreateApplicationPage() {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("APPLIED");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axiosInstance.post("/api/applications", {
        company,
        position,
        status,
      });

      console.log("Application created");

      navigate("/applications");

    } catch (error) {
      console.error("ERROR CREATING APPLICATION:", error);
    }
  };

  return (
    <div>
      <h1>Create Application</h1>

      <form onSubmit={handleSubmit}>

        <div>
          <input
            type="text"
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </div>

        <div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="APPLIED">APPLIED</option>
            <option value="INTERVIEW">INTERVIEW</option>
            <option value="OFFER">OFFER</option>
            <option value="REJECTED">REJECTED</option>
          </select>
        </div>

        <button type="submit">
          Create
        </button>

      </form>
    </div>
  );
}

export default CreateApplicationPage;
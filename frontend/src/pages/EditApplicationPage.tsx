import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import type { ApplicationStatus } from "../types";

function EditApplicationPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [location, setLocation] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [status, setStatus] = useState<ApplicationStatus>("APPLIED");
  const [appliedDate, setAppliedDate] = useState("");
  const [reminderDate, setReminderDate] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await axiosInstance.get(`/api/applications/${id}`);
        const app = response.data;

        setCompany(app.company);
        setPosition(app.position);
        setLocation(app.location ?? "");
        setJobUrl(app.jobUrl ?? "");
        setSalaryRange(app.salaryRange ?? "");
        setStatus(app.status);
        setAppliedDate(app.appliedDate ?? "");
        setReminderDate(app.reminderDate ?? "");
        setNotes(app.notes ?? "");
      } catch (error) {
        console.error("ERROR FETCHING APPLICATION:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axiosInstance.put(`/api/applications/${id}`, {
        company,
        position,
        location,
        jobUrl,
        salaryRange,
        status,
        appliedDate: appliedDate || null,
        reminderDate: reminderDate || null,
        notes,
      });

      navigate("/applications");
    } catch (error) {
      console.error("ERROR UPDATING APPLICATION:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="page">
      <div className="navbar">
        <h1>Edit Application</h1>
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
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Position *</label>
            <input
              type="text"
              placeholder="Position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              placeholder="e.g. Munich, Remote"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Job URL</label>
            <input
              type="text"
              placeholder="https://..."
              value={jobUrl}
              onChange={(e) => setJobUrl(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Salary Range</label>
            <input
              type="text"
              placeholder="e.g. 60.000 - 80.000 €"
              value={salaryRange}
              onChange={(e) => setSalaryRange(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
            >
              <option value="APPLIED">Applied</option>
              <option value="INTERVIEW">Interview</option>
              <option value="OFFER">Offer</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>

          <div className="form-group">
            <label>Applied Date</label>
            <input
              type="date"
              value={appliedDate}
              onChange={(e) => setAppliedDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Reminder Date</label>
            <input
              type="date"
              value={reminderDate}
              onChange={(e) => setReminderDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea
              placeholder="Any notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <button type="submit" className="btn-primary">Save Changes</button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate("/applications")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditApplicationPage;
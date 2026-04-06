import { useDroppable } from "@dnd-kit/core";
import type { ApplicationStatus, JobApplication } from "../types";
import KanbanCard from "./KanbanCard";

interface Props {
  status: ApplicationStatus;
  applications: JobApplication[];
}

const STATUS_LABELS: Record<ApplicationStatus, string> = {
  APPLIED: "Applied",
  INTERVIEW: "Interview",
  OFFER: "Offer",
  REJECTED: "Rejected",
};

function KanbanColumn({ status, applications }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div
      ref={setNodeRef}
      style={{
        minWidth: "250px",
        minHeight: "400px",
        background: isOver ? "#e8f4ff" : "#f4f4f4",
        borderRadius: "8px",
        padding: "12px",
        transition: "background 0.2s",
      }}
    >
      <h3 style={{ marginBottom: "12px" }}>
        {STATUS_LABELS[status]} ({applications.length})
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {applications.map((app) => (
          <KanbanCard key={app.id} application={app} />
        ))}
      </div>
    </div>
  );
}

export default KanbanColumn;
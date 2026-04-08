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
      className="kanban-column"
      style={{
        background: isOver ? "#e8f4ff" : "#f4f4f4",
      }}
    >
      <div className="kanban-column-header">
        <span>{STATUS_LABELS[status]}</span>
        <span style={{
          background: "#e5e7eb",
          borderRadius: "999px",
          padding: "2px 8px",
          fontSize: "12px",
        }}>
          {applications.length}
        </span>
      </div>

      {applications.map((app) => (
        <KanbanCard key={app.id} application={app} />
      ))}
    </div>
  );
}

export default KanbanColumn;
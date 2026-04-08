import { useDraggable } from "@dnd-kit/core";
import { useNavigate } from "react-router-dom";
import type { JobApplication } from "../types";

interface Props {
  application: JobApplication;
}

function KanbanCard({ application }: Props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: application.id });

  const navigate = useNavigate();

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      className="kanban-card"
      style={{
        opacity: isDragging ? 0.5 : 1,
        ...style,
      }}
      {...listeners}
      {...attributes}
    >
      <p className="kanban-card-company">{application.company}</p>
      <p className="kanban-card-position">{application.position}</p>
      {application.location && (
        <p className="kanban-card-location">{application.location}</p>
      )}
      <button
        className="btn-secondary btn-sm"
        style={{ marginTop: "8px" }}
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/applications/${application.id}/edit`);
        }}
      >
        Edit
      </button>
    </div>
  );
}

export default KanbanCard;
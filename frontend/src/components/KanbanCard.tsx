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
      style={{
        background: "white",
        borderRadius: "6px",
        padding: "12px",
        boxShadow: isDragging ? "0 4px 12px rgba(0,0,0,0.2)" : "0 1px 4px rgba(0,0,0,0.1)",
        opacity: isDragging ? 0.5 : 1,
        cursor: "grab",
        ...style,
      }}
      {...listeners}
      {...attributes}
    >
      <p style={{ fontWeight: "bold", margin: 0 }}>{application.company}</p>
      <p style={{ margin: "4px 0", color: "#555" }}>{application.position}</p>
      {application.location && (
        <p style={{ margin: "4px 0", fontSize: "12px", color: "#888" }}>
          {application.location}
        </p>
      )}
      <button
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/applications/${application.id}/edit`);
        }}
        style={{ marginTop: "8px", fontSize: "12px" }}
      >
        Edit
      </button>
    </div>
  );
}

export default KanbanCard;
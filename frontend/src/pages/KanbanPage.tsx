import { useEffect, useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import type { ApplicationStatus, JobApplication } from "../types";
import KanbanColumn from "../components/KanbanColumn";
import KanbanCard from "../components/KanbanCard";

const COLUMNS: ApplicationStatus[] = ["APPLIED", "INTERVIEW", "OFFER", "REJECTED"];

function KanbanPage() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [activeApp, setActiveApp] = useState<JobApplication | null>(null);
  const navigate = useNavigate();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axiosInstance.get("/api/applications");
      setApplications(response.data);
    } catch (error) {
      console.error("ERROR FETCHING APPLICATIONS:", error);
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    const app = applications.find((a) => a.id === event.active.id);
    setActiveApp(app ?? null);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveApp(null);

    if (!over) return;

    const appId = active.id as number;
    const newStatus = over.id as ApplicationStatus;

    const app = applications.find((a) => a.id === appId);
    if (!app || app.status === newStatus) return;

    // Optimistic update
    setApplications((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, status: newStatus } : a))
    );

    try {
      await axiosInstance.patch(`/api/applications/${appId}/status`, {
        status: newStatus,
      });
    } catch (error) {
      console.error("ERROR UPDATING STATUS:", error);
      // Revert on failure
      setApplications((prev) =>
        prev.map((a) => (a.id === appId ? { ...a, status: app.status } : a))
      );
    }
  };

  return (
    <div>
      <h1>Kanban Board</h1>

      <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
      <button onClick={() => navigate("/applications/create")}>
        Create Application
      </button>

      <div style={{ display: "flex", gap: "16px", marginTop: "24px", overflowX: "auto" }}>
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {COLUMNS.map((status) => (
            <KanbanColumn
              key={status}
              status={status}
              applications={applications.filter((a) => a.status === status)}
            />
          ))}

          <DragOverlay>
            {activeApp ? <KanbanCard application={activeApp} /> : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}

export default KanbanPage;
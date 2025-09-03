import { useState } from "react";
import { TasksList } from "./TasksList";
import { TaskDetail } from "./TaskDetail";

export const App = () => {
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);

  return (
    <div>
      <button
        onClick={() => {
          setSelectedTaskId(null);
          setSelectedBoardId(null);
        }}
      >
        Reset
      </button>

      <div style={{ display: "flex", gap: 50 }}>
        <TasksList
          selectedTaskId={selectedTaskId}
          onTaskSelect={(taskId: string, boardId: string) => {
            setSelectedTaskId(taskId);
            setSelectedBoardId(boardId);
          }}
        />
        <TaskDetail taskId={selectedTaskId} boardId={selectedBoardId} />
      </div>
    </div>
  );
};

export default App;

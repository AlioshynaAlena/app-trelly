import { useState } from "react";
import { TasksList } from "./TasksList";
import { TaskDetail } from "./TaskDetail";

export const MainPage = () => {

      const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
      const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);
      const [isDublicationDetailVisible, setIsDublicationDetailVisible] = useState(false)

      return (
        <div>
              <button
                onClick={() => {setSelectedTaskId(null); setSelectedBoardId(null);}}>Reset</button>
                <button onClick={() => setIsDublicationDetailVisible(!isDublicationDetailVisible)}>Toggle</button>
        
              <div style={{ display: "flex", gap: 50 }}>
                <TasksList
                  selectedTaskId={selectedTaskId}
                  onTaskSelect={(taskId: string, boardId: string) => {
                    setSelectedTaskId(taskId);
                    setSelectedBoardId(boardId);
                  }}
                />
                <TaskDetail taskId={selectedTaskId} boardId={selectedBoardId} />
        
                {isDublicationDetailVisible && <TaskDetail taskId={selectedTaskId} boardId={selectedBoardId}/> }
              </div>
            </div>
      )
}

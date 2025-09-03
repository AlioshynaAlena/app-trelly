import { useEffect, useState } from "react";
import type { Task } from "./types";
import { TaskListItem } from "./TaskListItem";
import { api } from "./api";

type Props = {
  onTaskSelect: (trackId: string, boardId: string) => void;
  selectedTaskId: string | null;
};

export function TasksList(props: Props) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [listQueryStatus, setListQueryStatus] = useState<
    "pending" | "success" | "loading"
  >("loading"); //FSM
  //подсветка
  // const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);

  useEffect(() => {
    //rest api
    api
      .getTasks()
      //затем, еогда ты превратишься в json выведи мне данные (это уже будет JS объект, с которым мы в последующем что-то сможем делать)
      .then((json) => {
        console.log(json);
        setTasks(json.data);
        //после того как подгрузились треки, мы убираем Loading...'
        setListQueryStatus("success");
      });
  }, []);

  if (listQueryStatus === "loading") {
    return <div>loading...</div>;
  }

  const handleSelect = (taskId: string, boardId: string) => {
    // setSelectedTrackId(trackId)
    //уведомлю родителя о том, что такой трек был выбран
    props.onTaskSelect(taskId, boardId);
  };

  return (
    <ul>
      {tasks.map((t) => {
        return (
          <TaskListItem
            //трек, когда в тебе произойдет select вызови мою функцию. Когда вызовешь мою функцию, передай мне trackId
            onSelect={handleSelect}
            isSelected={t.id === props.selectedTaskId}
            task={t}
          />
        );
      })}
    </ul>
  );
}

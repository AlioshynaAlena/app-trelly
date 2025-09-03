import { useEffect, useRef, useState } from "react";
import type { Task } from "./types";
import { api } from "./api";

type Props = {
  taskId: string | null;
  boardId: string | null;
};

export function TaskDetail(props: Props) {
  const [task, setTask] = useState<Task | null>(null);
  const [detailQueryStatus, setDetailQueryStatus] = useState<
    "pending" | "success" | "loading"
  >("pending");
  const abortControllerRef = useRef<null | AbortController>(null);

  useEffect(() => {
    abortControllerRef.current?.abort();

    if (!props.taskId || !props.boardId) {
      setTask(null);
      setDetailQueryStatus("pending");
      return;
    }

    abortControllerRef.current = new AbortController();
    setDetailQueryStatus("loading");

    api
      .getTask(props.taskId, props.boardId, abortControllerRef.current.signal)
      //затем, еогда ты превратишься в json выведи мне данные (это уже будет JS объект, с которым мы в последующем что-то сможем делать)
      .then((json) => {
        console.log(json);
        setTask(json.data);
        setDetailQueryStatus("success");
      });
  }, [props.taskId, props.boardId]);

  if (detailQueryStatus === "pending") {
    return <span>no task for display</span>;
  }

  if (detailQueryStatus === "loading") {
    return <div>loading...</div>;
  }

  if (!task) {
    return <div>No task data</div>;
  }
  return (
    <div>
      <h2>Details</h2>

      <h4>Title: {task.attributes.title}</h4>
      <h4>BoardId: {task.attributes.boardId}</h4>
      <h4>Status: {task.attributes.status}</h4>
      <h4>Priority: {task.attributes.priority}</h4>
      <h4>Added ad: {task.attributes.addedAt}</h4>
      <h4>Attachments Count:{task.attributes.attachmentsCount}</h4>
    </div>
  );
}

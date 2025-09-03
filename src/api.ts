import type { ApiResponse, TaskDetailResponse } from "./types";

export const api = {
  getTasks() {
    return fetch("https://trelly.it-incubator.app/api/1.0/boards/tasks", {
      headers: {
        "API-KEY": "",
      },
    }).then((res) => res.json() as Promise<ApiResponse>);
  },

  getTask(taskId: string, boardId: string, signal?: AbortSignal) {
    return (
      fetch(
        "https://trelly.it-incubator.app/api/1.0/boards/" +
          boardId +
          "/tasks/" +
          taskId,
        {
          signal: signal,
          headers: {
            "API-KEY": "",
          },
        }
      )
        //мы делаем запрос, а затем (then), когда придут данные я скажу этому ответу превратиться в json формат
        .then((res) => res.json() as Promise<TaskDetailResponse>)
    );
  },
};

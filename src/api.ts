import type { ApiResponse, TaskDetailResponse } from "./types";

export const api = {
  async getTasks(): Promise<ApiResponse> {
    const res = await fetch("https://trelly.it-incubator.app/api/1.0/boards/tasks", {
      headers: {
        "API-KEY": "",
      }
    })
    const json = await res.json() as Promise<ApiResponse>
    return json
  },

 async getTask(taskId: string, boardId: string, signal?: AbortSignal):Promise<TaskDetailResponse>  {
  const res = await fetch(
        "https://trelly.it-incubator.app/api/1.0/boards/" +
          boardId +
          "/tasks/" +
          taskId,
        {
          signal: signal,
          headers: {
            "API-KEY": "",
          },
        })
        const json = await res.json() as Promise<TaskDetailResponse>
        return json
  },
};






















// export const api = {
//   getTasks() {
//     return fetch("https://trelly.it-incubator.app/api/1.0/boards/tasks", {
//       headers: {
//         "API-KEY": "ecb3efa5-905a-4347-b20d-cb960fad3202",
//       },
//     }).then((res) => res.json() as Promise<ApiResponse>);
//   },

//   getTask(taskId: string, boardId: string, signal?: AbortSignal) {
//     return (
//       fetch(
//         "https://trelly.it-incubator.app/api/1.0/boards/" +
//           boardId +
//           "/tasks/" +
//           taskId,
//         {
//           signal: signal,
//           headers: {
//             "API-KEY": "ecb3efa5-905a-4347-b20d-cb960fad3202",
//           },
//         }
//       )
//         //мы делаем запрос, а затем (then), когда придут данные я скажу этому ответу превратиться в json формат
//         .then((res) => res.json() as Promise<TaskDetailResponse>)
//     );
//   },
// };

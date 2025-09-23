
import { TaskListItem } from "./TaskListItem";
import { api } from "./api";
import { useQuery } from "./hooks/utils/useQuery";

type Props = {
  onTaskSelect: (taskId: string, boardId: string) => void;
  selectedTaskId: string | null;
};

//hook
// function useTasksList(onTaskSelect: (taskId: string, boardId: string) => void) {
//   const { status: listQueryStatus, data: tasks } = useQuery<Task[]>({
//     queryKeys: [],
//     queryFn: () => {
//       return api.getTasks().then((json) => json.data);
//     },
//   });

//   const handleSelect = (taskId: string, boardId: string) => {
//     // setSelectedTrackId(trackId)
//     //уведомлю родителя о том, что такой трек был выбран
//     onTaskSelect(taskId, boardId);
//   };

//   return { tasks, listQueryStatus, handleSelect };
// }

export function TasksList(props: Props) {
  const { data, status } = useQuery({
    queryFn: () => api.getTasks(),
    queryKey: ['tasks']
  })

  if (status === "loading") {
    return <div>loading...</div>;
  }

    const handleSelect = (taskId: string, boardId: string) => {
    props.onTaskSelect(taskId, boardId);
  };

  return (
    <ul>
      {data?.data.map((t) => {
        return (
          <TaskListItem
            key={t.id}
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

// export function TasksList(props: Props) {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [listQueryStatus, setListQueryStatus] = useState<
//     "pending" | "success" | "loading"
//   >("loading"); //FSM
//   //подсветка
//   // const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);

//   useEffect(() => {
//     //rest api
//     api
//       .getTasks()
//       //затем, еогда ты превратишься в json выведи мне данные (это уже будет JS объект, с которым мы в последующем что-то сможем делать)
//       .then((json) => {
//         console.log(json);
//         setTasks(json.data);
//         //после того как подгрузились треки, мы убираем Loading...'
//         setListQueryStatus("success");
//       });
//   }, []);

//   if (listQueryStatus === "loading") {
//     return <div>loading...</div>;
//   }

//   const handleSelect = (taskId: string, boardId: string) => {
//     // setSelectedTrackId(trackId)
//     //уведомлю родителя о том, что такой трек был выбран
//     props.onTaskSelect(taskId, boardId);
//   };

//   return (
//     <ul>
//       {tasks.map((t) => {
//         return (
//           <TaskListItem
//             //трек, когда в тебе произойдет select вызови мою функцию. Когда вызовешь мою функцию, передай мне trackId
//             onSelect={handleSelect}
//             isSelected={t.id === props.selectedTaskId}
//             task={t}
//           />
//         );
//       })}
//     </ul>
//   );
// }

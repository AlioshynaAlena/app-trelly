import { useQuery } from "@tanstack/react-query";
import { TaskListItem } from "./TaskListItem";
import { client } from "./shared/api/client";


type Props = {
  onTaskSelect: (taskId: string, boardId: string) => void;
  selectedTaskId: string | null;
};


export function TasksList(props: Props) {
  const { data, isPending, isError } = useQuery({
    queryFn: async () => {
      const clientData = await client.GET('/boards/tasks')
            return clientData.data!
    },
    queryKey: ['tasks', 'list']
  })

  if (isPending) {
    return <div>loading...</div>;
  }
   if (isError) {
        return <div>Can't load tracks list</div>
    }

    const handleSelect = (taskId: string, boardId: string) => {
    props.onTaskSelect(taskId, boardId);
  };

  return (
    <ul>
      {data.data.map((t) => {
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


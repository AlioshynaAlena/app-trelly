import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { client } from "./shared/api/client";



type Props = {
  taskId: string | null;
  boardId: string | null;
};


export function TaskDetail(props: Props) {
  const {data, isPending, isError, isFetching} = useQuery({
    queryFn: async ({signal}) => {
      const clientData = await  client.GET('/boards/{boardId}/tasks/{taskId}', {
                params: {
                    path: {
                        taskId: props.taskId!,
                        boardId: props.boardId!
                    }
                },
                signal: signal
            });
            return clientData.data!
    },
    enabled: Boolean(props.taskId && props.boardId ),
    queryKey: ['tasks', 'detail', props.taskId, props.boardId],
    placeholderData: keepPreviousData
  })


  if (!props.taskId) {return <span>no task selected</span>;}

  if (isPending) {return <div>fetching...</div>;}

  if (isError) {return <span>some error when fetch track</span>}



  return (
    <div>
      <h2>Details {isFetching && '⏳'}</h2>
      <h4>Title: {data.data.attributes.title}</h4>
      <h4>BoardId: {data.data.attributes.boardId}</h4>
      <h4>Status: {data.data.attributes.status}</h4>
      <h4>Priority: {data.data.attributes.priority}</h4>
      <h4>Added ad: {data.data.attributes.addedAt}</h4>
      <h4>Attachments Count:{data.data.attributes.attachments}</h4>
    </div>
  );
}


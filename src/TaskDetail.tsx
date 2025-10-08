import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { client } from "./shared/api/client";
// import { useParams } from "./shared/libs/router/Router";
import {useParams } from "react-router-dom";



export function TaskDetail() {

    const {taskId: taskId, boardId: boardId} = useParams();

    const {data, isPending, isError, isFetching} = useQuery({
        queryFn: async ({signal}) => {
            const clientData = await  client.GET('/boards/{boardId}/tasks/{taskId}', {
                params: {
                    path: {
                        taskId: taskId!,
                        boardId: boardId!
                    }
                },
                signal: signal
            });
            return clientData.data!
        },
        enabled: Boolean(taskId && boardId ),
        queryKey: ['tasks', 'detail', taskId, boardId],
        placeholderData: keepPreviousData
    })

    if (!taskId) {
        return <div>no task selected</div>
    }

    if (isPending) {
        return <div>fetching...</div>
    }

    if (isError) {return <span>some error when fetch task</span>}


    return  <div>
        <h2>Detail {isFetching && '⏳'}</h2>
            <h3>{data.data.attributes.title}</h3>
            <div>BoardId: {data.data.attributes.boardId}</div>
            <div>Status: {data.data.attributes.status}</div>
            <div>Priority: {data.data.attributes.priority}</div>
            <div>Added ad: {data.data.attributes.addedAt}</div>
            <div>Attachments Count:{data.data.attributes.attachments}</div>
    </div>
}



// type Props = {
//   taskId: string | null;
//   boardId: string | null;
// };


// export function TaskDetail(props: Props) {
//   const {data, isPending, isError, isFetching} = useQuery({
//     queryFn: async ({signal}) => {
//       const clientData = await  client.GET('/boards/{boardId}/tasks/{taskId}', {
//                 params: {
//                     path: {
//                         taskId: props.taskId!,
//                         boardId: props.boardId!
//                     }
//                 },
//                 signal: signal
//             });
//             return clientData.data!
//     },
//     enabled: Boolean(props.taskId && props.boardId ),
//     queryKey: ['tasks', 'detail', props.taskId, props.boardId],
//     placeholderData: keepPreviousData
//   })


//   if (!props.taskId) {return <span>no task selected</span>;}

//   if (isPending) {return <div>fetching...</div>;}

//   if (isError) {return <span>some error when fetch track</span>}



//   return (
//     <div>
//       <h2>Details {isFetching && '⏳'}</h2>
//       <h4>Title: {data.data.attributes.title}</h4>
//       <h4>BoardId: {data.data.attributes.boardId}</h4>
//       <h4>Status: {data.data.attributes.status}</h4>
//       <h4>Priority: {data.data.attributes.priority}</h4>
//       <h4>Added ad: {data.data.attributes.addedAt}</h4>
//       <h4>Attachments Count:{data.data.attributes.attachments}</h4>
//     </div>
//   );
// }


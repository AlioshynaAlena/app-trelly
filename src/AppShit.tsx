import { useEffect, useRef, useState } from 'react'
import './App.css'
import type { ApiResponse, Task, TaskDetailResponse } from './types';

function AppShit() {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
  const [listQueryStatus, setListQueryStatus] = useState<'success' | 'loading'>('loading')
  const [detailQueryStatus, setDetailQueryStatus] = useState<'pending' | 'success' | 'loading'>('pending')
  const [selectedTask, setSelectedTask] = useState<TaskDetailResponse | null>(null)
  const abortControllerRef = useRef<null | AbortController>(null)



  useEffect(() => {
    fetch('https://trelly.it-incubator.app/api/1.0/boards/tasks', {
      headers: {
        'API-KEY': '',
      },
    })
      .then((res) => res.json()as Promise<ApiResponse> )
      .then((json) => {
        console.log(json);
        setTasks(json.data);
        setListQueryStatus('success')
      });
  }, []);



  const handleSelectTaskClick = (taskId: string, boardId: string) => {
  setSelectedTaskId(taskId);
  setDetailQueryStatus('loading')


abortControllerRef.current?.abort()
abortControllerRef.current = new AbortController();


    fetch('https://trelly.it-incubator.app/api/1.0/boards/' + boardId + '/tasks/' + taskId, { 
      signal: abortControllerRef.current.signal,
      headers: {
        'API-KEY': '',
      },
    })
    //мы делаем запрос, а затем (then), когда придут данные я скажу этому ответу превратиться в json формат
      .then((res) => res.json() as Promise<TaskDetailResponse>)
      //затем, еогда ты превратишься в json выведи мне данные (это уже будет JS объект, с которым мы в последующем что-то сможем делать)
      .then((json) => {
        console.log(json);
        setSelectedTask(json);
        setDetailQueryStatus('success')
      });
  }


  return (
    <div style={{'display': 'flex', 'gap': 50}}>
      <div>
    <ul> 
      <h3>List</h3>

      {
        listQueryStatus === 'loading' && <p>Loading...</p> 
      }

      {tasks.map((task) => {
        const color = task.id === selectedTaskId ? "red" : "green"
    return (
      <li key={task.id} style={{color: color}}>
        <h4 onClick={() => handleSelectTaskClick(task.id, task.attributes.boardId)}>Title: {task.attributes.title}</h4>
      </li>
    );
  })}
    </ul>
    </div>
    <div>
      <h3>Details</h3>

      {detailQueryStatus === 'loading' && <p>Loading...</p>}

      {detailQueryStatus === 'success' && selectedTask && <div>
        <h4>Title: {selectedTask.data.attributes.title}</h4>
        <h4>BoardId: {selectedTask.data.attributes.boardId}</h4>
        <h4>Status: {selectedTask.data.attributes.status}</h4>
        <h4>Priority: {selectedTask.data.attributes.priority}</h4>
        <h4>Added ad: {selectedTask.data.attributes.addedAt}</h4>
        <h4>Attachments Count:{selectedTask.data.attributes.attachmentsCount}</h4>
        </div>}  
    </div>
    </div>
  )
}




export default AppShit

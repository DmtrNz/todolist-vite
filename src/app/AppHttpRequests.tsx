import { CreateItemForm, EditableSpan } from '@/common/components'
import { type ChangeEvent, type CSSProperties, useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox'
import { Todolist } from '@/features/todolist/api/todolistApi.types'
import { todolistApi } from '@/features/todolist/api/todolistApi'

export const AppHttpRequests = () => {
    const [todolists, setTodolists] = useState<Todolist[]>([])
    const [tasks, setTasks] = useState<any>({})

    useEffect(() => {
        todolistApi.getTodolists().then(res => setTodolists(res.data))
    }, [])

    const createTodolist = (title: string) => {
        todolistApi.createTodolist(title).then(res => {
            const newTodolist = res.data.data.item
            setTodolists([newTodolist, ...todolists])
        })
    }

    const deleteTodolist = (id: string) => {
        todolistApi.deleteTodolist(id).then(() => {
            setTodolists(todolists.filter(t=>t.id !== id))
        })
    }

    const changeTodolistTitle = (id: string, title: string) => {
        todolistApi.changeTodolistTitle(id, title).then(() => {
            setTodolists(todolists.map(t=>t.id === id ? {...t, title} : t))
        })
    }

    const createTask = (todolistId: string, title: string) => { }

    const deleteTask = (todolistId: string, taskId: string) => { }

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>, task: any) => { }

    const changeTaskTitle = (task: any, title: string) => { }

    return (
        <div style={{ margin: '20px' }}>
            <CreateItemForm onCreateItem={createTodolist} />
            {todolists.map(todolist => (
                <div key={todolist.id} style={container}>
                    <div>
                        <EditableSpan value={todolist.title}
                            onChange={title => changeTodolistTitle(todolist.id, title)} />
                        <button onClick={() => deleteTodolist(todolist.id)}>x</button>
                    </div>
                    <CreateItemForm onCreateItem={title => createTask(todolist.id, title)} />
                    {tasks[todolist.id]?.map((task: any) => (
                        <div key={task.id}>
                            <Checkbox checked={task.isDone}
                                onChange={e => changeTaskStatus(e, task)} />
                            <EditableSpan value={task.title}
                                onChange={title => changeTaskTitle(task, title)} />
                            <button onClick={() => deleteTask(todolist.id, task.id)}>x</button>
                </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

const container: CSSProperties = {
    border: '1px solid black',
    margin: '20px 0',
    padding: '10px',
    width: '300px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
}
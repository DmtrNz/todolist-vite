import { List } from '@mui/material'
import { TaskItem } from './TaskItem/TaskItem'
import { useAppSelector } from '@/common/hooks'
import { selectTasks } from '@/features/todolist/model/tasks-slice'
import { DomainTodolist } from '@/features/todolist/model/todolists-slice'

type Props = {
    todolist: DomainTodolist
}

export const Tasks = (props: Props) => {
    const { id, filter } = props.todolist

    const tasks = useAppSelector(selectTasks)

    const todolistTasks = tasks[id]
    let filteredTasks = todolistTasks
    if (filter === 'active') {
        filteredTasks = todolistTasks.filter((task) => !task.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = todolistTasks.filter((task) => task.isDone)
    }

    return (
        <>
            {filteredTasks?.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List>
                    {filteredTasks?.map((task) => {
                        return (
                            <TaskItem
                                key={task.id}
                                todolist={props.todolist}
                                task={task}
                            />
                        )
                    })}
                </List>
            )}
        </>
    )
}

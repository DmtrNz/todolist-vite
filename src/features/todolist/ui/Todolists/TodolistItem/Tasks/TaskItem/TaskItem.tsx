import {
    Box,
    Checkbox,
    IconButton,
    ListItem,
    ListItemIcon,
} from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { ChangeEvent } from 'react'
import { getListItemSx } from './TaskItem.styles.ts/TaskItem.styles'
import { DomainTodolist } from '@/features/todolist/model/todolists-slice'
import {
    updateTask,
    deleteTask,
} from '@/features/todolist/model/tasks-slice'
import { EditableSpan } from '@/common/components/EditableSpan/EditableSpan'
import { useAppDispatch } from '@/common/hooks'
import { DomainTask } from '@/features/todolist/api/tasksApi.types'
import { TaskStatus } from '@/common/enums/enums'

type Props = {
    todolist: DomainTodolist
    task: DomainTask
}

export const TaskItem = ({ todolist, task }: Props) => {
    const { id } = todolist

    const dispatch = useAppDispatch()
    const deleteTaskHandler = () => {
        dispatch(deleteTask({ taskId: task.id, todolistId: id }))
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
        const newtask = {...task, status}
        dispatch(updateTask(newtask))
    }

    const changeTaskTitleHandler = (title: string) => {
        const newtask = {...task, title}
        dispatch(updateTask(newtask))
    }

    const isTaskCompleted = task.status === TaskStatus.Completed

    return (
        <ListItem
            className={task.status ? 'is-done' : ''}
            disablePadding
            divider
            secondaryAction={
                <IconButton onClick={deleteTaskHandler} color={'primary'}>
                    <DeleteForeverIcon />
                </IconButton>
            }
        >
            <ListItemIcon>
                <Checkbox
                    checked={isTaskCompleted}
                    onChange={changeTaskStatusHandler}
                    size='small'
                />
            </ListItemIcon>

            <Box sx={getListItemSx(isTaskCompleted)}>
                <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
            </Box>
        </ListItem>
    )
}

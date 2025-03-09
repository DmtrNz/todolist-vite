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
    changeTaskStatusAC,
    changeTaskTitleAC,
    deleteTaskAC,
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

    const isTaskCompleted = task.status === TaskStatus.Completed

    const dispatch = useAppDispatch()
    const deleteTask = () => {
        dispatch(deleteTaskAC({ id: task.id, todolistId: id }))
    }

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(
            changeTaskStatusAC({
                id: task.id,
                todolistId: id,
                isDone: e.currentTarget.checked,
            }),
        )
    }

    const changeTaskTitle = (title: string) => {
        dispatch(
            changeTaskTitleAC({ todolistId: id, id: task.id, title: title }),
        )
    }

    return (
        <ListItem
            className={task.isDone ? 'is-done' : ''}
            disablePadding
            divider
            secondaryAction={
                <IconButton onClick={deleteTask} color={'primary'}>
                    <DeleteForeverIcon />
                </IconButton>
            }
        >
            <ListItemIcon>
                <Checkbox
                    checked={isTaskCompleted}
                    onChange={changeTaskStatus}
                    size='small'
                />
            </ListItemIcon>

            <Box sx={getListItemSx(isTaskCompleted)}>
                <EditableSpan value={task.title} onChange={changeTaskTitle} />
            </Box>
        </ListItem>
    )
}

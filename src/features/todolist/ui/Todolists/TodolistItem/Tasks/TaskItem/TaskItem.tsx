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
    Task,
} from '@/features/todolist/model/tasks-slice'
import { EditableSpan } from '@/common/components/EditableSpan/EditableSpan'
import { useAppDispatch } from '@/common/hooks'

type Props = {
    todolist: DomainTodolist
    task: Task
}

export const TaskItem = ({ todolist, task }: Props) => {
    const { id } = todolist

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
                    checked={task.isDone}
                    onChange={changeTaskStatus}
                    size='small'
                />
            </ListItemIcon>

            <Box sx={getListItemSx(task.isDone)}>
                <EditableSpan value={task.title} onChange={changeTaskTitle} />
            </Box>
        </ListItem>
    )
}

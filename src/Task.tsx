import { Box, Checkbox, IconButton, ListItem, ListItemIcon } from "@mui/material"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { EditableSpan } from "./EditableSpan"
import { changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, Task } from "./model/tasks-reducer"
import { useAppDispatch } from "./common/hooks/useAppDispatch"
import { ChangeEvent } from "react"
import { Todolist } from "./model/todolists-reducer"
import { getListItemSx } from "./TodolistItesm.styles"

type Props = {
    todolist: Todolist
    task: Task
}

export const TaskItem = ({ todolist, task }: Props) => {
    const {id} = todolist

    const dispatch = useAppDispatch()
    const deleteTask = () => {
        dispatch(deleteTaskAC({ id: task.id, todolistId: id }))
    }

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC({ id: task.id, todolistId: id, isDone: e.currentTarget.checked }))
    }

    const changeTaskTitle = (title: string) => {
        dispatch(changeTaskTitleAC({ todolistId: id, id: task.id, title: title }))
    }

    return (
        <ListItem
        className={task.isDone ? 'is-done' : ''}
        disablePadding
        divider
        secondaryAction={
            <IconButton
                onClick={deleteTask}
                color={"primary"}>
                <DeleteForeverIcon />
            </IconButton>
        }
    >
        <ListItemIcon>
            <Checkbox
                checked={task.isDone}
                onChange={changeTaskStatus}
                size="small"
            />
        </ListItemIcon>

        <Box sx={getListItemSx(task.isDone)}>
            <EditableSpan value={task.title} onChange={changeTaskTitle} />
        </Box>
    </ListItem>
    )
}
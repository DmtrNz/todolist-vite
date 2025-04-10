import { IconButton, Typography } from "@mui/material"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import {
    changeTodolistTitleAC,
    deleteTodolistAC,
    Todolist,
} from "@/features/todolist/model/todolists-reducer"
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan"
import { useAppDispatch } from "@/common/hooks"

type Props = {
    todolist: Todolist
}

export const TodolistTitle = (props: Props) => {
    const { id, title } = props.todolist

    const dispatch = useAppDispatch()

    //todolists
    const deleteTodolist = () => {
        dispatch(deleteTodolistAC({ todolistId: id }))
    }

    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleAC({ todolistId: id, title }))
    }

    return (
        <div className={"container"}>
            <Typography variant='h5' align={"center"} sx={{ fontWeight: 700 }}>
                <EditableSpan value={title} onChange={changeTodolistTitle} />
            </Typography>
            <IconButton
                aria-label='delete'
                onClick={deleteTodolist}
                color={"primary"}
            >
                <DeleteForeverIcon />
            </IconButton>
        </div>
    )
}

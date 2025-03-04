import { IconButton, Typography } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import {
    changeTodolistTitle,
    deleteTodolistAC,
    DomainTodolist,
} from '@/features/todolist/model/todolists-slice'
import { EditableSpan } from '@/common/components/EditableSpan/EditableSpan'
import { useAppDispatch } from '@/common/hooks'

type Props = {
    todolist: DomainTodolist
}

export const TodolistTitle = (props: Props) => {
    const { id, title } = props.todolist

    const dispatch = useAppDispatch()

    //todolists
    const deleteTodolist = () => {
        dispatch(deleteTodolistAC({ todolistId: id }))
    }

    const changeTodolistTitleHandler = (title: string) => {
        dispatch(changeTodolistTitle({ todolistId: id, title }))
    }

    return (
        <div className={'container'}>
            <Typography variant='h5' align={'center'} sx={{ fontWeight: 700 }}>
                <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
            </Typography>
            <IconButton
                aria-label='delete'
                onClick={deleteTodolist}
                color={'primary'}
            >
                <DeleteForeverIcon />
            </IconButton>
        </div>
    )
}

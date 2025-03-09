import { IconButton, Typography } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import {
    changeTodolistTitle,
    deleteTodolist,
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
    const deleteTodolistHandler = () => {
        dispatch(deleteTodolist({ todolistId: id }))
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
                onClick={deleteTodolistHandler}
                color={'primary'}
            >
                <DeleteForeverIcon />
            </IconButton>
        </div>
    )
}

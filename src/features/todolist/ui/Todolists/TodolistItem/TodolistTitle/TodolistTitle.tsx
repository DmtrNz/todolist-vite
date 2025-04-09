import { IconButton, Typography } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import {
  DomainTodolist,
} from '@/features/todolist/model/todolists-slice'
import { EditableSpan } from '@/common/components/EditableSpan/EditableSpan'
import styles from "/src/app/App.module.css"
import { useChangeTodolistTitleMutation, useDeleteTodolistMutation } from '@/features/todolist/api/todolistApi'

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = (props: Props) => {
  const { id, title, entityStatus } = props.todolist

  // const dispatch = useAppDispatch()
  const [ deleteTodolist ] = useDeleteTodolistMutation() //Возвращает массив, где первый элемент (deleteTodolist) — это функция для вызова мутации.Второй элемент (здесь не используется) содержит статус запроса (isLoading, error и т. д.)

  const [ changeTodolistTitle ] = useChangeTodolistTitleMutation()

  const deleteTodolistHandler = () => {
    deleteTodolist(id) //Вызывает мутацию удаления, передавая id тудулиста
  }

  const changeTodolistTitleHandler = (title: string) => {
    changeTodolistTitle({title, id}) 
  }

  return (
    <div className={styles.container}>
      <Typography variant='h5' align={'center'} sx={{ fontWeight: 700 }}>
        <EditableSpan
          value={title}
          onChange={changeTodolistTitleHandler}
          todolist={props.todolist}
        />
      </Typography>
      <IconButton
        aria-label='delete'
        onClick={deleteTodolistHandler}
        color={'primary'}
        disabled={entityStatus === 'loading'}
      >
        <DeleteForeverIcon />
      </IconButton>
    </div>
  )
}

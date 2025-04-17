import { IconButton, Typography } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { EditableSpan } from '@/common/components/EditableSpan/EditableSpan'
import styles from "/src/app/App.module.css"
import { todolistApi, useChangeTodolistTitleMutation, useDeleteTodolistMutation } from '@/features/todolist/api/todolistApi'
import { useAppDispatch } from '@/common/hooks'
import { RequestStatus } from '@/common/types'
import { DomainTodolist } from '@/features/todolist/lib/types/types'

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = (props: Props) => {
  const { id, title, entityStatus } = props.todolist

  // const dispatch = useAppDispatch()
  const [deleteTodolist] = useDeleteTodolistMutation() //Возвращает массив, где первый элемент (deleteTodolist) — это функция для вызова мутации.Второй элемент (здесь не используется) содержит статус запроса (isLoading, error и т. д.)
  const [changeTodolistTitle] = useChangeTodolistTitleMutation()

  const dispatch = useAppDispatch()

  const changeTodolistStatus = (entityStatus: RequestStatus) => {
    dispatch(
      todolistApi.util.updateQueryData('getTodolists', undefined, (todolists) => {
        const todolist = todolists.find((t) => t.id === id)
        if (todolist) {
          todolist.entityStatus = entityStatus
        }
      })
    )
  }

  const deleteTodolistHandler = () => {
    changeTodolistStatus('loading')
    deleteTodolist(id) //Вызывает мутацию удаления, передавая id тудулиста
      .unwrap()
      .catch(() => {
        changeTodolistStatus('idle')
      })
  }

  const changeTodolistTitleHandler = (title: string) => {
    changeTodolistTitle({ title, id })
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

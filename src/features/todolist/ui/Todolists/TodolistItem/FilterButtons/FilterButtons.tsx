import { useAppDispatch } from '@/common/hooks'
import { containerSx } from '@/common/styles'
import { todolistApi } from '@/features/todolist/api/todolistApi'
import { DomainTodolist, FilterValues } from '@/features/todolist/lib/types/types'
import { Box, Button } from '@mui/material'

type Props = {
  todolist: DomainTodolist
}

export const FilterButtons = (props: Props) => {
  const { id, filter } = props.todolist

  const dispatch = useAppDispatch()

  //todolists
  const changeFilterHandker = (filter: FilterValues) => {
    dispatch(
      todolistApi.util.updateQueryData('getTodolists', undefined, (todolists) => { 
        const todolist = todolists.find((todolist: { id: string }) => todolist.id === id)
        if (todolist) {
          todolist.filter = filter
        }
      })
    )
    //dispatch(changeFilter({ todolistId: id, filter }))
  }

  return (
    <Box sx={containerSx}>
      <Button
        color={filter === 'all' ? 'secondary' : 'primary'}
        variant='contained'
        onClick={() => changeFilterHandker('all')}
      >
        All
      </Button>
      <Button
        color={filter === 'active' ? 'secondary' : 'primary'}
        variant='contained'
        onClick={() => changeFilterHandker('active')}
      >
        Active
      </Button>
      <Button
        color={filter === 'completed' ? 'secondary' : 'primary'}
        variant='contained'
        onClick={() => changeFilterHandker('completed')}
      >
        Completed
      </Button>
    </Box>
  )
}

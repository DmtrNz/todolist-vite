import { CreateItemForm } from '@/common/components/CreateItemForm/CreateItemForm'
import { useCreateTodolistMutation } from '@/features/todolist/api/todolistApi'
import { Todolists } from '@/features/todolist/ui/Todolists/Todolists'
import { Container, Grid2 } from '@mui/material'

export const Main = () => {
  // const dispatch = useAppDispatch()
  // const isLoggedIn = useSelector(selectIsLoggedIn)
  const [ createTodolist ] = useCreateTodolistMutation()

  //todolists
  const createTodolistHandler = (title: string) => {
    createTodolist(title)
  }

  return (
    <Container maxWidth='lg'>
      <Grid2 container sx={{ p: '20px 0' }}>
        <CreateItemForm onCreateItem={createTodolistHandler} />
      </Grid2>
      <Grid2 container spacing={4}>
        <Todolists />
      </Grid2>
    </Container>
  )
}

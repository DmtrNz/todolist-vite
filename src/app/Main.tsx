import { CreateItemForm } from '@/common/components/CreateItemForm/CreateItemForm'
import { useAppDispatch } from '@/common/hooks'

import { createTodolist } from '@/features/todolist/model/todolists-slice'
import { Todolists } from '@/features/todolist/ui/Todolists/Todolists'
import { Container, Grid2 } from '@mui/material'

export const Main = () => {
    const dispatch = useAppDispatch()

    //todolists
    const createTodolistHandler = (title: string) => {
        dispatch(createTodolist({title: title}))
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

import { Container, Grid2 } from "@mui/material"
import { CreateItemForm } from "../CreateItemForm"
import { createTodolistAC } from "@/model/todolists-reducer"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { Todolists } from "@/Todolists"

export const Main = () => {

    const dispatch = useAppDispatch()

    //todolists
    const createTodolist = (title: string) => {
        dispatch(createTodolistAC(title))
    }

    return (
        <Container maxWidth="lg">
            <Grid2 container sx={{ p: "20px 0" }}>
                <CreateItemForm onCreateItem={createTodolist} />
            </Grid2>
            <Grid2 container spacing={4}>
                <Todolists/>
            </Grid2>
        </Container>
    )
}


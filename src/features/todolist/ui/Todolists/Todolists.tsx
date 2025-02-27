import { Grid2, Paper } from "@mui/material"
import { TodolistItem } from "./TodolistItem/TodolistItem"
import { selectTodolists } from "../../model/todolists-selector"
import { useAppSelector } from "@/common/hooks"

export const Todolists = () => {
    const todolists = useAppSelector(selectTodolists)

    return (
        <>
            {todolists.map((todolist) => {
                return (
                    <Grid2 key={todolist.id}>
                        <Paper elevation={8} sx={{ p: "15px" }}>
                            <TodolistItem todolist={todolist} />
                        </Paper>
                    </Grid2>
                )
            })}
        </>
    )
}

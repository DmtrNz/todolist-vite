import Grid from "@mui/material/Grid2"
import Paper from "@mui/material/Paper"
import { TodolistItem } from "./TodolistItem/TodolistItem"
import { useGetTodolistsQuery } from "../../api/todolistApi"
import { Box } from "@mui/material"
import { TodolistSkeleton } from "./TodolistSkeleton/TodolistSkeleton"
import { containerSx } from "@/common/styles"

export const Todolists = () => {
  const { data: todolists, isLoading } = useGetTodolistsQuery() //При монтировании компонента автоматически отправляет GET-запрос на указанный эндпоинт (в вашем случае todo-lists), возвращает объект с полями: data — полученные данные (массив тудулистов), isLoading — статус загрузки (true/false).error — объект ошибки (если запрос провалился).

  if (isLoading) {
    return (
      <Box sx={containerSx} style={{ gap: "32px" }}>
        {Array(3)
          .fill(null)
          .map((_, id) => (
            <TodolistSkeleton key={id} />
          ))}
      </Box>
    )
  }

  return (
    <>
      {todolists?.map((todolist) => (
        <Grid key={todolist.id}>
          <Paper sx={{ p: "0 20px 20px 20px" }}>
            <TodolistItem todolist={todolist} />
          </Paper>
        </Grid>
      ))}
    </>
  )
}

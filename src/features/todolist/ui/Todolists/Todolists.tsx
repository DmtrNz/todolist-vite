import Grid from "@mui/material/Grid2"
import Paper from "@mui/material/Paper"
import { TodolistItem } from "./TodolistItem/TodolistItem"
import { useGetTodolistsQuery } from "../../api/todolistApi"

export const Todolists = () => {
  const { data: todolists } = useGetTodolistsQuery() //При монтировании компонента автоматически отправляет GET-запрос на указанный эндпоинт (в вашем случае todo-lists), возвращает объект с полями: data — полученные данные (массив тудулистов), isLoading — статус загрузки (true/false).error — объект ошибки (если запрос провалился).

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

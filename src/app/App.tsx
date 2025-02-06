import './App.css'
import { useEffect, useState } from 'react'
import { CreateItemForm } from '../CreateItemForm'
import { TodolistItem } from '../TodolistItem'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Container, CssBaseline, Grid2, Paper, Switch } from '@mui/material'
import { containerSx } from '../TodolistItesm.styles'
import { NavButton } from '../NavButton'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { indigo, amber} from '@mui/material/colors'
import { 
  changeFilterAC, 
  changeTodolistTitleAC, 
  createTodolistAC, 
  deleteTodolistAC } 
from '../model/todolists-reducer'
import { 
  changeTaskStatusAC, 
  changeTaskTitleAC, 
  createTaskAC, 
  deleteTaskAC, } 
from '../model/tasks-reducer'
import { useAppSelector } from '../common/hooks/useAppSelector'
import { selectTasks } from '../model/tasks-selectors'
import { useAppDispatch } from '../common/hooks/useAppDispatch'
import { selectTodolists } from '../model/todolists-selector'


export type Todolist = {
  id: string
  title: string
  filter: FilterValues
}

export type Task = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValues = 'all' | 'active' | 'completed'

export type TasksState = Record<string, Task[]>

export type ThemeMode = "light" | "dark"

export const App = () => {

  const todolists = useAppSelector(selectTodolists)
  const tasks = useAppSelector(selectTasks)
  const dispatch = useAppDispatch()

  //tasks
  const deleteTask = (todolistId: string, taskId: string) => {
    dispatch(deleteTaskAC({id: taskId, todolistId: todolistId}))
  }

  const createTask = (todolistId: string, title: string) => {
    dispatch(createTaskAC({title: title, todolistId: todolistId}))
  }

  const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    dispatch(changeTaskStatusAC({id: taskId, todolistId: todolistId, isDone: isDone}))
  }

  const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
    dispatch(changeTaskTitleAC({todolistId: todolistId, id: taskId, title: title}))
  }

  //todolists
  const createTodolist = (title: string) => {
    dispatch(createTodolistAC(title))
  }
  const deleteTodolist = (todolistId: string) => {
    dispatch(deleteTodolistAC({todolistId}))
  }
  const changeFilter = (todolistId: string, filter: FilterValues) => {
    dispatch(changeFilterAC({todolistId, filter}))
  }
  const changeTodolistTitle = (todolistId: string, title: string) => {
    dispatch(changeTodolistTitleAC({todolistId, title}))
  }

  const initialTheme= localStorage.getItem("themeValue")
    ? JSON.parse(localStorage.getItem("themeValue") as string)
    : 0;

    const[isLightMode, setIsLightMode] = useState(initialTheme)
    
    useEffect(() => {
      localStorage.setItem("themeValue", JSON.stringify(isLightMode))
    }, [isLightMode])

  const changeThemeHandler = () => setIsLightMode(!isLightMode)

  const theme = createTheme({
    palette: {
      primary: indigo,
      secondary: amber,
      mode: isLightMode? "light" : "dark"
    },
  })

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline/> 
        <AppBar position="static">
          <Toolbar>
            <Container maxWidth={"lg"} sx={containerSx}>
              <IconButton color="inherit">
                <MenuIcon />
              </IconButton>
              <div>
                <Switch onChange={changeThemeHandler} color={'default'}></Switch>
                <NavButton >Sign in</NavButton>
                <NavButton >Sign up</NavButton>
                <NavButton background={theme.palette.secondary.main}>Faq</NavButton>
              </div>
            </Container>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg">
          <Grid2 container sx={{ p: "20px 0" }}>
            <CreateItemForm onCreateItem={createTodolist} />
          </Grid2>
          <Grid2 container spacing={4}>
            {todolists.map(todolist => {
              const todolistTasks = tasks[todolist.id]
              let filteredTasks = todolistTasks
              if (todolist.filter === 'active') {
                filteredTasks = todolistTasks.filter(task => !task.isDone)
              }
              if (todolist.filter === 'completed') {
                filteredTasks = todolistTasks.filter(task => task.isDone)
              }

              return (
                <Grid2 key={todolist.id}>
                  <Paper elevation={8} sx={{ p: "15px" }}>
                    <TodolistItem
                      todolist={todolist}
                      tasks={filteredTasks}
                      deleteTask={deleteTask}
                      changeFilter={changeFilter}
                      createTask={createTask}
                      changeTaskStatus={changeTaskStatus}
                      deleteTodolist={deleteTodolist}
                      changeTaskTitle={changeTaskTitle}
                      changeTodolistTitle={changeTodolistTitle}
                    />
                  </Paper>
                </Grid2>
              )
            })}
          </Grid2>
        </Container>
      </ThemeProvider>
    </div>
  )
}

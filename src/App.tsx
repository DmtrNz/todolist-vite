import './App.css'
import { useState } from 'react'
import { v1 } from 'uuid'
import { TodolistItem } from './TodolistItem'

export type Task = {
  id: string
  title: string
  isDone: boolean
}

export type Todolist = {
  id: string
  title: string
  filter: FilterValues
}

export type TasksStateType = {
  [todolistId: string]: Task[]
}

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {
  //BLL

  const todolistId_1 = v1()
  const todolistId_2 = v1()

  const [todolists, setTodolists] = useState<Todolist[]>([
    { id: todolistId_1, title: "What to learn", filter: "all" },
    { id: todolistId_2, title: "What to buy", filter: "all" },
  ])

  const [tasks, setTasks] = useState<TasksStateType>({
    [todolistId_1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
    ],
    [todolistId_2]: [
      { id: v1(), title: 'Whiskey', isDone: true },
      { id: v1(), title: 'Cola', isDone: true },
      { id: v1(), title: 'Ice', isDone: false },
    ],
  })


  const deleteTask = (taskId: string, todolistId: string) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)
    })
  }

  const createTask = (title: string, todolistId: string) => {
    const newTask: Task = { id: v1(), title, isDone: false }
    setTasks({
      ...tasks,
      [todolistId]: [newTask, ...tasks[todolistId]]
    })
  }

  const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map(t => t.id == taskId ? { ...t, isDone } : t)
    })
  }

  const changeTodolistFilter = (filter: FilterValues, todolistId: string) => {
    setTodolists(todolists.map(tl => tl.id === todolistId ? { ...tl, filter } : tl))
  }

  const deleteTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(tl => tl.id !== todolistId))
    delete tasks[todolistId]
  }


  // UI


  const todolistsComponents = todolists.map(tl => {

    let filteredTasks = tasks[tl.id]
    if (tl.filter === 'active') {
      filteredTasks = filteredTasks.filter(task => !task.isDone)
    }
    if (tl.filter === 'completed') {
      filteredTasks = filteredTasks.filter(task => task.isDone)
    }

    return (
      <TodolistItem
      key={tl.id}
        todolistId={tl.id}
        title={tl.title}
        filter={tl.filter}
        tasks={filteredTasks}

        deleteTask={deleteTask}
        createTask={createTask}
        changeTaskStatus={changeTaskStatus}

        changeTodolistFilter={changeTodolistFilter}
        deleteTodolist={deleteTodolist}
      />
    )
  })



  

  return (
    <div className="app">
      {todolistsComponents}
    </div>
  )
}

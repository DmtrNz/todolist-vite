import { createAction, createReducer, nanoid } from "@reduxjs/toolkit"
import { createTodolistAC, deleteTodolistAC } from "./todolists-reducer"

export const deleteTaskAC = createAction<{ id: string; todolistId: string }>(
    "tasks/deleteTask",
)
export const createTaskAC = createAction<{ title: string; todolistId: string }>(
    "tasks/createTask",
)
export const changeTaskStatusAC = createAction<{
    id: string
    todolistId: string
    isDone: boolean
}>("tasks/changeTaskStatus")
export const changeTaskTitleAC = createAction<{
    todolistId: string
    id: string
    title: string
}>("tasks/changeTaskTitle")

export type TasksState = Record<string, Task[]>

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export const initialState: TasksState = {}

export const tasksReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(deleteTodolistAC, (state, action) => {
            const { todolistId } = action.payload
            delete state[todolistId]
        })
        .addCase(createTodolistAC, (state, action) => {
            const { id } = action.payload
            state[id] = []
        })
        .addCase(deleteTaskAC, (state, action) => {
            const { todolistId, id } = action.payload
            const index = state[todolistId].findIndex((t) => t.id === id)
            if (index !== -1) {
                state[todolistId].splice(index, 1)
            }
        })
        .addCase(createTaskAC, (state, action) => {
            const { title, todolistId } = action.payload
            const newTask: Task = {
                id: nanoid(),
                title,
                isDone: false,
            }
            state[todolistId].unshift(newTask)
        })
        .addCase(changeTaskStatusAC, (state, action) => {
            const { id, todolistId, isDone } = action.payload
            const task = state[todolistId].find((t) => t.id === id)
            if (task) {
                task.isDone = isDone
            }
        })
        .addCase(changeTaskTitleAC, (state, action) => {
            const { todolistId, id, title } = action.payload
            const task = state[todolistId].find((t) => t.id === id)
            if (task) {
                task.title = title
            }
        })
})

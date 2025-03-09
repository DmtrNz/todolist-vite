import { createSlice, nanoid } from '@reduxjs/toolkit'
import { createTodolist, deleteTodolist } from './todolists-slice'

export type TasksState = Record<string, Task[]>

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export const tasksSlice = createSlice({
    name: "tasks",
    initialState: {} as TasksState,
    reducers: (create) => {
        return {
            deleteTaskAC: create.reducer<{id: string, todolistId: string}>((state, action)=>{
                const { todolistId, id } = action.payload
                const index = state[todolistId].findIndex((t) => t.id === id)
                if (index !== -1) {
                    state[todolistId].splice(index, 1)
                }
            }),
            createTaskAC: create.reducer<{title: string; todolistId: string}>((state, action)=>{
                const { title, todolistId } = action.payload
                const newTask: Task = {
                    id: nanoid(),
                    title,
                    isDone: false,
                }
                state[todolistId].unshift(newTask)
            }),
            changeTaskStatusAC: create.reducer<{id: string, todolistId: string, isDone: boolean}>((state, action)=>{
                const { id, todolistId, isDone } = action.payload
                const task = state[todolistId].find((t) => t.id === id)
                if (task) {
                    task.isDone = isDone
                }
            }),
            changeTaskTitleAC: create.reducer<{todolistId: string, id: string, title: string}>((state, action)=>{
                const { todolistId, id, title } = action.payload
                const task = state[todolistId].find((t) => t.id === id)
                if (task) {
                    task.title = title
                }
            })
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTodolist.fulfilled, (state, action) => {
                const { todolistId } = action.payload;
                state[todolistId] = []
            })
            .addCase(deleteTodolist.fulfilled, (state, action) => {
                const { todolistId } = action.payload
                delete state[todolistId];
            })
            
    },
    selectors: {
        selectTasks: (state) => state
    }
})

export const tasksReducer = tasksSlice.reducer
export const { deleteTaskAC, createTaskAC, changeTaskStatusAC, changeTaskTitleAC } = tasksSlice.actions
export const { selectTasks } = tasksSlice.selectors

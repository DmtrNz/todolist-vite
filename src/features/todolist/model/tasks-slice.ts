import { createSlice, nanoid } from '@reduxjs/toolkit'
import { createTodolistAC, deleteTodolistAC } from './todolists-slice'

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
            .addCase(createTodolistAC, (state, action) => {
                state[action.payload.id] = []
            })
            .addCase(deleteTodolistAC, (state, action)=>{
                delete state[action.payload.todolistId]
            })
    },
    selectors: {
        selectTasks: (state) => state
    }
})

export const tasksReducer = tasksSlice.reducer
export const { deleteTaskAC, createTaskAC, changeTaskStatusAC, changeTaskTitleAC } = tasksSlice.actions
export const { selectTasks } = tasksSlice.selectors

// export const tasksReducer = createReducer(initialState, (builder) => {
//     builder
//         .addCase(deleteTodolistAC, (state, action) => {
//             const { todolistId } = action.payload
//             delete state[todolistId]
//         })
//         .addCase(createTodolistAC, (state, action) => {
//             const { id } = action.payload
//             state[id] = []
//         })
//         .addCase(deleteTaskAC, (state, action) => {
//             const { todolistId, id } = action.payload
//             const index = state[todolistId].findIndex((t) => t.id === id)
//             if (index !== -1) {
//                 state[todolistId].splice(index, 1)
//             }
//         })
//         .addCase(createTaskAC, (state, action) => {
//             const { title, todolistId } = action.payload
//             const newTask: Task = {
//                 id: nanoid(),
//                 title,
//                 isDone: false,
//             }
//             state[todolistId].unshift(newTask)
//         })
//         .addCase(changeTaskStatusAC, (state, action) => {
//             const { id, todolistId, isDone } = action.payload
//             const task = state[todolistId].find((t) => t.id === id)
//             if (task) {
//                 task.isDone = isDone
//             }
//         })
//         .addCase(changeTaskTitleAC, (state, action) => {
//             const { todolistId, id, title } = action.payload
//             const task = state[todolistId].find((t) => t.id === id)
//             if (task) {
//                 task.title = title
//             }
//         })
// })

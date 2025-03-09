import { nanoid } from '@reduxjs/toolkit'
import { createTodolist, deleteTodolist } from './todolists-slice'
import { createAppSlice } from '@/common/utils'
import { tasksApi } from '../api/tasksApi'

export type TasksState = Record<string, Task[]>

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export const tasksSlice = createAppSlice({
    name: "tasks",
    initialState: {} as TasksState,
    reducers: (create) => {
        return {
            //actions
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
            }),
            // thunk
            setTasks: create.asyncThunk(async (todolistId: string, {dispatch, rejectWithValue})=>{
                const res = await tasksApi.getTasks(todolistId)
                return { tasks: res.data.items, todolistId }
            },{
                fulfilled: (state, action)=>{
                    state[action.payload.todolistId] = action.payload.tasks
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
export const { deleteTaskAC, createTaskAC, changeTaskStatusAC, changeTaskTitleAC, setTasks } = tasksSlice.actions
export const { selectTasks } = tasksSlice.selectors

import { tasksReducer } from '@/features/todolist/model/tasks-slice'
import { todolistsReducer } from '@/features/todolist/model/todolists-slice'
import { configureStore } from '@reduxjs/toolkit'
import { appReducer } from './app-slice'


export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        todolists: todolistsReducer,
        app: appReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

//@ts-ignore
window.store = store

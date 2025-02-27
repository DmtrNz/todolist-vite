import { tasksReducer } from "@/features/todolist/model/tasks-reducer"
import { todolistsReducer } from "@/features/todolist/model/todolists-reducer"
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { appReducer } from "./app-reducer"

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolist: todolistsReducer,
    app: appReducer,
})

export const store = configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

//@ts-ignore
window.store = store

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { tasksReducer } from "../model/tasks-reducer";
import { todolistsReducer } from "../model/todolists-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolist: todolistsReducer
})

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

//@ts-ignore
window.store = store
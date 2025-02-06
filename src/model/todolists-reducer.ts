import { createAction, createReducer, nanoid } from "@reduxjs/toolkit";
import { FilterValues, Todolist } from "../app/App";

export const deleteTodolistAC = createAction<{todolistId: string}>("todolist/deleteTodolist")
export const createTodolistAC  = createAction("todolist/createTodolist", (title: string) => {
    return(
        {payload: {title, id: nanoid()}}
    )    
})
export const changeTodolistTitleAC = createAction<{todolistId: string, title: string}>("todolist/changeTodolistTitle")
export const changeFilterAC = createAction<{todolistId: string, filter: FilterValues}>("todolist/changeFilterTodolist")

const initialState: Todolist[] = []

export const todolistsReducer = createReducer(initialState, builder => {
    builder
        .addCase(deleteTodolistAC, (state, action)=>{
            const {todolistId} = action.payload
            const index = state.findIndex(t => t.id === todolistId)
            if (index !== -1) {
                state.splice(index, 1)
            }
        })
        .addCase(createTodolistAC, (state, action) => {
            state.push({ ...action.payload, filter: 'all' })
        })
        .addCase(changeTodolistTitleAC, (state, action) => {
            const { todolistId, title } = action.payload
            const index = state.findIndex(todolist => todolist.id === todolistId)
            if (index !== -1) {
                state[index].title = title
            }
        })
        .addCase(changeFilterAC, (state, action) => {
            const { todolistId, filter } = action.payload
            const todolist = state.find(todolist => todolist.id === todolistId)
            if (todolist) {
                todolist.filter = filter
            }
        })
})

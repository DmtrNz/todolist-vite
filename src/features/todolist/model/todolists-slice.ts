import { createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit'
import { Todolist } from '../api/todolistApi.types';
import { todolistApi } from '../api/todolistApi';

export type DomainTodolist = Todolist & {
    filter: FilterValues
}

export type FilterValues = 'all' | 'active' | 'completed'

export const todolistSlice = createSlice({
    name: "todolists",
    initialState: [] as DomainTodolist[],
    reducers: (create) => {
        return {
            deleteTodolistAC: create.reducer<{ todolistId: string }>((state, action) => {
                const { todolistId } = action.payload
                const index = state.findIndex((t) => t.id === todolistId)
                if (index !== -1) {
                    state.splice(index, 1)
                }
            }),
            // changeTodolistTitleAC: create.reducer<{ todolistId: string, title: string }>((state, action) => {
            //     //debugger 
            //     //let a = current(state)
            //     const { todolistId, title } = action.payload
            //     const index = state.findIndex((todolist) => todolist.id === todolistId)
            //     if (index !== -1) {
            //         state[index].title = title
            //     }
            // }),
            changeFilterAC: create.reducer<{ todolistId: string, filter: FilterValues }>((state, action) => {
                const { todolistId, filter } = action.payload
                const todolist = state.find((todolist) => todolist.id === todolistId)
                if (todolist) {
                    todolist.filter = filter
                }
            }),
            createTodolistAC: create.preparedReducer(
                (title: string)=> {
                    return {
                        payload: {
                            title,
                            id: nanoid(),
                            filter: 'all'
                        }
                    }
                }, 
                (state, action)=>{
                    const newToodlist: DomainTodolist = {
                        title: action.payload.title,
                        id: action.payload.id,
                        filter: 'all',
                        addedDate: "", 
                        order: 0
                    }
                    state.push(newToodlist)
                }
            )
        }
    },
    extraReducers: (builder) => {
        builder.addCase(setTodolists.fulfilled, (state, action)=>{
            action.payload?.todolists.forEach((todolist) => {
                state.push({...todolist, filter: "all"})
            })
        })
        .addCase(changeTodolistTitle.fulfilled, (state, action)=>{
            const { todolistId, title } = action.payload
            const index = state.findIndex((todolist) => todolist.id === todolistId)
            if (index !== -1) {
                state[index].title = title
            }
        })
    },
    selectors: {
        selectTodolists: (state)  => state
    }
})

export const setTodolists = createAsyncThunk(`${todolistSlice.name}/setTodolists`, async (_arg, {rejectWithValue}) => {
    try{
        const res = await todolistApi.getTodolists()
        return { todolists: res.data }
    } catch(error){
        return rejectWithValue(null)
    }
})

export const changeTodolistTitle = createAsyncThunk(`${todolistSlice.name}/changeTodolistTitle`, async (args: {todolistId: string, title: string}, {rejectWithValue})=>{
    try{
        await todolistApi.changeTodolistTitle(args)
        return args
    } catch(e) {
        return rejectWithValue(null)
    }
})

export const todolistsReducer = todolistSlice.reducer
export const { deleteTodolistAC, changeFilterAC, createTodolistAC } = todolistSlice.actions
export const { selectTodolists } = todolistSlice.selectors


// export const deleteTodolistAC = createAction<{ todolistId: string }>(
//     'todolist/deleteTodolist',
// )
// export const createTodolistAC = createAction(
//     'todolist/createTodolist',
//     (title: string) => {
//         return { payload: { title, id: nanoid() } }
//     },
// )
// export const changeTodolistTitleAC = createAction<{
//     todolistId: string
//     title: string
// }>('todolist/changeTodolistTitle')
// export const changeFilterAC = createAction<{
//     todolistId: string
//     filter: FilterValues
// }>('todolist/changeFilterTodolist')


// export const _todolistsReducer = createReducer(initialState, (builder) => {
//     builder
        // .addCase(deleteTodolistAC, (state, action) => {
        //     const { todolistId } = action.payload
        //     const index = state.findIndex((t) => t.id === todolistId)
        //     if (index !== -1) {
        //         state.splice(index, 1)
        //     }
        // })
        // .addCase(createTodolistAC, (state, action) => {
        //     state.push({ ...action.payload, filter: 'all' })
        // })
        // .addCase(changeTodolistTitleAC, (state, action) => {
        //     const { todolistId, title } = action.payload
        //     const index = state.findIndex(
        //         (todolist) => todolist.id === todolistId,
        //     )
        //     if (index !== -1) {
        //         state[index].title = title
        //     }
        // })
        // .addCase(changeFilterAC, (state, action) => {
        //     const { todolistId, filter } = action.payload
        //     const todolist = state.find(
        //         (todolist) => todolist.id === todolistId,
        //     )
        //     if (todolist) {
        //         todolist.filter = filter
        //     }
        // })
//})

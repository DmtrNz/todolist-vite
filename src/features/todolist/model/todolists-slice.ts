import { createAsyncThunk} from '@reduxjs/toolkit';
import { Todolist } from '../api/todolistApi.types';
import { todolistApi } from '../api/todolistApi';
import { createAppSlice } from '@/common/utils';
import { setStatus } from '@/app/app-slice';

export type DomainTodolist = Todolist & {
    filter: FilterValues
}

export type FilterValues = 'all' | 'active' | 'completed'

export const todolistSlice = createAppSlice({
    name: "todolists",
    initialState: [] as DomainTodolist[],
    extraReducers: (builder) => {
        builder
            .addCase(changeTodolistTitle.fulfilled, (state, action)=>{
                const { todolistId, title } = action.payload
                const index = state.findIndex((todolist) => todolist.id === todolistId)
                if (index !== -1) {
                    state[index].title = title
                }
            })
            .addCase(deleteTodolist.fulfilled, (state, action)=>{
                const { todolistId } = action.payload
                const index = state.findIndex((t) => t.id === todolistId)
                    if (index !== -1) {
                        state.splice(index, 1)
                    }
            })
            .addCase(createTodolist.fulfilled, (state, action)=>{
                const {todolistId, title}= action.payload
                const newTodolist: DomainTodolist = {
                    title: title,
                    id: todolistId,
                    filter: 'all',
                    addedDate: "",
                    order: 0
                };
                state.push(newTodolist);
            })
        },
    reducers: (create) => ({
        //actions
        changeFilterAC: create.reducer<{ todolistId: string, filter: FilterValues }>((state, action) => {
            const { todolistId, filter } = action.payload
                const todolist = state.find((todolist) => todolist.id === todolistId)
                if (todolist) {
                    todolist.filter = filter
                }
            }),
            //async actions (thunk)
        setTodolists: create.asyncThunk(async(_arg, {dispatch, rejectWithValue})=>{
            try{
                dispatch(setStatus({ status: 'loading' }))
                const res = await todolistApi.getTodolists()
                dispatch(setStatus({ status: 'succeeded' }))
                return { todolists: res.data }
            } catch(error){
                dispatch(setStatus({ status: 'failed' }))
                return rejectWithValue(null)
            }
        }, {
            fulfilled: (state, action)=> {
                action.payload?.todolists.forEach((todolist) => {
                    state.push({...todolist, filter: "all"})
                })
            }
        }) 
    }),
    selectors: {
        selectTodolists: (state)  => state
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

export const deleteTodolist = createAsyncThunk(`${todolistSlice.name}/deleteTodolist`, async (args: {todolistId: string}, {rejectWithValue})=>{
    try{
        await todolistApi.deleteTodolist(args)
        return args
    } catch(e) {
        return rejectWithValue(null)
    }
}) 

export const createTodolist = createAsyncThunk(`${todolistSlice.name}/createTodolist`, async (args: {title: string}, {rejectWithValue})=>{
    try{
        const res = await todolistApi.createTodolist(args)
        return { todolistId: res.data.data.item.id, title: args.title }
    } catch(e) {
        return rejectWithValue(null)
    }
})

export const todolistsReducer = todolistSlice.reducer
export const { changeFilterAC, setTodolists } = todolistSlice.actions
export const { selectTodolists } = todolistSlice.selectors


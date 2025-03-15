import { createTodolist, deleteTodolist } from './todolists-slice'
import { createAppSlice } from '@/common/utils'
import { tasksApi } from '../api/tasksApi'
import { DomainTask } from '../api/tasksApi.types'
import { setStatus } from '@/app/app-slice'

export type TasksState = Record<string, DomainTask[]>

export const tasksSlice = createAppSlice({
    name: "tasks",
    initialState: {} as TasksState,
    reducers: (create) => {
        return {

            setTasks: create.asyncThunk(async (todolistId: string, {dispatch, rejectWithValue })=>{
                try{
                    dispatch(setStatus({ status: 'loading' }))
                    const res = await tasksApi.getTasks(todolistId)
                    dispatch(setStatus({ status: 'succeeded' }))
                    return { tasks: res.data.items, todolistId }
                } catch(error) {
                    dispatch(setStatus({ status: 'failed' }))
                    return rejectWithValue(null)
                }
            },{
                fulfilled: (state, action)=>{
                    state[action.payload.todolistId] = action.payload.tasks
                }
            }),

            createTask: create.asyncThunk(async (args: { todolistId: string, title: string }, { dispatch, rejectWithValue })=>{
                try{
                    dispatch(setStatus({ status: 'loading' }))
                    const res = await tasksApi.createTask(args)
                    dispatch(setStatus({ status: 'succeeded' }))
                    return { task: res.data.data.item }
                } catch(error) {
                    dispatch(setStatus({ status: 'failed' }))
                    return rejectWithValue(null)
                }
            },{
                fulfilled: (state, action)=>{
                    const task = action.payload.task
                    state[task.todoListId].unshift(task)
                }
            }),

            deleteTask: create.asyncThunk(async(args: { todolistId: string, taskId: string }, { dispatch, rejectWithValue} )=>{
                try{
                    dispatch(setStatus({ status: 'loading' }))
                    await tasksApi.deleteTask(args)
                    dispatch(setStatus({ status: 'succeeded' }))
                    return args
                } catch(error) {
                    dispatch(setStatus({ status: 'failed' }))
                    return rejectWithValue(null)
                }
            },{
                fulfilled: (state, action)=>{
                    const { todolistId, taskId } = action.payload
                    const index = state[todolistId].findIndex((t) => t.id === taskId)
                    if (index !== -1) {
                        state[todolistId].splice(index, 1)
                    }
                }
            }),

            updateTask: create.asyncThunk(async(task: DomainTask, {dispatch, rejectWithValue} )=>{
                try{
                    dispatch(setStatus({ status: 'loading' }))
                    await tasksApi.updateTask(task)
                    dispatch(setStatus({ status: 'succeeded' }))
                    return task
                } catch(error) {
                    dispatch(setStatus({ status: 'failed' }))
                    return rejectWithValue(null)
                }
            },{
                fulfilled: (state, action)=>{
                    const { id, todoListId, status, title } = action.payload
                    const task = state[todoListId].find((t) => t.id === id)
                    if (task) {
                        task.status = status
                        task.title = title
                    }
                }
            }),
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
                delete state[todolistId]
            })
            
    },

    selectors: {
        selectTasks: (state) => state
    }
})

export const tasksReducer = tasksSlice.reducer
export const { deleteTask, createTask, updateTask, setTasks } = tasksSlice.actions
export const { selectTasks } = tasksSlice.selectors

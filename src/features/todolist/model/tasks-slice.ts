import { createTodolist, deleteTodolist } from './todolists-slice'
import { createAppSlice } from '@/common/utils'
import { tasksApi } from '../api/tasksApi'
import { DomainTask } from '../api/tasksApi.types'

export type TasksState = Record<string, DomainTask[]>

export const tasksSlice = createAppSlice({
    name: "tasks",
    initialState: {} as TasksState,
    reducers: (create) => {
        return {
            // changeTaskStatus: create.reducer<{id: string, todolistId: string, isDone: boolean}>((state, action)=>{
            //     const { id, todolistId, isDone } = action.payload
            //     const task = state[todolistId].find((t) => t.id === id)
            //     if (task) {
            //         task.status = isDone ? TaskStatus.Completed : TaskStatus.New
            //     }
            // }),
            changeTaskTitleAC: create.reducer<{todolistId: string, id: string, title: string}>((state, action)=>{
                const { todolistId, id, title } = action.payload
                const task = state[todolistId].find((t) => t.id === id)
                if (task) {
                    task.title = title
                }
            }),
            // thunk
            setTasks: create.asyncThunk(async (todolistId: string, { rejectWithValue })=>{
                try{
                    const res = await tasksApi.getTasks(todolistId)
                    return { tasks: res.data.items, todolistId }
                } catch(error) {
                    return rejectWithValue(null)
                }
            },{
                fulfilled: (state, action)=>{
                    state[action.payload.todolistId] = action.payload.tasks
                }
            }),
            createTask: create.asyncThunk(async (args: { todolistId: string, title: string }, { rejectWithValue })=>{
                try{
                    const res = await tasksApi.createTask(args)
                    return { task: res.data.data.item }
                } catch(error) {
                    return rejectWithValue(null)
                }
            },{
                fulfilled: (state, action)=>{
                    const task = action.payload.task
                    state[task.todoListId].unshift(task)
                }
            }),
            deleteTask: create.asyncThunk(async(args: { todolistId: string, taskId: string }, { rejectWithValue} )=>{
                try{
                    await tasksApi.deleteTask(args)
                    return args
                } catch(error) {
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
            changeTaskStatus: create.asyncThunk(async(task: DomainTask, { rejectWithValue} )=>{
                try{
                    await tasksApi.updateTask(task)
                    return task
                } catch(error) {
                    return rejectWithValue(null)
                }
            },{
                fulfilled: (state, action)=>{
                    const { id, todoListId, status } = action.payload
                    const task = state[todoListId].find((t) => t.id === id)
                    if (task) {
                        task.status = status
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
export const { deleteTask, createTask, changeTaskStatus, changeTaskTitleAC, setTasks } = tasksSlice.actions
export const { selectTasks } = tasksSlice.selectors

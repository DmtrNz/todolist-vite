import { createTodolist, deleteTodolist } from './todolists-slice'
import {
  createAppSlice,
  handleServerAppError,
  handleServerNetworkError,
} from '@/common/utils'
import { tasksApi } from '../api/tasksApi'
import { DomainTask, domainTaskSchema } from '../api/tasksApi.types'
import { setStatus } from '@/app/app-slice'
import { ResultCode } from '@/common/enums/enums'
import { clearData } from '@/common/action'

export type TasksState = Record<string, DomainTask[]>

export const tasksSlice = createAppSlice({
  name: 'tasks',
  initialState: {} as TasksState,
  reducers: (create) => {
    return {
      setTasks: create.asyncThunk(
        async (todolistId: string, { dispatch, rejectWithValue }) => {
          try {
            dispatch(setStatus({ status: 'loading' }))
            const res = await tasksApi.getTasks(todolistId)
            domainTaskSchema.array().parse(res.data.items) //ZOD валидация данных
            dispatch(setStatus({ status: 'succeeded' }))
            return { tasks: res.data.items, todolistId }
          } catch (error) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
          },
        },
      ),
      //Example:
      createTask: create.asyncThunk(
        async (
          args: { todolistId: string; title: string },
          { dispatch, rejectWithValue },
        ) => {
          try {
            dispatch(setStatus({ status: 'loading' }))
            const res = await tasksApi.createTask(args)
            if (res.data.resultCode === ResultCode.Success) {
              dispatch(setStatus({ status: 'succeeded' }))
              return { task: res.data.data.item }
            } else {
              handleServerAppError(res.data, dispatch)
              return rejectWithValue(null)
            }
          } catch (error) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            const task = action.payload.task
            state[task.todoListId].unshift(task)
          },
        },
      ),

      deleteTask: create.asyncThunk(
        async (
          args: { todolistId: string; taskId: string },
          { dispatch, rejectWithValue },
        ) => {
          try {
            dispatch(setStatus({ status: 'loading' }))
            const res = await tasksApi.deleteTask(args)
            if (res.data.resultCode === ResultCode.Success) {
              dispatch(setStatus({ status: 'succeeded' }))
              return args
            } else {
              handleServerAppError(res.data, dispatch)
              return rejectWithValue(null)
            }
          } catch (error) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            const { todolistId, taskId } = action.payload
            const index = state[todolistId].findIndex((t) => t.id === taskId)
            if (index !== -1) {
              state[todolistId].splice(index, 1)
            }
          },
        },
      ),

      updateTask: create.asyncThunk(
        async (task: DomainTask, { dispatch, rejectWithValue }) => {
          try {
            dispatch(setStatus({ status: 'loading' }))
            const res = await tasksApi.updateTask(task)
            if (res.data.resultCode === ResultCode.Success) {
              dispatch(setStatus({ status: 'succeeded' }))
              return task
            } else {
              handleServerAppError(res.data, dispatch)
              return rejectWithValue(null)
            }
          } catch (error) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            const { id, todoListId, status, title } = action.payload
            const task = state[todoListId].find((t) => t.id === id)
            if (task) {
              task.status = status
              task.title = title
            }
          },
        },
      ),
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(createTodolist.fulfilled, (state, action) => {
        const { id } = action.payload.todolist
        state[id] = []
      })
      .addCase(deleteTodolist.fulfilled, (state, action) => {
        const { todolistId } = action.payload
        delete state[todolistId]
      })
      .addCase(clearData, ()=>{
        return {}
      })
  },

  selectors: {
    selectTasks: (state) => state,
  },
})

export const tasksReducer = tasksSlice.reducer
export const { deleteTask, createTask, updateTask, setTasks } =
  tasksSlice.actions
export const { selectTasks } = tasksSlice.selectors

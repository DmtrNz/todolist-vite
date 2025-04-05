import { domainTodolistSchema, Todolist } from '../api/todolistApi.types'
import { todolistApi } from '../api/todolistApi'
import {
  createAppSlice,
  handleServerAppError,
  handleServerNetworkError,
} from '@/common/utils'
import { setStatus } from '@/app/app-slice'
import { RequestStatus } from '@/common/types'
import { ResultCode } from '@/common/enums/enums'
import { clearData } from '@/common/action'

export type DomainTodolist = Todolist & {
  filter: FilterValues
  entityStatus: RequestStatus
}

export type FilterValues = 'all' | 'active' | 'completed'

export const todolistSlice = createAppSlice({
  name: 'todolists',
  initialState: [] as DomainTodolist[],
  reducers: (create) => {
    return {
      //actions

      changeFilter: create.reducer<{
        todolistId: string
        filter: FilterValues
      }>((state, action) => {
        const { todolistId, filter } = action.payload
        const todolist = state.find((todolist) => todolist.id === todolistId)
        if (todolist) {
          todolist.filter = filter
        }
      }),

      changeTodolistEntityStatus: create.reducer<{
        todolistId: string
        entityStatus: RequestStatus
      }>((state, action) => {
        const { todolistId, entityStatus } = action.payload
        const todolist = state.find((todolist) => todolist.id === todolistId)
        if (todolist) {
          todolist.entityStatus = entityStatus
        }
      }),

      //async actions (thunk)
      setTodolists: create.asyncThunk(
        async (_arg, { dispatch, rejectWithValue }) => {
          try {
            dispatch(setStatus({ status: 'loading' })) 
            const res = await todolistApi.getTodolists()
            domainTodolistSchema.array().parse(res.data) //ZOD валидация данных
            dispatch(setStatus({ status: 'succeeded' }))
            return { todolists: res.data }
          } catch (error) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (_state, action) => {
            return action.payload.todolists.map((todolist)=>{
              return { ...todolist, filter: "all", entityStatus: 'idle' }
            })
          },
        },
      ),

      changeTodolistTitle: create.asyncThunk(
        async (
          arg: { todolistId: string; title: string },
          { dispatch, rejectWithValue },
        ) => {
          try {
            dispatch(setStatus({ status: 'loading' }))
            const res = await todolistApi.changeTodolistTitle(arg)
            if (res.data.resultCode === ResultCode.Success) {
              dispatch(setStatus({ status: 'succeeded' }))
              return arg
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
            const { todolistId, title } = action.payload
            const index = state.findIndex(
              (todolist) => todolist.id === todolistId,
            )
            if (index !== -1) {
              state[index].title = title
            }
          },
        },
      ),

      deleteTodolist: create.asyncThunk(
        async (arg: { todolistId: string }, { dispatch, rejectWithValue }) => {
          try {
            dispatch(setStatus({ status: 'loading' }))
            dispatch(
              changeTodolistEntityStatus({
                entityStatus: 'loading',
                todolistId: arg.todolistId,
              }),
            )
            const res = await todolistApi.deleteTodolist(arg)
            if (res.data.resultCode === ResultCode.Success) {
              dispatch(setStatus({ status: 'succeeded' }))
              return arg
            } else {
              dispatch(
                changeTodolistEntityStatus({
                  entityStatus: 'failed',
                  todolistId: arg.todolistId,
                }),
              )
              handleServerAppError(res.data, dispatch)
              return rejectWithValue(null)
            }
          } catch (error) {
            dispatch(
              changeTodolistEntityStatus({
                entityStatus: 'failed',
                todolistId: arg.todolistId,
              }),
            )
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            const { todolistId } = action.payload
            const index = state.findIndex((t) => t.id === todolistId)
            if (index !== -1) {
              state.splice(index, 1)
            }
          },
        },
      ),

      createTodolist: create.asyncThunk(
        async (arg: { title: string }, { dispatch, rejectWithValue }) => {
          try {
            dispatch(setStatus({ status: 'loading' }))
            const res = await todolistApi.createTodolist(arg)
            if (res.data.resultCode === ResultCode.Success) {
              dispatch(setStatus({ status: 'succeeded' }))
              return { todolist: res.data.data.item }
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
            state.unshift({
              ...action.payload.todolist,
              filter: 'all',
              entityStatus: 'idle',
            })
          },
        },
      ),
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(clearData, ()=>{
        return []
      })
  },

  selectors: {
    selectTodolists: (state) => state,
  },
})

export const todolistsReducer = todolistSlice.reducer
export const {
  changeFilter,
  changeTodolistEntityStatus,
  setTodolists,
  changeTodolistTitle,
  deleteTodolist,
  createTodolist,
} = todolistSlice.actions
export const { selectTodolists } = todolistSlice.selectors

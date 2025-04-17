import { RequestStatus } from '@/common/types'
import { taskApi } from '@/features/todolist/api/tasksApi'
import { todolistApi } from '@/features/todolist/api/todolistApi'
import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    themeMode: 'dark' as ThemeMode,
    status: 'idle' as RequestStatus,
    error: null as string | null,
    isLoggedIn: false,
  },
  reducers: (create) => ({
    changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>(
      (state, action) => {
        state.themeMode = action.payload.themeMode
      },
    ),
    setStatus: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.status = action.payload.status
    }),
    setError: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error
    }),
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>(
      (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      },
    ),
  }),

  extraReducers: (builder) => {
    builder
    .addMatcher(isPending, (state, action) => {
      if (
        todolistApi.endpoints.getTodolists.matchPending(action) ||
        taskApi.endpoints.getTasks.matchPending(action)
      ) {
        return
      }
      state.status = "loading"
    })
    .addMatcher(isFulfilled, (state) => {
      state.status = "succeeded"
    })
    .addMatcher(isRejected, (state) => {
      state.status = "failed"
    })
  },

  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectStatus: (state) => state.status,
    selectError: (state) => state.error,
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
})

export const appReducer = appSlice.reducer
export const { changeThemeModeAC, setStatus, setError, setIsLoggedIn } = appSlice.actions
export const { selectThemeMode, selectStatus, selectError, selectIsLoggedIn } = appSlice.selectors

export type ThemeMode = 'dark' | 'light'

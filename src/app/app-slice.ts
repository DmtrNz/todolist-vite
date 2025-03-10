import { RequestStatus } from '@/common/types'
import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        themeMode: 'light' as ThemeMode,
        status: 'loading' as RequestStatus
    },
    reducers: (create) => ({
        changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>(
            (state, action) => {
                state.themeMode = action.payload.themeMode
            },
        ),
        setStatus: create.reducer<{ status: RequestStatus }>(
            (state, action) => {
                state.status = action.payload.status
            },
        ),
    }),
    selectors: {
        selectThemeMode: (state) => state.themeMode,
        selectStatus: (state) => state.status
    }
})

export const appReducer = appSlice.reducer
export const { changeThemeModeAC, setStatus } = appSlice.actions
export const { selectThemeMode, selectStatus } = appSlice.selectors

export type ThemeMode = 'dark' | 'light'

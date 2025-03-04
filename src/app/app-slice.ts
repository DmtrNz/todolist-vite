import { createSlice } from '@reduxjs/toolkit'

// const initialState = {
//     themeMode: "light" as ThemeMode, //понимай это как 'dark' или 'light'
// }

// export const changeThemeModeAC = createAction<{ themeMode: ThemeMode }>(
//     "app/changeThemeMode",
// )

// export const appReducer = createReducer(initialState, (builder) => {
//     builder.addCase(changeThemeModeAC, (state, action) => {
//         state.themeMode = action.payload.themeMode
//     })
// })

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        themeMode: 'light' as ThemeMode,
    },
    reducers: (create) => ({
        changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>(
            (state, action) => {
                state.themeMode = action.payload.themeMode
            },
        ),
    }),
    selectors: {
        selectThemeMode: (state) => state.themeMode
    }
})

export const appReducer = appSlice.reducer
export const { changeThemeModeAC } = appSlice.actions
export const { selectThemeMode } = appSlice.selectors

export type ThemeMode = 'dark' | 'light'

import { createAction, createReducer } from "@reduxjs/toolkit"

const initialState = {
    themeMode: 'light' as ThemeMode, //понимай это как 'dark' или 'light'
}

export const changeThemeModeAC = createAction<{ themeMode: ThemeMode }>("app/changeThemeMode")

export const appReducer = createReducer(initialState, builder => {
    builder
        .addCase(changeThemeModeAC, (state, action) => {
            state.themeMode = action.payload.themeMode
        })
})

export type ThemeMode = 'dark' | 'light'
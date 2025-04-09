import { tasksReducer, tasksSlice } from '@/features/todolist/model/tasks-slice'
import { todolistSlice, todolistsReducer } from '@/features/todolist/model/todolists-slice'
import { configureStore } from '@reduxjs/toolkit'
import { appReducer, appSlice } from './app-slice'
import { setupListeners } from '@reduxjs/toolkit/query'
import { baseApi } from './baseApi'

export const store = configureStore({
  reducer: {
    [tasksSlice.name]: tasksReducer,
    [todolistSlice.name]: todolistsReducer,
    [appSlice.name]: appReducer,
    // [authSlice.name]: authReducer,
    [baseApi.reducerPath]: baseApi.reducer, //Подключает редюсер RTK Query к хранилищу Redux.
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware), //Добавляет middleware RTK Query к стандартным middleware Redux Toolkit
})

setupListeners(store.dispatch) //Включает глобальные обработчики для refetch (повторного запроса данных)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

//@ts-ignore
window.store = store

//todolistApi.reducerPath — это строка с именем редюсера (например, 'todolistApi'), заданная при создании API
//todolistApi.reducer — сам редюсер, который обрабатывает состояния загрузки, ошибок и кэширования для всех эндпоинтов этого API.
//todolistApi.middleware обрабатывает кэширование, автоматические повторные запросы, управление жизненным циклом запросов (например, отмена при размонтировании компонента). Без этого middleware RTK Query не будет работать! getDefaultMiddleware() — возвращает массив стандартных middleware Redux Toolkit (включая redux-thunk, обработку сериализации и т. д.).concat(...) — добавляет middleware RTK Query к этому массиву.
//setupListeners(store.dispatch) включает глобальные обработчики для refetch (повторного запроса данных) при определенных условиях (например, при восстановлении соединения с интернетом или возврате на вкладку браузера).
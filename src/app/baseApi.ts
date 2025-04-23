import { AUTH_TOKEN } from "@/common/constans";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { handleError } from "@/common/utils";

export const baseApi = createApi({
  reducerPath: 'todolistApi', //уникальное имя для редюсера
  tagTypes: ['Todolist', 'Tasks'], //Регистрирует тег 'Todolist' для этого API
  baseQuery: async (args, api, extraOptions) => {

    const result = await fetchBaseQuery({ //Настраивает базовый HTTP-клиент для всех запросов API
      baseUrl: import.meta.env.VITE_BASE_URL, //Указывает корневой URL для всех запросов API
      prepareHeaders: (headers) => { //Фун., модифицирующая заголовки (headers) каждого HTTP-запроса перед отправкой
        headers.set("API-KEY", import.meta.env.VITE_API_KEY) //Добавляет кастомный заголовок API-KEY с ключом из переменной окружения
        headers.set("Authorization", `Bearer ${localStorage.getItem(AUTH_TOKEN)}`) //Добавляет JWT-токен из localStorage в заголовок Authorization
      },
    })(args, api, extraOptions)

    handleError(api, result)

    return result
  },
  endpoints: () => ({}), //Заглушка
  refetchOnFocus: true,
  refetchOnReconnect: true,
})
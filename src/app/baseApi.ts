import { AUTH_TOKEN } from "@/common/constans";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: 'todolistApi', //уникальное имя для редюсера
  tagTypes: ['Todolist'], //Регистрирует тег 'Todolist' для этого API
  baseQuery: fetchBaseQuery({ //Настраивает базовый HTTP-клиент для всех запросов API
    baseUrl: import.meta.env.VITE_BASE_URL, //Указывает корневой URL для всех запросов API
    prepareHeaders: (headers) => { //Фун., модифицирующая заголовки (headers) каждого HTTP-запроса перед отправкой
      headers.set("API-KEY", import.meta.env.VITE_API_KEY) //Добавляет кастомный заголовок API-KEY с ключом из переменной окружения
      headers.set("Authorization", `Bearer ${localStorage.getItem(AUTH_TOKEN)}`) //Добавляет JWT-токен из localStorage в заголовок Authorization
    },
  }),
  endpoints: () => ({}), //Заглушка
})
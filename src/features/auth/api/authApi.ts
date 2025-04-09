import { BaseResponce } from '@/common/types'
import { Inputs } from '../lib/schemas'
import { LoginResponce, MeResponce } from './authApi.types'
import { baseApi } from '@/app/baseApi'


export const authApi = baseApi.injectEndpoints({ 
  endpoints: (builder) => ({ 
    me: builder.query<BaseResponce<MeResponce>, void>({
      query: () => ({ //Фун., возвращающая конфигурацию для HTTP-запроса
        method: 'GET', //HTTP-метод (GET-запрос)  
        url: `auth/me`, //Эндпоинт
      }),
    }),
    login: builder.mutation<BaseResponce<LoginResponce>, Inputs>({
      query: (body) => ({ //Фун., возвращающая конфигурацию для HTTP-запроса
        method: 'POST', //HTTP-метод (POST-запрос)  
        url: `auth/login`, //Эндпоинт
        body //Данные для отправки
      }),
    }),
    logout: builder.mutation<BaseResponce, void>({
      query: () => ({ //Фун., возвращающая конфигурацию для HTTP-запроса
        method: 'DELETE', //HTTP-метод (DELETE-запрос)  
        url: `auth/login`, //Эндпоинт
      }),
    })
  }),
  })

export const { useMeQuery, useLoginMutation, useLogoutMutation } = authApi



import { instance } from '@/common/instance'
import { Todolist } from './todolistApi.types'
import { BaseResponce } from '@/common/types'
import { baseApi } from '@/app/baseApi'
import { DomainTodolist } from '../lib/types/types'

export const todolistApi = baseApi.injectEndpoints({ //injectEndpoints исп. для динамического добавления эндпоинтов к уже созданному API. Это ключевая функция для реализации code splitting
  endpoints: (builder) => ({ //Определяет эндпоинты API (конечные точки для запросов)
    getTodolists: builder.query<DomainTodolist[], void>({ //Создает GET-запрос для получения списка тудулистов. Типизация: тип ожидаемого ответа от сервера,  тип аргумента, передаваемого в запрос
      //query: () => "todo-lists", `query` по умолчанию создает запрос `get` и указание метода необязательно
      query: () => ({ //Фун., возвращающая конфигурацию для HTTP-запроса
        method: 'GET', //HTTP-метод (GET-запрос)  
        url: `todo-lists`, //Эндпоинт
      }),
      transformResponse: (todolists: Todolist[], _meta, _arg) => { //transformResponse - Ключ для функции, которая преобразует ответ сервера перед сохранением в кэш RTK Query. Параметры: todolists - исходный массив тудулистов от сервера, _meta (с префиксом _) - метаданные запроса (не используются, поэтому подчёркивание, _arg (с префиксом _) - аргументы запроса 
        return todolists.map((todolist) => { 
          return { ...todolist, filter: "all", entityStatus: 'idle' } //Добавляет клиентские поля (filter и entityStatus) к каждому тудулисту, которых нет в API. Далее модифицированные данные попадут в кэш RTK Query.
        })
      },
      providesTags: ['Todolist'], //После успешного выполнения getTodolists помечает данные, полученные этим запросом, тегом 'Todolist'. Чтобы RTK Query знал, какие данные нужно перезагрузить при их изменении.
    }),

    createTodolist: builder.mutation<BaseResponce<{ item: Todolist }>, string>({ //
      query: (title) => ({ //Фун., возвращающая конфигурацию для HTTP-запроса
        method: 'POST', //HTTP-метод (POST-запрос) 
        url: `todo-lists`, //Эндпоинт
        body: {title} //Данные для отправки
      }),
      invalidatesTags: ['Todolist'], //После успешного выполнения мутации (create) инвалидирует (помечает как устаревшие) все данные с тегом 'Todolist', чтобы RTK Query автоматически перезагрузил getTodolists и обновил UI.
    }),

    deleteTodolist: builder.mutation<BaseResponce, string>({
      query: (todolistId) => ({
        method: 'DELETE', //HTTP-метод (DELETE-запрос) 
        url: `todo-lists/${todolistId}`, //Эндпоинт
      }),
      invalidatesTags: ['Todolist'], //После успешного выполнения мутации (delete) инвалидирует (помечает как устаревшие) все данные с тегом 'Todolist', чтобы RTK Query автоматически перезагрузил getTodolists и обновил UI.
    }),

    changeTodolistTitle: builder.mutation<BaseResponce, { id: string, title: string }>({
      query: ({title, id}) => ({ //Фун., возвращающая конфигурацию для HTTP-запроса
        method: 'PUT', //HTTP-метод (PUT-запрос) 
        url: `todo-lists/${id}`, //Эндпоинт
        body: {title} //Данные для отправки
      }),
      invalidatesTags: ['Todolist'], //После успешного выполнения мутации (update) инвалидирует (помечает как устаревшие) все данные с тегом 'Todolist', чтобы RTK Query автоматически перезагрузил getTodolists и обновил UI.
    })
  }),
})

export const _todolistApi = {
  getTodolists() {
    return instance.get<Todolist[]>('/todo-lists')
  },
  createTodolist(payload: { title: string }) {
    const { title } = payload
    return instance.post<BaseResponce<{ item: Todolist }>>('/todo-lists', {
      title,
    })
  },
  deleteTodolist(payload: { todolistId: string }) {
    const { todolistId } = payload
    return instance.delete<BaseResponce>(`/todo-lists/${todolistId}`)
  },
  changeTodolistTitle(payload: { todolistId: string; title: string }) {
    const { todolistId, title } = payload
    return instance.put<BaseResponce>(`/todo-lists/${todolistId}`, {
      title,
    })
  },
}

export const { useGetTodolistsQuery, useCreateTodolistMutation, useDeleteTodolistMutation, useChangeTodolistTitleMutation} = todolistApi //Экспорт автоматически сгенерированного React Hook. Правила генерации имён: use + имя эндпоинта в camelCase + Query или Mutation 
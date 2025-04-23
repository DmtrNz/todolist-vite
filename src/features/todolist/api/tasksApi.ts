import { GetTasksResponce, DomainTask, UpdateTaskModel } from './tasksApi.types'
import { BaseResponce } from '@/common/types'
import { baseApi } from '@/app/baseApi'
import { PAGE_SIZE } from '@/common/constans';



export const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<GetTasksResponce, { todolistId: string; params: { page: number } }>({
      query: ({ todolistId, params }) => ({ //Фун., возвращающая конфигурацию для HTTP-запроса
        method: 'GET', //HTTP-метод (GET-запрос)  
        url: `/todo-lists/${todolistId}/tasks`, //Эндпоинт
        params: { ...params, count: PAGE_SIZE },
      }),
      providesTags: (_res, _err, { todolistId }) => [{ type: "Tasks", id: todolistId }],
    }),

    createTask: builder.mutation<BaseResponce<{ item: DomainTask }>, { todolistId: string, title: string }>({ //
      query: ({ todolistId, title }) => ({ //Фун., возвращающая конфигурацию для HTTP-запроса
        method: 'POST', //HTTP-метод (POST-запрос) 
        url: `/todo-lists/${todolistId}/tasks`, //Эндпоинт
        body: { title } //Данные для отправки
      }),
      invalidatesTags: (_res, _err, { todolistId }) => [{ type: "Tasks", id: todolistId }], //После успешного выполнения мутации (create) инвалидирует (помечает как устаревшие) все данные с тегом 'Tasks', чтобы RTK Query автоматически перезагрузил getTasks и обновил UI.
    }),

    deleteTask: builder.mutation<BaseResponce, { todolistId: string, taskId: string }>({
      query: ({ todolistId, taskId }) => ({ //Фун., возвращающая конфигурацию для HTTP-запроса
        method: 'DELETE', //HTTP-метод (DELETE-запрос) 
        url: `/todo-lists/${todolistId}/tasks/${taskId}`, //Эндпоинт
      }),
      invalidatesTags: (_res, _err, { todolistId }) => [{ type: "Tasks", id: todolistId }],
    }),

    updateTask: builder.mutation<BaseResponce<{ item: DomainTask }>, { todolistId: string, taskId: string, newtask: UpdateTaskModel }>({
      query: ({ todolistId, taskId, newtask }) => ({ //Фун., возвращающая конфигурацию для HTTP-запроса
        method: 'PUT', //HTTP-метод (PUT-запрос) 
        url: `/todo-lists/${todolistId}/tasks/${taskId}`, //Эндпоинт
        body: newtask
      }),
      async onQueryStarted({ todolistId, taskId, newtask }, { dispatch, queryFulfilled, getState }) {
        const cachedArgsForQuery = taskApi.util.selectCachedArgsForQuery(getState(), 'getTasks')
        let patchResults: any[] = []
        cachedArgsForQuery.forEach(({ params }) => {
          patchResults.push(
            dispatch(
              taskApi.util.updateQueryData(
                'getTasks',
                { todolistId, params: { page: params.page } },
                state => {
                  const index = state.items.findIndex(task => task.id === taskId)
                  if (index !== -1) {
                    state.items[index] = { ...state.items[index], ...newtask }
                  }
                }
              )
            )
          )
        })
        try {
          await queryFulfilled
        } catch {
          patchResults.forEach(patchResult => {
            patchResult.undo()
          })
        }
      },      invalidatesTags: (_res, _err, { todolistId }) => [{ type: "Tasks", id: todolistId }],
    })
  })
})

export const { useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = taskApi
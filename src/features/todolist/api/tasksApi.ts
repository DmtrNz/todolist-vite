import { instance } from '@/common/instance'
import { GetTasksResponce, DomainTask, UpdateTaskModel } from './tasksApi.types'
import { BaseResponce } from '@/common/types'
import { baseApi } from '@/app/baseApi'
import { TasksState } from '../model/tasks-slice'

export const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<TasksState, string>({
      query: (todolistId: string) => ({ //Фун., возвращающая конфигурацию для HTTP-запроса
        method: 'GET', //HTTP-метод (GET-запрос)  
        url: `/todo-lists/${todolistId}/tasks`, //Эндпоинт
      }),
      providesTags: ['Tasks'],
    }),

    createTask: builder.mutation<BaseResponce<{ item: DomainTask }>, { todolistId: string, title: string }>({ //
      query: ({ todolistId, title }) => ({ //Фун., возвращающая конфигурацию для HTTP-запроса
        method: 'POST', //HTTP-метод (POST-запрос) 
        url: `/todo-lists/${todolistId}/tasks`, //Эндпоинт
        body: { title } //Данные для отправки
      }),
      invalidatesTags: ['Tasks'], //После успешного выполнения мутации (create) инвалидирует (помечает как устаревшие) все данные с тегом 'Tasks', чтобы RTK Query автоматически перезагрузил getTasks и обновил UI.
    }),

    deleteTask: builder.mutation<BaseResponce, { todolistId: string, taskId: string }>({
      query: ({ todolistId, taskId }) => ({ //Фун., возвращающая конфигурацию для HTTP-запроса
        method: 'DELETE', //HTTP-метод (DELETE-запрос) 
        url: `/todo-lists/${todolistId}/tasks/${taskId}`, //Эндпоинт
      }),
      invalidatesTags: ['Tasks'],
    }),

    updateTask: builder.mutation<BaseResponce<{ item: DomainTask }>, { todolistId: string, taskId: string, newtask: UpdateTaskModel }>({
      query: ({ todolistId, taskId, newtask }) => ({ //Фун., возвращающая конфигурацию для HTTP-запроса
        method: 'PUT', //HTTP-метод (PUT-запрос) 
        url: `/todo-lists/${todolistId}/tasks/${taskId}`, //Эндпоинт
        body: newtask
      }),
      invalidatesTags: ['Tasks'],
    })
  })
})

export const _tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponce>(`/todo-lists/${todolistId}/tasks`)
  },
  createTask(payload: { todolistId: string; title: string }) {
    const { todolistId, title } = payload
    return instance.post<BaseResponce<{ item: DomainTask }>>(
      `/todo-lists/${todolistId}/tasks`,
      { title },
    )
  },
  deleteTask(payload: { todolistId: string; taskId: string }) {
    const { todolistId, taskId } = payload
    return instance.delete<BaseResponce>(
      `/todo-lists/${todolistId}/tasks/${taskId}`,
    )
  },
  updateTask(task: DomainTask) {
    return instance.put<BaseResponce<{ item: DomainTask }>>(
      `/todo-lists/${task.todoListId}/tasks/${task.id}`,
      task,
    )
  },
}

export const { useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = taskApi
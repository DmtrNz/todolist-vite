import { instance } from '@/common/instance'
import { GetTasksResponce, DomainTask } from './tasksApi.types'
import { BaseResponce } from '@/common/types'

export const tasksApi = {
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

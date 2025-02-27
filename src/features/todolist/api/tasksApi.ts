import { instance } from "@/common/instance"
import { GetTasksResponce, Task, UpdateTaskModel } from "./tasksApi.types"
import { BaseResponce } from "@/common/types"

export const tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponce>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<BaseResponce<{ item: Task }>>(
            `/todo-lists/${todolistId}/tasks`,
            { title },
        )
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModel) {
        return instance.put<BaseResponce<{ item: Task }>>(
            `/todo-lists/${todolistId}/tasks/${taskId}`,
            model,
        )
    },
}

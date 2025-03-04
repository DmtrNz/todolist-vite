import { TaskPriority, TaskStatus } from '@/common/enums/enums'

export type Task = {
    description: string | null
    title: string
    completed: boolean
    status: TaskStatus
    priority: TaskPriority
    startDate: string | null
    deadline: string | null
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type GetTasksResponce = {
    items: Task[]
    totalCount: number
    error: string | null
}

export type UpdateTaskModel = {
    title: string
    description: string | null
    status: TaskStatus
    priority: TaskPriority
    startDate: string | null
    deadline: string | null
}

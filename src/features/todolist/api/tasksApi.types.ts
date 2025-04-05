import { TaskPriority, TaskStatus } from '@/common/enums/enums'
import { z } from "zod"


export const domainTaskSchema = z.object({
  description: z.string().nullable(),
  title: z.string(),
  status: z.nativeEnum(TaskStatus),
  priority: z.nativeEnum(TaskPriority),
  startDate: z.string().nullable(),
  deadline: z.string().nullable(),
  id: z.string(),
  todoListId: z.string(),
  order: z.number(),
  addedDate: z.string(),
})

export type DomainTask = z.infer<typeof domainTaskSchema>

export type GetTasksResponce = {
  items: DomainTask[]
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

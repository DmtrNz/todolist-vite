import { DomainTask, UpdateTaskModel } from "../../api/tasksApi.types";


export const createTaskModel = (task: DomainTask, domainModel: Partial<UpdateTaskModel>): UpdateTaskModel => ({
  status: task.status,
  title: task.title,
  deadline: task.deadline,
  description: task.description,
  priority: task.priority,
  startDate: task.startDate,
  ...domainModel,
})
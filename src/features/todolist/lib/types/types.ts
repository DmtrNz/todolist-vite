import { RequestStatus } from "@/common/types"
import { Todolist } from "../../api/todolistApi.types"

export type DomainTodolist = Todolist & {
  filter: FilterValues
  entityStatus: RequestStatus
}

export type FilterValues = 'all' | 'active' | 'completed'
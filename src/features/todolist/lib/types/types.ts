import { Todolist } from "../../api/todolistApi.types"

export type DomainTodolist = Todolist & {
  filter: FilterValues
}

export type FilterValues = 'all' | 'active' | 'completed'
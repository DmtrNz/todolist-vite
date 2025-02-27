import { RootState } from "@/app/store"
import { TasksState } from "./tasks-reducer"

export const selectTasks = (state: RootState): TasksState => state.tasks

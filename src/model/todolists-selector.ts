import { Todolist } from "../app/App";
import { RootState } from "../app/store";

export const selectTodolists = (state: RootState): Todolist[] => state.todolist
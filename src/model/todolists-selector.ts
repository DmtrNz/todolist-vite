
import { RootState } from "../app/store";
import { Todolist } from "./todolists-reducer";

export const selectTodolists = (state: RootState): Todolist[] => state.todolist
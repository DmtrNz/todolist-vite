import { expect, test } from "vitest"
import { TasksState, Todolist } from "../App"
import { tasksReducer } from "./tasks-reducer"
import { todolistsReducer, CreateTodolistAC } from "./todolists-reducer"

test('ids should be equals', () => {

    // 1. Стартовый state
    const startTasksState: TasksState = {}
    const startTodolistsState: Todolist[] = []

    //2. Действие
    const action = CreateTodolistAC("new todolist")
    const endTaskState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)


    const keys = Object.keys(endTaskState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id


    // 3. Проверка, что действие измененило state соответствующим образом
    expect(idFromTasks).toBe(action.payload.id)
    expect(idFromTodolists).toBe(action.payload.id)
})


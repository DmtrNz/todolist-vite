import { v1 } from 'uuid'
import { expect, test } from 'vitest'
import type { Todolist } from '../App'
import { ChangeFilterAC, ChangeTodolistTitleAC, CreateTodolistAC, DeleteTodolistAC, todolistsReducer } from './todolists-reducer'

test('correct todolist should be deleted', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    // 1. Стартовый state
    const startState: Todolist[] = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]

    // 2. Действие
    const action = DeleteTodolistAC(todolistId1)
    // {
    //     type: "DELETE-TODOLIST" as const,
    //     payload: {
    //         id: todolistId1,
    //     }
    // }
    const endState = todolistsReducer(startState, action)

    // 3. Проверка, что действие измененило state соответствующим образом
    // в массиве останется один тудулист
    expect(endState.length).toBe(1)
    // удалится нужный тудулист, не любой
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be created', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: Todolist[] = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]

    // const action = {
    //     type: "CREATE-TODOLIST" as const,
    //     payload: {
    //         id: v1(),
    //         title: "New Todolist",
    //     }
    // }
    const newTodotitle = "New Todolist"
    const endState = todolistsReducer(startState, CreateTodolistAC(newTodotitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodotitle)
})

test('correct todolist should change its title', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: Todolist[] = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]

    // const action = {
    //     type: "CHANGE-TODOLIST-TITLE" as const,
    //     payload: {
    //         id: todolistId2,
    //         title: "New Todolist",
    //     }
    // }
    const newTodotitle = "New Todolist"
    const endState = todolistsReducer(startState, ChangeTodolistTitleAC(todolistId2, "New Todolist"))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodotitle)
})

test('correct filter of todolist should be changed', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: Todolist[] = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]

    // const action = {
    //     type: "CHANGE-TODOLIST-FILTER" as const,
    //     payload: {
    //         id: todolistId2,
    //         filter: "completed",
    //     }
    // } as const
    const newFilter = "completed"
    const endState = todolistsReducer(startState, ChangeFilterAC(todolistId2,"completed"))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})
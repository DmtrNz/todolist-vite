import { beforeEach, expect, test } from 'vitest'
import { changeFilterAC, changeTodolistTitleAC, createTodolistAC, deleteTodolistAC, Todolist, todolistsReducer } from '../todolists-reducer'
import { nanoid } from '@reduxjs/toolkit'

// 1. Стартовый state
const todolistId1 = nanoid()
const todolistId2 = nanoid()
let startState: Todolist[] = []
beforeEach(() => {
    startState = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]
})

test('correct todolist should be deleted', () => {
    // 2. Действие
    const action = deleteTodolistAC({todolistId: todolistId1})
    const endState = todolistsReducer(startState, action)

    // 3. Проверка, что действие измененило state соответствующим образом
    // в массиве останется один тудулист
    expect(endState.length).toBe(1)
    // удалится нужный тудулист, не любой
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be created', () => {
    //2. Действие
    const newTodotitle = "New Todolist"
    const endState = todolistsReducer(startState, createTodolistAC(newTodotitle))

    // 3. Проверка, что действие измененило state соответствующим образом
    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodotitle)
})

test('correct todolist should change its title', () => {
    // 2. Действие
    const newTodotitle = "New Todolist"
    const endState = todolistsReducer(startState, changeTodolistTitleAC({todolistId: todolistId2, title: "New Todolist"}))

    // 3. Проверка, что действие измененило state соответствующим образом
    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodotitle)
})

test('correct filter of todolist should be changed', () => {
    // 2. Действие
    const newFilter = "completed"
    const endState = todolistsReducer(startState, changeFilterAC({todolistId: todolistId2,filter: "completed"}))

    // 3. Проверка, что действие измененило state соответствующим образом
    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})

import { beforeEach, expect, test } from "vitest"
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    createTaskAC,
    deleteTaskAC,
    tasksReducer,
    TasksState,
} from "../tasks-reducer"
import { createTodolistAC, deleteTodolistAC } from "../todolists-reducer"

// 1. Стартовый state
let startState: TasksState = {}
beforeEach(() => {
    startState = {
        todolistId1: [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false },
        ],
        todolistId2: [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false },
        ],
    }
})

test("correct task should be added to correct array", () => {
    // 2. Действие
    const endState = tasksReducer(
        startState,
        createTaskAC({ title: "juce", todolistId: "todolistId2" }),
    )

    // 3. Проверка, что действие измененило state соответствующим образом
    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId2"].length).toBe(4)
    expect(endState["todolistId1"][0].id).toBeDefined()
    expect(endState["todolistId2"][0].title).toBe("juce")
    expect(endState["todolistId1"][0].isDone).toBe(false)
})

test("correct task should be deleted from correct array", () => {
    //2. Действие
    const endState = tasksReducer(
        startState,
        deleteTaskAC({ id: "2", todolistId: "todolistId2" }),
    )

    // 3. Проверка, что действие измененило state соответствующим образом
    expect(endState).toEqual({
        todolistId1: [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false },
        ],
        todolistId2: [
            { id: "1", title: "bread", isDone: false },
            { id: "3", title: "tea", isDone: false },
        ],
    })
})

test("correct task should be shange correct status", () => {
    //2. Действие
    const endState = tasksReducer(
        startState,
        changeTaskStatusAC({
            id: "1",
            todolistId: "todolistId1",
            isDone: true,
        }),
    )

    // 3. Проверка, что действие измененило state соответствующим образом
    expect(endState["todolistId2"][0].isDone).toBe(false)
    expect(endState["todolistId1"][0].isDone).toBe(true)
})

test("correct task should be shange correct title", () => {
    //2. Действие
    const endState = tasksReducer(
        startState,
        changeTaskTitleAC({ todolistId: "todolistId1", id: "2", title: "TS" }),
    )

    // 3. Проверка, что действие измененило state соответствующим образом
    expect(endState["todolistId1"][1].title).toBe("TS")
})

test("array with empty tasks should be added with new todolist", () => {
    //2. Действие
    const endState = tasksReducer(startState, createTodolistAC("new todolist"))

    const keys = Object.keys(endState)
    const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2")
    if (!newKey) {
        throw Error("new key should be added")
    }

    // 3. Проверка, что действие измененило state соответствующим образом
    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test("property with todolist should be deleted", () => {
    //2. Действие
    const action = deleteTodolistAC({ todolistId: "todolistId2" })
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)

    // 3. Проверка, что действие измененило state соответствующим образом
    expect(keys.length).toBe(1)
    expect(endState["todolistId2"]).not.toBeDefined()
    expect(endState["todolistId2"]).toBeUndefined()
})

import { v1 } from "uuid";
import { Task, TasksState } from "../App";
import { CreateTodolistAT, DeleteTodolistAT } from "./todolists-reducer";

type CreateTaskAT = ReturnType<typeof CreateTaskAC>//определяет тип данных, которая возвращает функция CreateTaskAC
type DeleteTaskAT = ReturnType<typeof DeleteTaskAC>
type ChangeTaskStatusAT = ReturnType<typeof ChangeTaskStatusAC>
type ChangeTaskTitleAT = ReturnType<typeof ChangeTaskTitleAC>


type ActionType = CreateTaskAT | DeleteTaskAT | ChangeTaskStatusAT | ChangeTaskTitleAT | CreateTodolistAT | DeleteTodolistAT

export const tasksReducer = (tasks: TasksState, action: ActionType): TasksState => {
    switch (action.type) {
        case "CREATE-TASK": {
            const {title, todolistId} = action.paylad
            const newTask: Task = { 
                id: v1(), 
                title: title,
                isDone: false
            }
            return { ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] }
        }
        case "DELETE TASK": {
            const {id, todolistId} = action.payload
            return { ...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== id) }
        }
        case "CHANGE-TASK-STATUS": {
            const {id, todolistId, isDone} = action.payload
            return { ...tasks, [todolistId]: tasks[todolistId].map(task => task.id == id ? { ...task, isDone } : task) }
        }
        case "CHANGE-TASK-TITLE":{
            const {todolistId, id, title} = action.payload
            return { ...tasks, [todolistId]: tasks[todolistId].map(task => task.id === id ? { ...task, title } : task) }
        }
        case "CREATE-TODOLIST":{
            const {id} = action.payload
            return { ...tasks, [id]: [] }
        }
        case "DELETE-TODOLIST": {
            const { id } = action.payload
            delete tasks[id]
            return {...tasks}
        }

        default:
            return tasks
    }
}

export const CreateTaskAC = (paylad: {title: string, todolistId: string}) => {
    return({
        type: "CREATE-TASK",
        paylad
    } as const)
} //сперва определили action creater затем определили action type через typeof

export const DeleteTaskAC = (payload: {id: string, todolistId: string}) => {
    return({
        type: "DELETE TASK",
        payload
    } as const)
}
export const ChangeTaskStatusAC = (payload: {id: string, todolistId: string, isDone: boolean}) => {
    return({
        type: "CHANGE-TASK-STATUS",
        payload
    } as const)
}
export const ChangeTaskTitleAC = (payload: {todolistId: string, id: string, title: string}) => {
    return({
        type: "CHANGE-TASK-TITLE",
        payload
    } as const)
}

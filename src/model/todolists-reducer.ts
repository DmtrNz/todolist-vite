import { FilterValues, Todolist } from "../App";

export type DeleteTodolistAT = {
    type: "DELETE-TODOLIST",
    payload: {
        id: string,
    }
}

export type CreateTodolistAT = {
    type: "CREATE-TODOLIST",
    payload: {
        title: string,
        id: string
    }
}

export type ChangeTodolistTitleAT = {
    type: "CHANGE-TODOLIST-TITLE",
    payload: {
        id: string,
        title: string
    }
}

export type ChangeFilterAT = {
    type: "CHANGE-TODOLIST-FILTER",
    payload: {
        id: string,
        filter: FilterValues
    }
}

type ActionType = DeleteTodolistAT | CreateTodolistAT | ChangeTodolistTitleAT | ChangeFilterAT

export const todolistsReducer = (todolists: Array<Todolist>, action: ActionType): Array<Todolist> => {
    switch (action.type) {
        case "DELETE-TODOLIST": 
            return todolists.filter(todolist => todolist.id !== action.payload.id);
        case "CREATE-TODOLIST": 
            const newTodolist: Todolist = { 
                id: action.payload.id, 
                title: action.payload.title, 
                filter: 'all' 
            }
            return [...todolists, newTodolist]
        case "CHANGE-TODOLIST-TITLE":
            return todolists.map(todolist => todolist.id === action.payload.id ? { 
                ...todolist, 
                title: action.payload.title } : todolist)
        case "CHANGE-TODOLIST-FILTER":
            return todolists.map(todolist => todolist.id === action.payload.id ? { ...todolist, filter: action.payload.filter } : todolist)

            default:
            return todolists
    }
}

export const DeleteTodolistAC = (id: string):DeleteTodolistAT => {
    return ({
        type: "DELETE-TODOLIST",
        payload: {
            id
        }
    })
}

export const CreateTodolistAC = (id: string, title: string):CreateTodolistAT => {
    return ({
        type: "CREATE-TODOLIST",
        payload: {
            id,
            title
        }
    })
}

export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleAT =>{
    return({
        type: "CHANGE-TODOLIST-TITLE",
        payload: {
            id,
            title
        }
    })
}

export const ChangeFilterAC = (id: string, filter: FilterValues): ChangeFilterAT  =>{
    return({
        type: "CHANGE-TODOLIST-FILTER",
        payload: {
            id,
            filter
        }
    })
}


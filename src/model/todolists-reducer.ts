import { Todolist } from "../App";

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
export const todolistsReducer = (todolists: Array<Todolist>, action: DeleteTodolistAT | CreateTodolistAT): Array<Todolist> => {
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

            default:
            return todolists
    }
}



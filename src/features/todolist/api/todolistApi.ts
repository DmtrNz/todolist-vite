import { instance } from '@/common/instance'
import { Todolist } from './todolistApi.types'
import { BaseResponce } from '@/common/types'

export const todolistApi = {
    getTodolists() {
        return instance.get<Todolist[]>('/todo-lists')
    },
    createTodolist(payload: { title: string}) {
        const { title } = payload
        return instance.post<BaseResponce<{ item: Todolist }>>('/todo-lists', {
            title,
        })
    },
    deleteTodolist(payload: { todolistId: string}) {
        const { todolistId } = payload
        return instance.delete<BaseResponce>(`/todo-lists/${todolistId}`)
    },
    changeTodolistTitle(payload: { todolistId: string; title: string }) {
        const { todolistId, title } = payload
        return instance.put<BaseResponce>(`/todo-lists/${todolistId}`, { title })
    },
}

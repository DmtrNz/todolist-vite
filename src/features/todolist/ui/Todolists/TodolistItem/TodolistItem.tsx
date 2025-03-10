import { TodolistTitle } from './TodolistTitle/TodolistTitle'
import { CreateItemForm } from '@/common/components/CreateItemForm/CreateItemForm'
import { Tasks } from './Tasks/Tasks'
import { FilterButtons } from './FilterButtons/FilterButtons'
import { useAppDispatch } from '@/common/hooks'
import { DomainTodolist } from '@/features/todolist/model/todolists-slice'
import { createTask } from '@/features/todolist/model/tasks-slice'

type Props = {
    todolist: DomainTodolist
}

export const TodolistItem = (props: Props) => {
    const { id } = props.todolist

    const dispatch = useAppDispatch()

    //tasks
    const createTaskHandler = (title: string) => {
        dispatch(createTask({ title, todolistId: id }))
    }

    return (
        <div>
            <TodolistTitle todolist={props.todolist} />
            <CreateItemForm onCreateItem={createTaskHandler} />
            <Tasks todolist={props.todolist} />
            <FilterButtons todolist={props.todolist} />
        </div>
    )
}

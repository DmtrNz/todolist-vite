import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { createTaskAC } from "@/features/todolist/model/tasks-reducer"
import { Todolist } from "@/features/todolist/model/todolists-reducer"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm"
import { Tasks } from "./Tasks/Tasks"
import { FilterButtons } from "./FilterButtons/FilterButtons"

type Props = {
  todolist: Todolist
}

export const TodolistItem = (props: Props) => {
  const {id} = props.todolist

  const dispatch = useAppDispatch()

  //tasks
  const createTask = (title: string) => {
    dispatch(createTaskAC({ title, todolistId: id }))
  }

  return (
    <div>
      <TodolistTitle todolist={props.todolist}/>
      <CreateItemForm onCreateItem={createTask} />
      <Tasks todolist={props.todolist}/>
      <FilterButtons todolist={props.todolist}/>
    </div>
  )
}

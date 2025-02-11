import { CreateItemForm } from './CreateItemForm'
import { Todolist } from './model/todolists-reducer'
import { useAppDispatch } from './common/hooks/useAppDispatch'
import {createTaskAC } from './model/tasks-reducer'
import { TodolistTitle } from './TodolistTitle'
import { Tasks } from './Tasks'
import { FilterButtons } from './FilterButtons'

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

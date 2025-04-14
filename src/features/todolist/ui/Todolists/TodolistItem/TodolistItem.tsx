import { TodolistTitle } from './TodolistTitle/TodolistTitle'
import { CreateItemForm } from '@/common/components/CreateItemForm/CreateItemForm'
import { Tasks } from './Tasks/Tasks'
import { FilterButtons } from './FilterButtons/FilterButtons'
import { DomainTodolist } from '@/features/todolist/model/todolists-slice'
import { useCreateTaskMutation } from '@/features/todolist/api/tasksApi'

type Props = {
  todolist: DomainTodolist
}

export const TodolistItem = (props: Props) => {
  const { id } = props.todolist

  const [ createTask ] = useCreateTaskMutation()

  //tasks
  const createTaskHandler = (title: string) => {
    createTask({ title, todolistId: id })
  }

  return (
    <div>
      <TodolistTitle todolist={props.todolist} />
      <CreateItemForm
        onCreateItem={createTaskHandler}
        disabled={props.todolist.entityStatus === 'loading'}
      />
      <Tasks todolist={props.todolist} />
      <FilterButtons todolist={props.todolist} />
    </div>
  )
}

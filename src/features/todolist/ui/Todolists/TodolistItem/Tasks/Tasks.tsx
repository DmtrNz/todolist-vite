import { List } from '@mui/material'
import { TaskItem } from './TaskItem/TaskItem'
import { TaskStatus } from '@/common/enums/enums'
import { useGetTasksQuery } from '@/features/todolist/api/tasksApi'
import { TasksSkeleton } from './ TasksSkeleton/TasksSkeleton'
import { DomainTodolist } from '@/features/todolist/lib/types/types'

type Props = {
  todolist: DomainTodolist
}

export const Tasks = (props: Props) => {
  const { id, filter } = props.todolist

  const { data, isLoading } = useGetTasksQuery(id)

  let filteredTasks = data?.items
  if (filter === "active") {
    filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.New)
  }
  if (filter === "completed") {
    filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.Completed)
  }

  if (isLoading) {
    return <TasksSkeleton />
  }

  return (
    <>
      {filteredTasks?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {filteredTasks?.map((task) => {
            return (
              <TaskItem key={task.id} todolist={props.todolist} task={task} />
            )
          })}
        </List>
      )}
    </>
  )
}

import { List } from '@mui/material'
import { TaskItem } from './TaskItem/TaskItem'
import { useAppDispatch, useAppSelector } from '@/common/hooks'
import { selectTasks, setTasks } from '@/features/todolist/model/tasks-slice'
import { DomainTodolist } from '@/features/todolist/model/todolists-slice'
import { useEffect } from 'react'
import { TaskStatus } from '@/common/enums/enums'

type Props = {
  todolist: DomainTodolist
}

export const Tasks = (props: Props) => {
  const { id, filter } = props.todolist

  const tasks = useAppSelector(selectTasks)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setTasks(id))
  }, [])

  const todolistTasks = tasks[id]
  let filteredTasks = todolistTasks
  if (filter === 'active') {
    filteredTasks = todolistTasks.filter(
      (task) => task.status === TaskStatus.New,
    )
  }
  if (filter === 'completed') {
    filteredTasks = todolistTasks.filter(
      (task) => task.status === TaskStatus.Completed,
    )
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

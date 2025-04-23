import { List } from '@mui/material'
import { TaskItem } from './TaskItem/TaskItem'
import { TaskStatus } from '@/common/enums/enums'
import { useGetTasksQuery } from '@/features/todolist/api/tasksApi'
import { TasksSkeleton } from './ TasksSkeleton/TasksSkeleton'
import { DomainTodolist } from '@/features/todolist/lib/types/types'
import { useState, useEffect } from 'react'
import { TasksPagination } from './TasksPagination/TasksPagination'
import { PAGE_SIZE } from '@/common/constans'

type Props = {
  todolist: DomainTodolist
}

export const Tasks = (props: Props) => {
  const { id, filter } = props.todolist
  const [page, setPage] = useState(1)
  const { data, isLoading } = useGetTasksQuery({ todolistId: id, params: { page } }, { refetchOnFocus: true })

  let filteredTasks = data?.items

  if (filter === "active") {
    filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.New)
  }

  if (filter === "completed") {
    filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.Completed)
  }

  const totalPages = Math.ceil((data?.totalCount || 0) / PAGE_SIZE); 

  useEffect(() => {
    if (page > 1 && page > totalPages) {
      setPage(1)
    }
  }, [totalPages, page])

  if (isLoading) {
    return <TasksSkeleton />
  }

  const showPagination = (data?.totalCount || 0) >= 5

  return (
    <>
      {filteredTasks?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <>
          <List>
            {filteredTasks?.map(task => 
              <TaskItem key={task.id} task={task} todolist={props.todolist} />
            )}
          </List>
          {showPagination && (
            <TasksPagination 
              totalCount={data?.totalCount || 0}  page={page} setPage={setPage} 
            />
          )}
        </>
      )}
    </>
  )
}

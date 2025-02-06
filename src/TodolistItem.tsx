import type { ChangeEvent } from 'react'
import type { FilterValues, Task, Todolist } from './app/App'
import { CreateItemForm } from './CreateItemForm'
import { EditableSpan } from './EditableSpan'
import { Box, Button, Checkbox, IconButton, List, ListItem, ListItemIcon, Typography } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { containerSx, getListItemSx } from './TodolistItesm.styles'

type Props = {
  todolist: Todolist
  tasks: Task[]
  deleteTask: (todolistId: string, taskId: string) => void
  changeFilter: (todolistId: string, filter: FilterValues) => void
  createTask: (todolistId: string, title: string) => void
  changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
  deleteTodolist: (todolistId: string) => void
  changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
  changeTodolistTitle: (todolistId: string, title: string) => void
}

export const TodolistItem = (props: Props) => {
  const {
    todolist: { id, title, filter },
    tasks,
    deleteTask,
    changeFilter,
    createTask,
    changeTaskStatus,
    deleteTodolist,
    changeTaskTitle,
    changeTodolistTitle,
  } = props

  const changeFilterHandler = (filter: FilterValues) => {
    changeFilter(id, filter)
  }

  const deleteTodolistHandler = () => {
    deleteTodolist(id)
  }

  const changeTodolistTitleHandler = (title: string) => {
    changeTodolistTitle(id, title)
  }

  const createTaskHandler = (title: string) => {
    createTask(id, title)
  }

  return (
    <div>
      <div className={'container'}>
          <Typography variant='h5' align={"center"} sx={{fontWeight:700}}>
            <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
          </Typography>
          <IconButton aria-label="delete" onClick={deleteTodolistHandler} color={"primary"}>
            <DeleteForeverIcon />
          </IconButton>
      </div>
      <CreateItemForm onCreateItem={createTaskHandler} />
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {tasks.map(task => {
            const deleteTaskHandler = () => {
              deleteTask(id, task.id)
            }

            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
              const newStatusValue = e.currentTarget.checked
              changeTaskStatus(id, task.id, newStatusValue)
            }

            const changeTaskTitleHandler = (title: string) => {
              changeTaskTitle(id, task.id, title)
            }

            return (
              <ListItem 
                key={task.id} 
                className={task.isDone ? 'is-done' : ''}
                disablePadding 
                divider
                secondaryAction={
                  <IconButton
                    onClick={deleteTaskHandler}
                    color={"primary"}>
                    <DeleteForeverIcon />
                  </IconButton>
                }
              >
                <ListItemIcon>
                  <Checkbox
                    checked={task.isDone}
                    onChange={changeTaskStatusHandler}
                    size="small"
                  />
                </ListItemIcon>

                <Box sx={getListItemSx(task.isDone)}>
                  <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
                </Box>
              </ListItem>
            )
          })}
        </List>
      )}
      <div>
        <Box sx={containerSx}>
          <Button color={filter === 'all' ? 'secondary' : 'primary'}
            variant="contained"
            onClick={() => changeFilterHandler('all')}>
            All
          </Button>
          <Button color={filter === 'active' ? 'secondary' : 'primary'}
            variant="contained"
            onClick={() => changeFilterHandler('active')}>
            Active
          </Button>
          <Button color={filter === 'completed' ? 'secondary' : 'primary'}
            variant="contained"
            onClick={() => changeFilterHandler('completed')}>
            Completed
          </Button>
        </Box>
      </div>
    </div>
  )
}

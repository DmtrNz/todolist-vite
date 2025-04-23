import { DomainTodolist } from '@/features/todolist/lib/types/types'
import { TextField } from '@mui/material'
import { type ChangeEvent, useState } from 'react'

type Props = {
  value: string
  onChange: (title: string) => void
  todolist: DomainTodolist
}

export const EditableSpan = ({ value, onChange }: Props) => {
  const [title, setTitle] = useState(value)
  const [isEditMode, setIsEditMode] = useState(false)

  const turnOnEditMode = () => {
    setIsEditMode(true)
  }

  const turnOffEditMode = () => {
    setIsEditMode(false)
    onChange(title)
  }

  const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }

  return (
    <>
      {isEditMode ? (
        <TextField
          variant='standard'
          value={title}
          onChange={changeTitle}
          onBlur={turnOffEditMode}
          autoFocus
        />
      ) : (
        <span onDoubleClick={turnOnEditMode}>{value}</span>
      )}
    </>
  )
}

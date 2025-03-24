import { Button, TextField } from '@mui/material'
import { type ChangeEvent, type KeyboardEvent, useState } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

type Props = {
  onCreateItem: (title: string) => void
  disabled?: boolean
}

export const CreateItemForm = ({ onCreateItem, disabled }: Props) => {
  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  const createItemHandler = () => {
    const trimmedTitle = title.trim()
    if (trimmedTitle !== '') {
      onCreateItem(trimmedTitle)
      setTitle('')
    } else {
      setError('Title is required')
    }
  }

  const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
    setError(null)
  }

  const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      createItemHandler()
    }
  }

  return (
    <div>
      <TextField
        className={error ? 'error' : ''}
        error={!!error}
        helperText={error}
        size='small'
        variant='outlined'
        value={title}
        onChange={changeTitleHandler}
        onKeyDown={createItemOnEnterHandler}
        disabled={disabled}
      />
      <Button
        disableElevation
        variant='contained'
        onClick={createItemHandler}
        disabled={disabled}
        endIcon={<AddCircleOutlineIcon />}
      >
        add
      </Button>
    </div>
  )
}

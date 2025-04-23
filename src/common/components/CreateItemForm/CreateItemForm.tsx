import { Button, TextField } from '@mui/material'
import { type ChangeEvent, type KeyboardEvent, useState } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

type Props = {
  onCreateItem: (title: string) => void
}

export const CreateItemForm = ({ onCreateItem }: Props) => {
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
      />
      <Button
        disableElevation
        variant='contained'
        onClick={createItemHandler}
        endIcon={<AddCircleOutlineIcon />}
      >
        add
      </Button>
    </div>
  )
}

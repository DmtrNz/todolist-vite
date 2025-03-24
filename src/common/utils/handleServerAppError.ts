import { setError, setStatus } from '@/app/app-slice'
import type { Dispatch } from '@reduxjs/toolkit'
import { BaseResponce } from '../types'

//<BaseResponce<{ item: Todolist; }>
//tasks <BaseResponce<{ item: DomainTask; }>

export const handleServerAppError = <T>(
  data: BaseResponce<T>,
  dispatch: Dispatch,
) => {
  dispatch(setStatus({ status: 'failed' }))
  const error = data.messages.length ? data.messages[0] : 'Some error occurred'
  dispatch(setError({ error }))
}

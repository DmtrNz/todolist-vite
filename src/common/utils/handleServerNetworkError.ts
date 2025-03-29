import { setError, setStatus } from '@/app/app-slice'
import type { Dispatch } from '@reduxjs/toolkit'
import axios from 'axios'

export const handleServerNetworkError = (
  error: any,
  dispatch: Dispatch,
) => {
  console.table(error.issue)
  let errorMessage
  if (axios.isAxiosError(error)) {
    errorMessage = error.message
  } else if (error instanceof Error) {
    errorMessage = error.message
  } else {
    errorMessage = JSON.stringify(error)
  }

  dispatch(setError({ error: errorMessage }))
  dispatch(setStatus({ status: 'failed' }))
}
/*
if (axios.isAxiosError(error)): Проверяет, является ли ошибка (error) специфической ошибкой axios (например, ошибка сетевого запроса). Если да, то извлекает сообщение об ошибке из свойства error.message. 
else if (error instanceof Error): Проверяет, является ли ошибка стандартным объектом Error (например, ошибка JavaScript). Если да, то также извлекает сообщение из свойства error.message. else: Если ошибка не является ни ошибкой axios, ни стандартной ошибкой Error, то она преобразуется в строку с помощью JSON.stringify. Это нужно для обработки случаев, когда ошибка имеет нестандартный формат (например, это объект или примитив). Итог: Этот код гарантирует, что сообщение об ошибке будет извлечено или преобразовано в строку, независимо от типа ошибки, что делает обработку ошибок более универсальной и безопасной.
15, 16 строк вполне достаточно, строки кода 6-13 написаны для удовлетворения типизации и ухода от типа any
*/

export type FieldError = {
  error: string
  field: string
}

export type BaseResponce<T = {}> = {
  data: T
  fieldsErrors: FieldError[]
  messages: string[]
  resultCode: number
}

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

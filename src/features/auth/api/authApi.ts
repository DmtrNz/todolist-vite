import { instance } from '@/common/instance'
import { BaseResponce } from '@/common/types'
import { Inputs } from '../lib/schemas'
import { LoginResponce, MeResponce } from './authApi.types'

export const authApi = {
  login(payload: Inputs) {
    return instance.post<BaseResponce<LoginResponce>>("auth/login", payload)
  },
  logout() {
    return instance.delete<BaseResponce>("auth/login")
  },
  me() {
    return instance.get<BaseResponce<MeResponce>>("auth/me")
  }
}


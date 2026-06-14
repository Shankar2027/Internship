import apiClient from './client'
import type { TokenResponse, User } from '@/types'

export const authApi = {
  register: async (email: string, full_name: string, password: string) => {
    const { data } = await apiClient.post<User>('/auth/register', { email, full_name, password })
    return data
  },

  // FIXED: Using standard form login to match your verified backend /api/auth/login route
  login: async (email: string, password: string): Promise<TokenResponse> => {
    const formData = new URLSearchParams()
    formData.append('username', email) // OAuth2PasswordRequestForm expects 'username'
    formData.append('password', password)

    const { data } = await apiClient.post<TokenResponse>('/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    return data
  },

  me: async (): Promise<User> => {
    const { data } = await apiClient.get<User>('/auth/me')
    return data
  },

  forgotPassword: async (email: string) => {
    const { data } = await apiClient.post('/auth/forgot-password', { email })
    return data
  },

  verifyOtp: async (email: string, otp: string, new_password: string) => {
    const { data } = await apiClient.post('/auth/verify-otp', { email, otp, new_password })
    return data
  },

  // FIXED: Added confirm_password to match your Pydantic ChangePasswordSchema
  changePassword: async (current_password: string, new_password: string, confirm_password: string) => {
    const { data } = await apiClient.post('/auth/change-password', { 
      current_password, 
      new_password, 
      confirm_password 
    })
    return data
  },
}
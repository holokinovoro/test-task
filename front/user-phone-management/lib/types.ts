export interface User {
  id: number
  name: string
  email: string
  dateOfBirth: string
}

export interface Phone {
  id: number
  phoneNumber: string
  userId: number
  userName?: string
}

export interface CreateUserDto {
  name: string
  email: string
  dateOfBirth: string 
}

export interface UpdateUserDto {
  id: number
  name: string
  email: string
  dateOfBirth: string
}

export interface CreatePhoneDto {
  phoneNumber: string
  userId: number
}

export interface UpdatePhoneDto {
  id: number
  phoneNumber: string
  userId: number
}

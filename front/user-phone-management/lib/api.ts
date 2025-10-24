import type { User, Phone, CreateUserDto, UpdateUserDto, CreatePhoneDto, UpdatePhoneDto } from "./types"

// Замените на URL вашего ASP.NET бэкенда
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api"

// Users API
export const usersApi = {
  getAll: async (): Promise<User[]> => {
    const response = await fetch(`${API_BASE_URL}/users`)
    if (!response.ok) throw new Error("Failed to fetch users")
    return response.json()
  },

  getById: async (id: number): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`)
    if (!response.ok) throw new Error("Failed to fetch user")
    return response.json()
  },

  create: async (data: CreateUserDto): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to create user")
    return response.json()
  },

  update: async (data: UpdateUserDto): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users/${data.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to update user")
    return response.json()
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("Failed to delete user")
  },
}

// Phones API
export const phonesApi = {
  getAll: async (): Promise<Phone[]> => {
    const response = await fetch(`${API_BASE_URL}/phones`)
    if (!response.ok) throw new Error("Failed to fetch phones")
    return response.json()
  },

  getById: async (id: number): Promise<Phone> => {
    const response = await fetch(`${API_BASE_URL}/phones/${id}`)
    if (!response.ok) throw new Error("Failed to fetch phone")
    return response.json()
  },

  getByUserId: async (userId: number): Promise<Phone[]> => {
    const response = await fetch(`${API_BASE_URL}/phones/user/${userId}`)
    if (!response.ok) throw new Error("Failed to fetch user phones")
    return response.json()
  },

  create: async (data: CreatePhoneDto): Promise<Phone> => {
    const response = await fetch(`${API_BASE_URL}/phones`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to create phone")
    return response.json()
  },

  update: async (data: UpdatePhoneDto): Promise<Phone> => {
    const response = await fetch(`${API_BASE_URL}/phones/${data.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to update phone")
    return response.json()
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/phones/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("Failed to delete phone")
  },
}

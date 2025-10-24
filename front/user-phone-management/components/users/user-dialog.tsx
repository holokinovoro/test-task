"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { User, CreateUserDto, UpdateUserDto } from "@/lib/types"

interface UserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user?: User | null
  onSave: (data: CreateUserDto | UpdateUserDto) => Promise<void>
}

export function UserDialog({ open, onOpenChange, user, onSave }: UserDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dateOfBirth: "",
  })
  const [loading, setLoading] = useState(false)
  const [emailError, setEmailError] = useState("")

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        dateOfBirth: user.dateOfBirth.split("T")[0],
      })
    } else {
      setFormData({
        name: "",
        email: "",
        dateOfBirth: "",
      })
    }
    setEmailError("")
  }, [user, open])

  const validateEmail = (email: string): boolean => {
    if (!email) {
      setEmailError("Email обязателен")
      return false
    }

    // Check for valid email format with proper domain (e.g., user@example.com)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/

    if (!emailRegex.test(email)) {
      setEmailError("Введите корректный email (например, user@example.com)")
      return false
    }

    setEmailError("")
    return true
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value
    setFormData({ ...formData, email: newEmail })

    if (newEmail) {
      validateEmail(newEmail)
    } else {
      setEmailError("")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateEmail(formData.email)) {
      return
    }

    setLoading(true)
    try {
      if (user) {
        await onSave({ ...formData, id: user.id })
      } else {
        await onSave(formData)
      }
      onOpenChange(false)
    } catch (error) {
      console.error("Error saving user:", error)
    } finally {
      setLoading(false)
    }
  }

  const isFormValid = formData.name && formData.email && formData.dateOfBirth && !emailError

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{user ? "Редактировать пользователя" : "Добавить пользователя"}</DialogTitle>
            <DialogDescription>
              {user ? "Измените данные пользователя" : "Введите данные нового пользователя"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Имя</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleEmailChange}
                className={emailError ? "border-red-500" : ""}
                required
              />
              {emailError && <p className="text-sm text-red-500">{emailError}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dateOfBirth">Дата рождения</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              Отмена
            </Button>
            <Button type="submit" disabled={loading || !isFormValid}>
              {loading ? "Сохранение..." : "Сохранить"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

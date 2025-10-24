"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Plus, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserTable } from "@/components/users/user-table"
import { UserDialog } from "@/components/users/user-dialog"
import { usersApi } from "@/lib/api"
import type { User, CreateUserDto, UpdateUserDto } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const { toast } = useToast()

  const loadUsers = async () => {
    try {
      setLoading(true)
      const data = await usersApi.getAll()
      setUsers(data)
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить пользователей",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const handleSave = async (data: CreateUserDto | UpdateUserDto) => {
    try {
      if ("id" in data) {
        await usersApi.update(data)
        toast({
          title: "Успешно",
          description: "Пользователь обновлен",
        })
      } else {
        await usersApi.create(data)
        toast({
          title: "Успешно",
          description: "Пользователь создан",
        })
      }
      await loadUsers()
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить пользователя",
        variant: "destructive",
      })
      throw error
    }
  }

  const handleEdit = (user: User) => {
    setSelectedUser(user)
    setDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Вы уверены, что хотите удалить этого пользователя?")) return

    try {
      await usersApi.delete(id)
      toast({
        title: "Успешно",
        description: "Пользователь удален",
      })
      await loadUsers()
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить пользователя",
        variant: "destructive",
      })
    }
  }

  const handleAddNew = () => {
    setSelectedUser(null)
    setDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Пользователи</h1>
              <p className="text-muted-foreground mt-1">Управление пользователями системы</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Список пользователей</CardTitle>
                <CardDescription>Просмотр и управление всеми пользователями</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={loadUsers} disabled={loading}>
                  <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                </Button>
                <Button onClick={handleAddNew}>
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить пользователя
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">Загрузка...</div>
            ) : (
              <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
            )}
          </CardContent>
        </Card>
      </main>

      <UserDialog open={dialogOpen} onOpenChange={setDialogOpen} user={selectedUser} onSave={handleSave} />
    </div>
  )
}

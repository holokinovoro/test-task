"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Plus, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PhoneTable } from "@/components/phones/phone-table"
import { PhoneDialog } from "@/components/phones/phone-dialog"
import { phonesApi, usersApi } from "@/lib/api"
import type { Phone, User, CreatePhoneDto, UpdatePhoneDto } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"

export default function PhonesPage() {
  const [phones, setPhones] = useState<Phone[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedPhone, setSelectedPhone] = useState<Phone | null>(null)
  const { toast } = useToast()

  const loadData = async () => {
    try {
      setLoading(true)
      const [phonesData, usersData] = await Promise.all([phonesApi.getAll(), usersApi.getAll()])

      // Добавляем имена пользователей к телефонам
      const phonesWithUserNames = phonesData.map((phone) => ({
        ...phone,
        userName: usersData.find((u) => u.id === phone.userId)?.name,
      }))

      setPhones(phonesWithUserNames)
      setUsers(usersData)
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить данные",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleSave = async (data: CreatePhoneDto | UpdatePhoneDto) => {
    try {
      if ("id" in data) {
        await phonesApi.update(data)
        toast({
          title: "Успешно",
          description: "Телефон обновлен",
        })
      } else {
        await phonesApi.create(data)
        toast({
          title: "Успешно",
          description: "Телефон создан",
        })
      }
      await loadData()
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить телефон",
        variant: "destructive",
      })
      throw error
    }
  }

  const handleEdit = (phone: Phone) => {
    setSelectedPhone(phone)
    setDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Вы уверены, что хотите удалить этот телефон?")) return

    try {
      await phonesApi.delete(id)
      toast({
        title: "Успешно",
        description: "Телефон удален",
      })
      await loadData()
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить телефон",
        variant: "destructive",
      })
    }
  }

  const handleAddNew = () => {
    setSelectedPhone(null)
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
              <h1 className="text-3xl font-bold text-foreground">Телефоны</h1>
              <p className="text-muted-foreground mt-1">Управление номерами телефонов</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Список телефонов</CardTitle>
                <CardDescription>Просмотр и управление всеми телефонами</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={loadData} disabled={loading}>
                  <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                </Button>
                <Button onClick={handleAddNew}>
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить телефон
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">Загрузка...</div>
            ) : (
              <PhoneTable phones={phones} onEdit={handleEdit} onDelete={handleDelete} />
            )}
          </CardContent>
        </Card>
      </main>

      <PhoneDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        phone={selectedPhone}
        users={users}
        onSave={handleSave}
      />
    </div>
  )
}

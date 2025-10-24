import Link from "next/link"
import { Users, Phone } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-foreground">Система управления</h1>
          <p className="text-muted-foreground mt-2">Управление пользователями и телефонами</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          <Link href="/users" className="group">
            <Card className="transition-all hover:shadow-lg hover:border-primary">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Users className="w-8 h-8" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Пользователи</CardTitle>
                    <CardDescription className="mt-1">Управление пользователями системы</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Просмотр, добавление, редактирование и удаление пользователей
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/phones" className="group">
            <Card className="transition-all hover:shadow-lg hover:border-accent">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    <Phone className="w-8 h-8" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Телефоны</CardTitle>
                    <CardDescription className="mt-1">Управление номерами телефонов</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Просмотр, добавление, редактирование и удаление телефонов
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  )
}

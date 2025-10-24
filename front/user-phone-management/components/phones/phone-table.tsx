"use client"

import { Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Phone } from "@/lib/types"

interface PhoneTableProps {
  phones: Phone[]
  onEdit: (phone: Phone) => void
  onDelete: (id: number) => void
}

export function PhoneTable({ phones, onEdit, onDelete }: PhoneTableProps) {
  return (
    <div className="rounded-md border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Номер телефона</TableHead>
            <TableHead>Пользователь</TableHead>
            <TableHead className="text-right">Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {phones.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                Нет телефонов
              </TableCell>
            </TableRow>
          ) : (
            phones.map((phone) => (
              <TableRow key={phone.id}>
                <TableCell className="font-medium">{phone.id}</TableCell>
                <TableCell>{phone.phoneNumber}</TableCell>
                <TableCell>{phone.userName || `User #${phone.userId}`}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(phone)}
                      className="hover:bg-accent/10 hover:text-accent"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(phone.id)}
                      className="hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

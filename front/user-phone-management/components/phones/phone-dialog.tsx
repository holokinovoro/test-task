"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Phone, CreatePhoneDto, UpdatePhoneDto, User } from "@/lib/types";

interface PhoneDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  phone?: Phone | null;
  users: User[];
  onSave: (data: CreatePhoneDto | UpdatePhoneDto) => Promise<void>;
}

export function PhoneDialog({ open, onOpenChange, phone, users, onSave }: PhoneDialogProps) {
  // userId держим как строку для Select
  const [userId, setUserId] = useState<string>("");
  // в rawKgDigits храним ТОЛЬКО 9 цифр после кода страны 996
  const [rawKgDigits, setRawKgDigits] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  // При открытии диалога/смене записи — заполняем поля
  useEffect(() => {
    if (phone) {
      // извлечём цифры из phone.phoneNumber, оставим последние 9 после 996
      const digits = (phone.phoneNumber ?? "").replace(/\D/g, "");
      const after996 = digits.startsWith("996") ? digits.slice(3) : digits;
      setRawKgDigits(after996.slice(0, 9));
      setUserId(String(phone.userId ?? ""));
    } else {
      setRawKgDigits("");
      setUserId("");
    }
    setPhoneError("");
  }, [phone, open]);

  // Форматирование для отображения: +996(AAA) BB-CC-DD
  const formatKg = (nine: string) => {
    const a = nine.slice(0, 3);
    const b = nine.slice(3, 5);
    const c = nine.slice(5, 7);
    const d = nine.slice(7, 9);

    let out = "+996";
    if (a) out += `(${a}`;
    if (a.length === 3) out += `)`;
    if (b) out += ` ${b}`;
    if (c) out += `-${c}`;
    if (d) out += `-${d}`;
    return out;
  };

  // Обработчик ввода: берём только цифры, режем до 9, показываем маску
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, ""); // все цифры
    // Если пользователь вводит "996...", то отбрасываем код, иначе считаем, что вводит последние 9
    const after996 = digits.startsWith("996") ? digits.slice(3) : digits;
    const next = after996.slice(0, 9);
    setRawKgDigits(next);

    if (next.length === 0) setPhoneError("Номер телефона обязателен");
    else if (next.length < 9) setPhoneError("Формат: +996(999) 99-99-99");
    else setPhoneError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rawKgDigits.length !== 9) {
      setPhoneError("Введите полный номер в формате +996(999) 99-99-99");
      return;
    }
    if (!userId) {
      // базовая проверка на всякий
      return;
    }

    setLoading(true);
    try {
      // Нормализованный номер для бэка (E.164): +996XXXXXXXXX
      const normalized = `+996${rawKgDigits}`;
      const payload = {
        phoneNumber: normalized,
        userId: Number.parseInt(userId, 10),
      };

      if (phone) {
        await onSave({ ...payload, id: phone.id } as UpdatePhoneDto);
      } else {
        await onSave(payload as CreatePhoneDto);
      }
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving phone:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{phone ? "Редактировать телефон" : "Добавить телефон"}</DialogTitle>
            <DialogDescription>
              {phone ? "Измените данные телефона" : "Введите данные нового телефона"}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Поле телефона */}
            <div className="grid gap-2">
              <Label htmlFor="phoneNumber">Номер телефона</Label>
              <Input
                id="phoneNumber"
                inputMode="tel"
                value={formatKg(rawKgDigits)}
                onChange={handlePhoneChange}
                placeholder="+996(999) 99-99-99"
                required
                className={phoneError ? "border-red-500" : ""}
              />
              {phoneError && <p className="text-sm text-red-500">{phoneError}</p>}
            </div>

            {/* Пользователь */}
            <div className="grid gap-2">
              <Label htmlFor="userId">Пользователь</Label>
              <Select value={userId} onValueChange={setUserId} required>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите пользователя" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((u) => (
                    <SelectItem key={u.id} value={String(u.id)}>
                      {u.name} ({u.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              Отмена
            </Button>
            <Button type="submit" disabled={loading || !!phoneError}>
              {loading ? "Сохранение..." : "Сохранить"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

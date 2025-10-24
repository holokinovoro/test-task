# 📱 User Phone Management

Тестовое **full-stack приложение** для управления пользователями и их телефонами.  
Стек технологий: **Next.js (React)** + **ASP.NET Core Web API** + **PostgreSQL** + **Nginx**,  
всё разворачивается через **Docker Compose**.

---

## 🚀 Быстрый запуск

### 🔧 Требования
Перед запуском убедись, что установлено:
- [Docker Desktop](https://www.docker.com/)
- [Git](https://git-scm.com/)

---

### 🐳 Запуск через Docker

1. **Клонируйте репозиторий:**
   ```bash
   git clone https://github.com/<твое_имя>/user-phone-management.git
   cd user-phone-management
2. **Запустите через docker-compose**
  docker compose up --build
3. После сборки открой в браузере:
👉 http://localhost:8080

Что работает:

/ — фронтенд (Next.js)

/api — бэкенд (ASP.NET API)

PostgreSQL разворачивается автоматически

Nginx проксирует трафик между сервисами

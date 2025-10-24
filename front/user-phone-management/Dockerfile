# user-phone-management/Dockerfile

# ---------- deps + build ----------
FROM node:20-alpine AS deps
WORKDIR /app

# Активируем именно pnpm 9 (совместим с lockfileVersion '9.0')
ARG PNPM_VERSION=9.12.3
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

# Копируем только манифесты для кэшируемой установки
COPY package.json pnpm-lock.yaml ./

# Детеминированная установка (использует твой pnpm-lock.yaml)
RUN pnpm --version && pnpm install --frozen-lockfile

# Теперь весь исходник и сборка
COPY . .
# (опционально) если хочешь standalone-режим Next:
# ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

# ---------- run ----------
FROM node:20-alpine
WORKDIR /app

# тот же pnpm на рантайме (для pnpm start)
ARG PNPM_VERSION=9.12.3
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
EXPOSE 3000

COPY --from=deps /app ./

# Next.js 16: стартуем prod-сервер
CMD ["pnpm", "start"]

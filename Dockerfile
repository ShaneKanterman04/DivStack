FROM node:20-alpine AS base
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

RUN npm run db:generate

EXPOSE 3000

CMD ["sh", "-c", "npm run db:migrate && npm run db:seed && npm run dev -- --hostname 0.0.0.0"]

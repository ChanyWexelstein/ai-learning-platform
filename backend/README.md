# AI Learning Platform - Backend

Mini MVP backend built with Node.js, Express, TypeScript, and Prisma.

## Features
- JWT Authentication (Register/Login)
- Category & SubCategory selection
- Prompt to OpenAI and response storage
- Swagger API Documentation
- Docker-ready

## Getting Started
1. Copy `.env.example` to `.env` and fill in real values.
2. Run: `docker-compose up -d`
3. Run migrations: `npx prisma migrate dev --name init`
4. Start the server: `npm run dev`
5. Swagger Docs at: `http://localhost:3000/docs`

## Scripts
- `npm run dev` — start in development
- `npm run build` — build for production
- `npm test` — run tests

# AI Learning Platform - Mini MVP

[GitHub Repository](https://github.com/ChanyWexelstein/ai-learning-platform)

This repository contains a full-stack implementation of a mini AI-driven learning platform. The platform allows users to register, choose a learning topic by category and sub-category, submit a prompt to an AI engine, and receive a generated lesson. The platform also includes an admin dashboard for managing users and reviewing their learning history.

## Overview

The system is composed of a TypeScript-based Node.js backend with PostgreSQL and Prisma ORM, an OpenAI integration layer, and a React + TypeScript frontend. Docker is used to simplify local development and database setup.

## Technologies Used

- Backend: Node.js, Express, TypeScript
- Frontend: React, TypeScript
- Database: PostgreSQL with Prisma ORM
- AI Integration: OpenAI GPT API
- Tools: Docker, dotenv, Swagger, Git

## Features

### User Dashboard

- User registration
- Selection of category and sub-category
- Prompt submission to the AI
- Display of generated response
- Viewing of personal prompt history

### Admin Dashboard

- Viewing all registered users
- Viewing prompts submitted by each user

## Project Structure

```
ai-learning-platform/
├── backend/
│   ├── dist/
│   ├── prisma/
│   ├── src/
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
├── .env
├── .gitignore
├── docker-compose.yml
├── package.json
└── README.md
```

## Setup Instructions

### Prerequisites

- Docker & Docker Compose
- Node.js (if running outside Docker)
- An OpenAI API key

### Environment Setup

1. Copy the environment file:

   ```bash
   cp backend/.env.example backend/.env
   ```

2. Add your OpenAI API key to the `.env` file.

### Running with Docker

1. Navigate to the root project directory:

   ```bash
   cd ai-learning-platform-complete
   ```

2. Run:

   ```bash
   docker-compose up --build
   ```

   This will start both the PostgreSQL database and the backend server.

### Running Frontend Separately

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend app:

   ```bash
   npm run dev
   ```

## API Documentation

API routes are documented using Swagger and available at:

```
http://localhost:3000/api-docs
```

## Admin Access

To access the admin dashboard, log in with the following credentials:

- **Username:** `admin`
- **Password:** `123456.`

> The admin user is created during development using a manual database seed.

## Assumptions and Notes

- User authentication is implemented using JWT.
- The default admin user (`admin / 123456.`) is seeded manually into the database.
- No automated unit or integration tests are included; test coverage can be added in future iterations.
- The application currently does not include pagination or filtering features.
- The prompt-to-lesson interaction is based on real-time communication with the OpenAI API.

## Notes

The application architecture is modular, scalable, and structured according to industry best practices. All models follow normalized relational structure and were implemented with clear separation of concerns. The backend can easily be extended to support authentication, tests, or deployment.

## License

This project was developed as part of a technical assessment and is for demonstration and educational purposes only.
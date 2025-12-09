# Task Manager

## Frontend
- Vite + React + TypeScript
- Запуск: `npm install` и `npm run dev -- --host --port 5173`

## Backend (Node.js + Express)
- Папка `backend/`
- Запуск: `npm install` в `backend/`, затем `npm run dev`
- Порт по умолчанию: 5000 (файл `.env` в `backend/` с `PORT=5000`)

## Docker
- `docker compose up --build`
- Сервисы: `web` (5173), `backend` (5000)

## REST API
- Проекты:
  - GET `/api/projects`
  - GET `/api/projects/:id`
  - POST `/api/projects` (body: `{ name, description? }`)
  - PUT `/api/projects/:id`
  - DELETE `/api/projects/:id`
- Задачи:
  - GET `/api/tasks` (`?projectId=` для фильтра)
  - GET `/api/tasks/:id`
  - POST `/api/tasks` (body: `{ title, description?, status, projectId, assignee? }`)
  - PUT `/api/tasks/:id`
  - DELETE `/api/tasks/:id`

## Postman примеры
1) Получить проекты  
   GET `http://localhost:5000/api/projects`
2) Создать проект  
   POST `http://localhost:5000/api/projects`  
   Body (JSON): `{"name":"Demo","description":"New project"}`
3) Получить задачи проекта  
   GET `http://localhost:5000/api/tasks?projectId=p1`
4) Создать задачу  
   POST `http://localhost:5000/api/tasks`  
   Body (JSON): `{"title":"New task","projectId":"p1","status":"todo","description":"desc","assignee":"Ирина"}`


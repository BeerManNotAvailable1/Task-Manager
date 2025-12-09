# TaskFlow Manager

## Технологии
- **Frontend**: Vite + React + TypeScript
- **Backend**: Node.js + Express + MongoDB (Mongoose)
- **База данных**: MongoDB (локально в Docker)
- **Аутентификация**: JWT

## Быстрый старт

### Docker (рекомендуется)
```bash
docker compose up --build
```
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- MongoDB: localhost:27017

### Локальный запуск

#### Backend
```bash
cd backend
npm install
# Создайте .env файл (см. backend/.env.example)
npm run dev
```

#### Frontend
```bash
npm install
npm run dev -- --host --port 5173
```

## Настройка окружения

### Backend (.env)
```env
MONGODB_URI=mongodb://mongodb:27017/taskmanager
PORT=5000
UPLOAD_DIR=./uploads
JWT_SECRET=your_secret_key_here
```

## REST API

### Аутентификация
- `POST /api/auth/register` - Регистрация
  ```json
  { "email": "user@example.com", "password": "password123" }
  ```
- `POST /api/auth/login` - Вход
  ```json
  { "email": "user@example.com", "password": "password123" }
  ```
- `GET /api/auth/profile` - Профиль (требует JWT токен)

**Все остальные роуты требуют JWT токен в заголовке:**
```
Authorization: Bearer <token>
```

### Проекты
- `GET /api/projects` - Список проектов
- `GET /api/projects/:id` - Проект по ID
- `POST /api/projects` - Создать проект
  ```json
  { "name": "Название", "description": "Описание" }
  ```
- `PUT /api/projects/:id` - Обновить проект
- `DELETE /api/projects/:id` - Удалить проект

### Задачи
- `GET /api/tasks?projectId=xxx` - Список задач (с фильтром по проекту)
- `GET /api/tasks/:id` - Задача по ID
- `POST /api/tasks` - Создать задачу
  ```json
  {
    "title": "Название",
    "description": "Описание",
    "status": "todo",
    "projectId": "xxx",
    "assigneeName": "Имя исполнителя",
    "attachments": ["/uploads/file.pdf"]
  }
  ```
- `PUT /api/tasks/:id` - Обновить задачу
- `DELETE /api/tasks/:id` - Удалить задачу

### Загрузка файлов
- `POST /api/upload` - Загрузить файл (multipart/form-data, поле `file`)
  - Возвращает: `{ "url": "/uploads/filename.ext" }`

## Postman примеры

1. **Регистрация**
   ```
   POST http://localhost:5000/api/auth/register
   Body: { "email": "test@test.com", "password": "123456" }
   ```

2. **Вход**
   ```
   POST http://localhost:5000/api/auth/login
   Body: { "email": "test@test.com", "password": "123456" }
   Response: { "token": "...", "user": {...} }
   ```

3. **Создать проект** (с токеном)
   ```
   POST http://localhost:5000/api/projects
   Headers: Authorization: Bearer <token>
   Body: { "name": "Мой проект", "description": "Описание" }
   ```

4. **Создать задачу**
   ```
   POST http://localhost:5000/api/tasks
   Headers: Authorization: Bearer <token>
   Body: {
     "title": "Новая задача",
     "projectId": "xxx",
     "status": "todo",
     "assigneeName": "Иван"
   }
   ```

5. **Загрузить файл**
   ```
   POST http://localhost:5000/api/upload
   Headers: Authorization: Bearer <token>
   Body: form-data, поле "file"
   ```

## Структура проекта

```
├── backend/
│   ├── controllers/    # Контроллеры (auth, projects, tasks)
│   ├── models/         # Mongoose модели
│   ├── middleware/     # JWT auth, upload
│   ├── uploads/        # Загруженные файлы
│   ├── app.js          # Главный файл сервера
│   └── db.js           # Подключение к MongoDB
├── src/
│   ├── api/            # API клиенты
│   ├── components/     # React компоненты
│   ├── context/        # Context API (проекты, задачи)
│   ├── pages/          # Страницы приложения
│   └── types/          # TypeScript типы
└── docker-compose.yml  # Docker конфигурация
```


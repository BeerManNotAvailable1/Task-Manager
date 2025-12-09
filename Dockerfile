FROM node:20-alpine AS base
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --frozen-lockfile || npm install

COPY . .

RUN npm run build

EXPOSE 5173
CMD ["npm", "run", "preview"]


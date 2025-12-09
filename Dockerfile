FROM node:20-alpine AS base
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --frozen-lockfile || npm install
RUN npm install --save-dev @types/node @types/react @types/react-dom

COPY . .

RUN npm run build

EXPOSE 5173
CMD ["npm", "run", "preview"]


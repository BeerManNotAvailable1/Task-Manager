FROM node:20-alpine AS base
WORKDIR /app

ARG VITE_API_URL=http://localhost:5000
ENV VITE_API_URL=$VITE_API_URL

COPY package.json package-lock.json* ./
RUN npm install --frozen-lockfile || npm install
RUN npm install --save-dev @types/node @types/react @types/react-dom

COPY . .

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "--port", "5173"]


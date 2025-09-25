# ---- Build ----
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Configurar la URL del backend para el build
ENV VITE_API_URL=https://api.elbuenamigosouvenir.site/api/

RUN npm run build

# ---- Runtime ----
FROM caddy:2-alpine
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /usr/share/caddy

# Debug: Verificar que los archivos se copiaron
RUN ls -la /usr/share/caddy/

EXPOSE 80

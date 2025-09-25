# ---- Build Stage ----
FROM node:20-alpine AS build

# Configurar directorio de trabajo
WORKDIR /app

# Instalar dependencias primero (para mejor caching)
COPY package*.json ./
RUN npm ci --only=production

# Copiar código fuente
COPY . .

# Configurar variable de entorno para el build
ENV VITE_API_URL=https://api.elbuenamigosouvenir.site/api/

# Ejecutar build con debugging
RUN echo "🔧 Iniciando build..." && \
    npm run build && \
    echo "✅ Build completado, verificando archivos:" && \
    ls -la dist/ && \
    echo "📄 Contenido de dist/:" && \
    find dist/ -type f -name "*.html" -o -name "*.js" -o -name "*.css"

# ---- Runtime Stage ----
FROM caddy:2-alpine

# Copiar configuración de Caddy
COPY Caddyfile /etc/caddy/Caddyfile

# Copiar archivos del build
COPY --from=build /app/dist /usr/share/caddy

# Verificar que los archivos están en su lugar
RUN echo "🔍 Verificando archivos copiados:" && \
    ls -la /usr/share/caddy/ && \
    echo "📁 Contenido completo:" && \
    find /usr/share/caddy -type f

# Exponer puerto
EXPOSE 80

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/healthz || exit 1

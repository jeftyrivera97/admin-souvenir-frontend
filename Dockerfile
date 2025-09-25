# Usa Node.js 18 como imagen base
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia package.json y package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias
RUN npm ci --only=production

# Copia el resto de los archivos del proyecto
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Usa nginx para servir los archivos estáticos
FROM nginx:alpine

# Copia los archivos construidos al directorio de nginx
COPY --from=0 /app/dist /usr/share/nginx/html

# Copia la configuración personalizada de nginx (opcional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expone el puerto 80
EXPOSE 80

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"]
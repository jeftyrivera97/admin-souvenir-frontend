# ---------- Build ----------
FROM node:20-alpine AS build
WORKDIR /app

# Instala deps (incluye devDependencies para poder compilar)
COPY package*.json ./
RUN npm ci

# Copia el código y compila a /dist
COPY . .
# Si necesitas variables de build, expórtalas como VITE_* en Dokploy
# (p.ej. VITE_API_URL)
RUN npm run build

# ---------- Runtime ----------
FROM nginx:1.27-alpine

# Elimina el default y coloca tu conf
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia el build de Vite
COPY --from=build /app/dist /usr/share/nginx/html

# Puerto que expone Nginx
EXPOSE 80

# Mantén Nginx en foreground
CMD ["nginx", "-g", "daemon off;"]

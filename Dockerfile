# Stage 1: build
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: serve using Nginx
FROM nginx:1.25-alpine
COPY --from=build /app/dist /usr/share/nginx/html
# Optional: custom Nginx config (if you use React Router)
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]

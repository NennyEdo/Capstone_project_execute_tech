# Stage 1 — build 
FROM node:20-alpine AS build 
WORKDIR /app 
COPY frontend/package*.json ./
RUN npm ci 
COPY frontend/ . 
ARG REACT_APP_API_URL 
ENV REACT_APP_API_URL=$REACT_APP_API_URL 
RUN npm run build 
  
# Stage 2 — serve 
FROM nginx:alpine 
COPY --from=build /app/build /usr/share/nginx/html 
COPY nginx.conf /etc/nginx/conf.d/default.conf 
EXPOSE 80 
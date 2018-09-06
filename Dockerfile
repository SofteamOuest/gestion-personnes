# Dockerfile (tag: v3)
FROM nginx:1.15.3-alpine

COPY config/nginx.conf /etc/nginx/nginx.conf

WORKDIR /gestion-personnes-vue
COPY dist /gestion-personnes-vue/

EXPOSE 8080

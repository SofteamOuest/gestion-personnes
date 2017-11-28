# Dockerfile (tag: v3)
FROM nginx

COPY config/nginx.conf /etc/nginx/nginx.conf

WORKDIR /gestion-personnes-vue
COPY dist /gestion-personnes-vue/

EXPOSE 8080

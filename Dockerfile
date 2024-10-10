FROM node:16 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build
FROM nginx:alpine
COPY --from=build /app/dist .
COPY --from=build /app/default.conf.template /etc/nginx/conf.d/
EXPOSE 80
CMD ["sh", "-c", "envsubst '${API_HOST}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
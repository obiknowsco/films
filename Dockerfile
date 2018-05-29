FROM node:8.9-alpine as builder
WORKDIR /app
COPY package.json .
RUN yarn install
COPY . .
RUN npm run build

FROM nginx
COPY --from=builder /app/dist /usr/share/nginx/html

FROM node:lts-bullseye as build

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

ARG VITE_FIREBASE_TOKEN
ENV VITE_FIREBASE_TOKEN=${VITE_FIREBASE_TOKEN}

ARG VITE_SOCKET_URL
ENV VITE_SOCKET_URL=${VITE_SOCKET_URL}

WORKDIR /app

COPY package*.json ./
RUN npm ci 

COPY . .
RUN npm run build

### stage 2
FROM nginx:alpine
ADD ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /var/www/app
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
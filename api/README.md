# INICIALIZAR TYPESCRIPT
npx tsc --init

# construir un docher 
docker build --no-cahce . -t my-servicie-initial

# comando para recompilar la imagen de docker compose 
docker-compose up app-dev --build

# para levantar desarrollo
docker-compose up app-dev --build

# para levantar la base de datos
docker-compose up db --build


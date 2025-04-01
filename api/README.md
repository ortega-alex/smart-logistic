# INICIALIZAR TYPESCRIPT
npx tsc --init

# construir un docher 
docker build --no-cahce . -t my-servicie-initial

# comando para recompilar la imagen de docker compose 
docker-compose up app --build

# para levantar desarrollo
docker-compose up app-dev --build

# para levantar la base de datos
docker-compose up db --build

## migraciones
### nueva migracion
```bash
npx typeorm-ts-node-commonjs migration:generate src/migrations/[NAME] -d ./src/db.ts
```

### sincronizar migraciones
```bash
npx typeorm-ts-node-commonjs migration:run -d ./src/db.ts
```

### revertir migracion
```bash
npx typeorm-ts-node-commonjs migration:revert -d ./src/db.ts
```

### crear nueva entidad
```bash
npx typeorm entity:create src/entities/[NAME]
```
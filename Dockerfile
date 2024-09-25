# FROM node:18-alpine3.16 AS base
FROM node:20-alpine3.16 AS base

ENV DIR /app
WORKDIR $DIR

# development
FROM base AS dev
ARG NPM_TOKEN

ENV NODE_ENV=development

COPY api/package*.json $DIR

RUN echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > $DIR/.npmrc && \
    npm install && \
    rm -f .npmrc

COPY api/tsconfig*.json $DIR
COPY api/src $DIR/src

EXPOSE 4000
CMD ["npm", "run", "dev" ]

# production
FROM base AS build
ARG NPM_TOKEN

RUN apk update && apk add --no-cache dumb-init

COPY api/package*.json $DIR

RUN echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > $DIR/.npmrc && \
    npm install && \
    rm -f .npmrc

COPY api/tsconfig*.json $DIR
COPY api/src $DIR/src

RUN npm run build  && \
    npm prune --production

FROM base AS production
ENV USER node

COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
COPY --from=build $DIR/node_modules $DIR/node_modules
COPY --from=build $DIR/dist $DIR/dist
COPY --from=build $DIR/src/public $DIR/dist/public

# Aquí agregamos permisos de escritura para el usuario node
RUN chown -R node:node /app/dist/public && chmod -R 755 /app/dist/public

ENV NODE_ENV=produccion
EXPOSE 4001
USER $USER

CMD ["dumb-init", "node", "dist/index.js" ]

FROM nikolaik/python-nodejs:python3.11-nodejs16-bullseye
#Agregar el patch
RUN export PKG_CONFIG_PATH=/usr/lib/x86_64-linux-gnu/pkgconfig:$PKG_CONFIG_PATH
#instalar librerias
RUN apt-get update && apt-get install -y pkg-config node-gyp libcairo2-dev libjpeg-dev libpango1.0-dev libgif-dev build-essential g++ && \
#Reinstalar Pangocairo
RUN sudo apt reinstall pangocairo


#RUN apt-get update && \
    #apt-get install -y pangocairo pkg-config node-gyp libcairo2-dev libjpeg-dev libpango1.0-dev libgif-dev build-essential g++ && \
    #apt-get clean && \
    #rm -rf /var/lib/apt/lists/*



# Crear el usuario 'node' y establecer el directorio de trabajo
RUN useradd -ms /bin/bash node

# From here on we use the least-privileged `node` user to run the backend.
USER node
WORKDIR /app

## This switches many Node.js dependencies to production mode.
ENV NODE_ENV production

# Set NODE_OPTIONS to increase memory limit
ENV NODE_OPTIONS=--max_old_space_size=16384

# Copy repo skeleton first, to avoid unnecessary docker cache invalidation.
# The skeleton contains the package.json of each package in the monorepo,
# and along with yarn.lock and the root package.json, that's enough to run yarn install.
COPY --chown=node:node yarn.lock package.json packages/backend/dist/skeleton.tar.gz ./
RUN tar xzf skeleton.tar.gz && rm skeleton.tar.gz
#Añadir la librería pangocairo
RUN apt-get install pangocairo
#Actualizar el paquete node-gyp
RUN npm install node-gyp@latest

#Limpiar el caché de node-gyp
RUN rm -rf ~/.cache/node-gyp

#Instalar el paquete canvas con la opción --build-from-source
RUN npm install canvas --build-from-source

RUN yarn install --frozen-lockfile --production --network-timeout 300000 && rm -rf "$(yarn cache dir)"

# Then copy the rest of the backend bundle, along with any other files we might want.
COPY --chown=node:node packages/backend/dist/bundle.tar.gz app-config*.yaml ./
RUN tar xzf bundle.tar.gz && rm bundle.tar.gz

# Copy the catalogs
COPY --chown=node:node catalog-neoris/ ./catalog-neoris/

CMD ["node", "packages/backend", "--config", "app-config.yaml", "--config", "app-config.production.yaml"]

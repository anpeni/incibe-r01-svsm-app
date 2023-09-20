FROM nikolaik/python-nodejs:python3.11-nodejs16-bullseye

#Añadir desde github pango para poder instalar la libreria
RUN git clone https://github.com/pango/pango.git

RUN patch -p1 < /path/to/patch

RUN cd pango && ./configure && make && make install
#RUN apt-get update && \
#    apt-get install -y pkg-config libcairo2-dev libjpeg-dev libpango1.0-dev libgif-dev build-essential g++ && \
#    apt-get clean && \
#    rm -rf /var/lib/apt/lists/*

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



RUN yarn install --frozen-lockfile --production --network-timeout 300000 && rm -rf "$(yarn cache dir)"

# Then copy the rest of the backend bundle, along with any other files we might want.
COPY --chown=node:node packages/backend/dist/bundle.tar.gz app-config*.yaml ./
RUN tar xzf bundle.tar.gz && rm bundle.tar.gz

# Copy the catalogs
COPY --chown=node:node catalog-neoris/ ./catalog-neoris/

CMD ["node", "packages/backend", "--config", "app-config.yaml", "--config", "app-config.production.yaml"]

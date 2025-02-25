# Docker Commands and Explanations

### Image Caching

Docker commands involving images are generally cached, making them faster.

### Docker Run

-   **docker run**: Starts a container using the provided image. If the image doesn't exist locally, it fetches from the cloud.

-   **docker pull**: Pulls an image locally without starting a container. It first checks locally, then in the cloud.

-   **docker images** / **docker image ls**: Lists all images.

-   **docker ps**: Lists running containers. Add `-a` to list all containers.

### Docker Run Options:

-   **docker run -p 5173:5173**: Port mapping (for Vite, remember to use `--host`). The first parameter is the local port, the second is the container's port.

-   **docker run -d**: Runs the container in the background.

-   **docker run --name**: Assigns a name to the container.

-   **docker run --rm**: Removes the container after it stops.

-   **docker run nginx:1.27**: Specifies the version of the image by using a tag.

-   **docker run nginx@sha256**: Uses the image with the specified sha256 hash.

-   **docker run -e DEF=456**: Sets environment variables.

-   **docker run -c "command"**: Executes a script or command inside the container.

-   **docker run -v mydata:/data**: Binds a volume or path. If the first argument is a name, it's a volume; if it's a path, it's a bind mount. Adding `:ro` makes it read-only.

### Other Useful Docker Commands:

-   **docker container prune**: Removes stopped containers.

-   **docker image ls --digests**: Lists images along with their sha256 digests.

-   **docker logs <container-name>**: Displays logs from a container.

-   **docker exec -it <container-name>**: Runs commands in an interactive terminal (e.g., for bash access). `-it` stands for interactive.

### Docker Build:

-   **docker build**: Builds an image from a Dockerfile.

- **docker build -f**: Specifies a Dockerfile by name or path. Useful when the Dockerfile isn't named "Dockerfile" or is located elsewhere (e.g., `docker build -f /path/to/MyDockerfile`).
  - ** docker build -t ** tag ismi

docker start: start a stopped container
docker stop: stop a running container

```docker
FROM node:20-alpine

RUN addgroup app && adduser -S -G app app

USER app

WORKDIR /app

COPY package*.json ./

USER root

RUN chown -R app:app .

USER app

RUN npm install

COPY . .

EXPOSE 5173

CMD npm run dev
# for vite use --host in the package.json
```

### Nextjs projesi içinde polling eklenmeli

webpackDevMiddleware: (config) => {
config.watchOptions = {
poll: 1000,
aggregateTimeout: 300,
};
return config;
},

### vite projesi içinde

server: {
watch: {
usePolling: true,
},
},

# Sample Dockerfile

```docker
FROM node:20-alpine

ENV MONGODB_URI=
ENV PUBLIC_URL=http://localhost:3000/

RUN addgroup app && adduser -S -G app app
USER app

WORKDIR /app

COPY package*.json ./
COPY next.config.ts ./
COPY tsconfig.json ./
COPY postcss.config.mjs ./
COPY tailwind.config.ts ./
COPY .eslintrc.json ./

USER root
RUN chown -R app:app .
USER app

RUN npm install

COPY . .

EXPOSE 5173

CMD npm run dev
```

docker build -t tagismi .
docker run -p 3000:3000 -v "$(pwd):/app" -v /app/node_modules/ imageismi

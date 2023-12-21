


# PowerGymTDD

Documentación Dockerfile

# Instrucciones para ejecutar una aplicación Ionic Angular en Docker

Este archivo `readme.md` proporciona instrucciones paso a paso sobre cómo construir y ejecutar una aplicación Ionic Angular en un contenedor Docker utilizando el repositorio de ejemplo [PowerGymM](https://github.com/BenjaminMartinezJeldres/PowerGymM).

## Prerrequisitos

Antes de comenzar, asegúrate de tener lo siguiente instalado en tu sistema:

- [Docker](https://docs.docker.com/get-docker/)


### 1. Clona el repositorio PowerGymTDD

Abre una terminal y clona el repositorio de ejemplo desde GitHub utilizando el siguiente comando:
git clone https://github.com/BenjaminMartinezJeldres/PowerGymTDD.git



### 2. Crear un archivo Dockerfile en el proyecto con los siguientes datos

# Usa la imagen base de Node.js 14
FROM node:latest

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de la aplicación en el contenedor
COPY . .

# Instala las dependencias de la aplicación
RUN npm install

# Construye la aplicación de Angular
RUN npm run build

# Instala el servidor HTTP de Node.js
RUN npm install -g http-server

# Expone el puerto 8080 para el servidor HTTP
EXPOSE 8080

# Inicia el servidor HTTP cuando el contenedor se inicie
CMD [ "http-server", "-p", "8080", "www" ]



### 3. Comandos Construcción Docker

docker build -t <nombre-de-la-imagen> .
docker run –name <nombre-de-la-imagen> -p 8080:8080 <nombre-de-la-imagen>

*Ejemplo : docker run --name prueba-docker -p 8080:8080 prueba-docker





```bash



PS C:\Users\genar\Desktop\PowerGymTDD> docker images
REPOSITORY      TAG       IMAGE ID       CREATED       SIZE
prueba-docker   latest    77b1c61ec417   3 hours ago   2.14GB
PS C:\Users\genar\Desktop\PowerGymTDD> docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
PS C:\Users\genar\Desktop\PowerGymTDD> docker ps -a
CONTAINER ID   IMAGE           COMMAND                  CREATED              STATUS                      PORTS     NAMES
356e15b7d0ef   prueba-docker   "docker-entrypoint.s…"   About a minute ago   Exited (0) 34 seconds ago             prueba-docker
PS C:\Users\genar\Desktop\PowerGymTDD> docker start 356e15b7d0ef
356e15b7d0ef
PS C:\Users\genar\Desktop\PowerGymTDD>

---------------------------------------------------------------------------------------------------

# Usa la imagen base de Debian 11.6
FROM debian:11.6

# Instala curl y otras herramientas básicas
RUN apt-get update && \
    apt-get install -y curl

WORKDIR /usr/src/app

# Configura el entorno para NVM
ENV NVM_DIR /usr/src/app
ENV NODE_VERSION 20.10.0

# Descarga e instala NVM, y activa NVM y Node.js
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash && \
    . $NVM_DIR/nvm.sh && \
    nvm install $NODE_VERSION && \
    nvm alias default $NODE_VERSION && \
    nvm use default

# Copia los archivos de la aplicación en el contenedor
COPY . .

# Instala npm y las dependencias de la aplicación
RUN . $NVM_DIR/nvm.sh && \
    nvm use default && \
    apt-get install -y npm && \
    npm install

# Construye la aplicación de Angular
RUN . $NVM_DIR/nvm.sh && \
    nvm use default && \
    npm run build

# Instala el servidor HTTP de Node.js
RUN npm install -g http-server

# Expone el puerto 8080 para el servidor HTTP
EXPOSE 8080

# Inicia el servidor HTTP cuando el contenedor se inicie
CMD [ "http-server", "-p", "8080", "www" ]
docker build -t ionic .
docker run --name ionic -p 8080:8080 ionic










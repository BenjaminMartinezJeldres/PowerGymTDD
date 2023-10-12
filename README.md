


# PowerGymTDD

Documentación Dockerfile

# Instrucciones para ejecutar una aplicación Ionic Angular en Docker

Este archivo `readme.md` proporciona instrucciones paso a paso sobre cómo construir y ejecutar una aplicación Ionic Angular en un contenedor Docker utilizando el repositorio de ejemplo [PowerGymM](https://github.com/BenjaminMartinezJeldres/PowerGymM).

## Prerrequisitos

Antes de comenzar, asegúrate de tener lo siguiente instalado en tu sistema:

- [Docker](https://docs.docker.com/get-docker/)


### 1. Clona el repositorio PowerGymTDD

Abre una terminal y clona el repositorio de ejemplo desde GitHub utilizando el siguiente comando:

```bash
git clone https://github.com/BenjaminMartinezJeldres/PowerGymTDD.git



docker build -t <nombre-de-la-imagen> .
docker run –name <nombre-de-la-imagen> -p 8080:8080 <nombre-de-la-imagen>
Ejemplo : docker run --name prueba-docker -p 8080:8080 prueba-docker



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





















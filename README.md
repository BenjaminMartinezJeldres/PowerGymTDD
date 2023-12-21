


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

Documentación Instalación en Servidor DEbian 11-06

# Instrucciones para ejecutar una aplicación Ionic Angular en Docker

Este archivo `readme.md` proporciona instrucciones paso a paso sobre cómo construir y ejecutar una aplicación Ionic Angular en un contenedor Docker utilizando el repositorio de ejemplo [PowerGymM](https://github.com/BenjaminMartinezJeldres/PowerGymM).

## Prerrequisitos

Antes de comenzar, asegúrate de actualizar paquetes:

sdup apt-get update
sudo apt-get upgrade

Instalar Curl: Primero, instala curl si aún no está instalado.

sudo apt-get install -y curl

- [Docker](https://docs.docker.com/get-docker/)

Instalar NVM (Node Version Manager)

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

Activar NVM: Cierra y vuelve a abrir la terminal o ejecuta este comando para usar NVM en la misma sesión.

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"


Instalar Node.js: 20.10.0

nvm install 20.10.0

node -v
npm -v

Clona el repositorio PowerGymTDD

git clone https://github.com/BenjaminMartinezJeldres/PowerGymTDD.git

Ve hacia el directorio donde del repositorio que clonaste

cd "nombre_repositorio"

Instalar Dependencias

npm install

Construir la Aplicación: 

npm run build

Instalar Servidor HTTP

npm install -g http-server

Iniciar el Servidor utilizando la aplicación construida

http-server -p 8080 www

Ahora puedes acceder a tu aplicación Angular desde cualquier navegador web ingresando la dirección IP de tu servidor seguido del puerto configurado (por ejemplo, http://[tu_ip_del_servidor]:80).

Instalar Dependencias: Instala las dependencias de tu proyecto usando npm.











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
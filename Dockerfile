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
	@@ -20,4 +39,6 @@ RUN npm install -g http-server
EXPOSE 8080

# Inicia el servidor HTTP cuando el contenedor se inicie
CMD [ "http-server", "-p", "8080", "www" ]
docker build -t ionic .
docker run --name ionic -p 8080:8080 ionic

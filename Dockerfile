# Imagen de Playwright con navegadores ya instalados
FROM mcr.microsoft.com/playwright:v1.57.0-jammy

# Directorio de trabajo (No hardcodear CI aqui)
WORKDIR /app

# Instalar Java (Allure lo pide)
RUN apt-get update && \
    apt-get install -y openjdk-17-jre && \
    apt-get clean

# Configurar JAVA_HOME (Necesario para correr Allure)
    ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
    ENV PATH="$JAVA_HOME/bin:$PATH"

# Copiar dependencias primero (Buena practica)
COPY package*.json ./
RUN npm ci

# Copiar codigo
COPY . .

# Instalar Allure CLI
RUN npm install -g allure-commandline

# Crear carpeta de resultados
RUN mkdir -p allure-results

# Exponer puerto para Allure
EXPOSE 4040

# Comando final
CMD ["sh","-c","npx playwright test && allure generate allure-results --clean -o allure-report"]

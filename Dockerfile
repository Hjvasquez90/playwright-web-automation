# Imagen de Playwright con navegadores ya instalados
FROM mcr.microsoft.com/playwright:v1.57.0-jammy

# Directorio de trabajo
WORKDIR /app

# Copiar dependencias primero (Buena practica)
COPY package*.json ./
RUN npm ci

# Copiar codigo
COPY . .

# Crear carpeta de resultados
RUN mkdir -p allure-results

# Exponer puerto para Allure
EXPOSE 4040

# Comando final
CMD ["sh","-c","npx playwright test && allure generate allure-results --clean -o allure-report && allure open allure-report --host 0.0.0.0"]

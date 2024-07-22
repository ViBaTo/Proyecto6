# API de Música Clásica

## Descripción

Este proyecto es una API RESTful construida con Express y Mongoose. Se conecta a una base de datos MongoDB Atlas y proporciona CRUD completo para dos colecciones: `Composer` y `Symphony`.

## Requisitos Previos

- Node.js
- MongoDB Atlas

## Instalación

1. Clonar el repositorio.
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Configurar las variables de entorno en un archivo `.env`:
   ```
   PORT=3000
   DB_URL=your_mongodb_connection_string
   ```
4. Ejecutar la semilla de datos:
   ```bash
   node seed.js
   ```
5. Iniciar el servidor:
   ```bash
   npm run dev
   ```

## Endpoints

### Composers

- **Crear Compositor**: `POST /api/v1/composers`
- **Obtener Todos los Compositores**: `GET /api/v1/composers`
- **Obtener Compositor por ID**: `GET /api/v1/composers/:id`
- **Actualizar Compositor**: `PUT /api/v1/composers/:id`
- **Eliminar Compositor**: `DELETE /api/v1/composers/:id`
- **Obtener Compositores por Categoría**: `GET /api/v1/composers/getByCategory/:category`

### Symphonies

- **Crear Sinfonía**: `POST /api/v1/symphonies`
- **Obtener Todas las Sinfonías**: `GET /api/v1/symphonies`
- **Obtener Sinfonías por Compositor**: `GET /api/v1/symphonies/composer/:composerId`
- **Actualizar Sinfonía**: `PUT /api/v1/symphonies/:id`
- **Eliminar Sinfonía**: `DELETE /api/v1/symphonies/:id`

## Notas

- Al actualizar un compositor, las sinfonías relacionadas no se eliminan.
- No se permiten duplicados en el array de sinfonías relacionadas de un compositor.

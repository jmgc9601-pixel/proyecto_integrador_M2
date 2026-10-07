# Proyecto Integrador M2 — Mini Blog API

API REST desarrollada con Node.js, Express y PostgreSQL para gestionar autores y publicaciones.

## Descripción

Esta aplicación implementa una API REST con operaciones CRUD para dos recursos principales:

* **Authors**
* **Posts**

Cada post pertenece a un author mediante una relación de uno a muchos.

La aplicación incluye:

* Persistencia de datos con PostgreSQL.
* Arquitectura separada en routes, controllers y services.
* Validaciones y manejo de errores HTTP.
* Tests automatizados con Node Test Runner y Supertest.
* Documentación OpenAPI mediante Swagger UI.
* Variables de entorno para configuración.
* Despliegue en Railway.

## Tecnologías

* Node.js
* Express
* PostgreSQL
* `pg`
* Supertest
* Swagger UI Express
* OpenAPI 3.0
* Git / GitHub
* Railway

## Arquitectura

El proyecto está organizado de la siguiente manera:

```text
proyecto_integrador_M2/
│
├── docs/
│   └── IA prompts/
│
├── src/
│   ├── controllers/
│   ├── db/
│   ├── routes/
│   └── services/
│
├── tests/
│   └── api.test.js
│
├── .env.example
├── .gitignore
├── app.js
├── server.js
├── package.json
├── package-lock.json
└── swagger.json
```

El flujo de una petición es:

```text
Client
  ↓
Route
  ↓
Controller
  ↓
Service
  ↓
PostgreSQL
```

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/jmgc9601-pixel/proyecto_integrador_M2.git
cd proyecto_integrador_M2
```

Instalar las dependencias:

```bash
npm install
```

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto tomando como referencia `.env.example`.

Ejemplo:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=api_db
DB_USER=api_user
DB_PASSWORD=your_password_here
```

El archivo `.env` contiene información sensible y no debe subirse al repositorio.

## Ejecutar el proyecto

Para iniciar el servidor:

```bash
npm start
```

La API local estará disponible en:

```text
http://localhost:3000
```

Endpoint de comprobación:

```text
http://localhost:3000/status
```

## Ejecutar los tests

La suite de pruebas se ejecuta con:

```bash
npm test
```

Actualmente el proyecto cuenta con **18 tests automatizados**, cubriendo:

* Respuestas exitosas.
* Validaciones.
* Recursos inexistentes.
* Conflictos por email duplicado.
* CRUD de authors.
* CRUD de posts.

## Endpoints

### Authors

| Método | Endpoint       | Descripción               |
| ------ | -------------- | ------------------------- |
| GET    | `/authors`     | Obtener todos los authors |
| GET    | `/authors/:id` | Obtener un author por ID  |
| POST   | `/authors`     | Crear un author           |
| PUT    | `/authors/:id` | Actualizar un author      |
| DELETE | `/authors/:id` | Eliminar un author        |

### Posts

| Método | Endpoint     | Descripción             |
| ------ | ------------ | ----------------------- |
| GET    | `/posts`     | Obtener todos los posts |
| GET    | `/posts/:id` | Obtener un post por ID  |
| POST   | `/posts`     | Crear un post           |
| PUT    | `/posts/:id` | Actualizar un post      |
| DELETE | `/posts/:id` | Eliminar un post        |

## Ejemplo de creación de author

```json
{
  "name": "Gabriel García",
  "email": "gabriel@example.com",
  "bio": "Escritor y periodista."
}
```

## Ejemplo de creación de post

```json
{
  "author_id": 1,
  "title": "Primer post",
  "content": "Contenido de ejemplo.",
  "published": true
}
```

## Respuestas y manejo de errores

La API utiliza códigos HTTP para representar el resultado de cada operación.

| Código | Significado                            |
| ------ | -------------------------------------- |
| 200    | Operación exitosa                      |
| 201    | Recurso creado                         |
| 400    | Datos inválidos o author inexistente   |
| 404    | Recurso no encontrado                  |
| 409    | Conflicto, por ejemplo email duplicado |
| 500    | Error interno del servidor             |

## Documentación OpenAPI

La documentación de la API está disponible mediante Swagger UI.

### Local

```text
http://localhost:3000/api-docs
```

### Producción

```text
https://proyectointegradorm2-production-5daa.up.railway.app/api-docs
```

## API desplegada

La API está desplegada en Railway.

URL base:

```text
https://proyectointegradorm2-production-5daa.up.railway.app
```

Endpoint de estado:

```text
https://proyectointegradorm2-production-5daa.up.railway.app/status
```

## GitHub

Repositorio:

```text
https://github.com/jmgc9601-pixel/proyecto_integrador_M2
```

## Base de datos

La aplicación utiliza PostgreSQL con dos tablas principales:

```text
authors
  │
  └── id
       ↓
posts.author_id
```

La relación entre ambos recursos es de uno a muchos:

* Un author puede tener muchos posts.
* Cada post pertenece a un author.

La relación utiliza una clave foránea con `ON DELETE CASCADE`.

## Evidencias del proceso

La carpeta `docs/IA prompts/` contiene material utilizado durante el proceso de desarrollo como evidencia y documentación del trabajo realizado.

## Estado del proyecto

Proyecto integrador desarrollado, probado y desplegado.

* CRUD implementado.
* Validaciones implementadas.
* Manejo de errores implementado.
* 18 tests automatizados pasando.
* Documentación OpenAPI disponible.
* Aplicación desplegada en Railway.
* PostgreSQL configurado en producción.

## Uso de Inteligencia Artificial

Durante el desarrollo de este proyecto se utilizó **ChatGPT como herramienta de apoyo y tutoría técnica**.

La inteligencia artificial se utilizó principalmente para:

* Comprender conceptos de Node.js, Express, PostgreSQL, REST y arquitectura por capas.
* Resolver dudas puntuales durante la implementación.
* Analizar errores de código y mensajes provenientes de PostgreSQL, Node.js, PowerShell y Git.
* Recibir explicaciones paso a paso sobre conceptos que no estaban completamente claros.
* Revisar la estructura y legibilidad del código.
* Orientar la implementación de pruebas automatizadas con Supertest.
* Comprender y configurar documentación OpenAPI/Swagger.
* Recibir orientación durante la preparación del proyecto para GitHub y el despliegue en Railway.

El uso de IA se realizó principalmente como **herramienta de aprendizaje y acompañamiento**, procurando comprender cada solución y no limitarse a copiar código generado.

### Oportunidades de mejora y aprendizaje

Durante el desarrollo se identificaron algunos conceptos que inicialmente no estaban completamente claros y que representaron oportunidades de aprendizaje, entre ellos:

* Diferencias entre **CommonJS y ES Modules**.
* Separación de responsabilidades entre **routes, controllers y services**.
* Manejo de parámetros de ruta (`req.params`) y cuerpos de las peticiones (`req.body`).
* Manejo de errores provenientes de PostgreSQL mediante `try/catch`.
* Interpretación de códigos de error de PostgreSQL, como `23505` para violaciones de unicidad y `23503` para violaciones de claves foráneas.
* Diferencia entre los códigos de estado HTTP y el contenido JSON de una respuesta.
* Funcionamiento de pruebas automatizadas y el concepto de **tests independientes**.
* Diferencia entre la aplicación Express (`app.js`) y el proceso que inicia el servidor (`server.js`).
* Concepto y propósito de OpenAPI/Swagger como herramienta de documentación de una API.
* Manejo de variables de entorno y diferencias entre configuración local y configuración de producción.
* Proceso de versionado mediante Git y despliegue de una API con PostgreSQL en Railway.

Estas dificultades fueron utilizadas como oportunidades para reforzar conceptos de backend y mejorar progresivamente la comprensión de la arquitectura y funcionamiento de la aplicación.

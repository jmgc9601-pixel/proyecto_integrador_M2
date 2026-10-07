# Proyecto Integrador M2 — Mini Blog API

API REST desarrollada con **Node.js, Express y PostgreSQL** para gestionar autores y publicaciones.

El proyecto fue desarrollado como parte del módulo M2 y tiene como objetivo aplicar conceptos de desarrollo backend, arquitectura REST, persistencia de datos, pruebas automatizadas, documentación de APIs y despliegue en producción.

---

## Descripción

La aplicación permite gestionar dos recursos principales:

* **Authors:** autores de las publicaciones.
* **Posts:** publicaciones asociadas a un autor.

La relación entre ambos recursos es de **uno a muchos**:

```text
Author
   │
   ├── Post
   ├── Post
   └── Post
```

Cada `post` pertenece obligatoriamente a un `author`.

La aplicación cuenta con:

* API REST.
* PostgreSQL como sistema de persistencia.
* Arquitectura separada por responsabilidades.
* Operaciones CRUD.
* Validaciones de datos.
* Manejo de errores HTTP.
* Pruebas automatizadas.
* Documentación OpenAPI/Swagger.
* Variables de entorno.
* Repositorio Git/GitHub.
* Despliegue en Railway.
* PostgreSQL en producción.

---

# Tecnologías utilizadas

* **Node.js**
* **Express 5**
* **PostgreSQL**
* **node-postgres (`pg`)**
* **Supertest**
* **Node.js Test Runner**
* **Swagger UI Express**
* **OpenAPI 3.0**
* **dotenv**
* **Git**
* **GitHub**
* **Railway**

---

# Arquitectura del proyecto

El proyecto utiliza una arquitectura por capas para separar las responsabilidades de cada parte de la aplicación.

```text
proyecto_integrador_M2/
│
├── docs/
│   └── IA prompts/
│
├── src/
│   ├── controllers/
│   │   ├── authors.controller.js
│   │   └── posts.controller.js
│   │
│   ├── db/
│   │   ├── connection.js
│   │   └── test-connection.js
│   │
│   ├── routes/
│   │   ├── authors.routes.js
│   │   └── posts.routes.js
│   │
│   └── services/
│       ├── authors.service.js
│       └── posts.service.js
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
├── README.md
└── swagger.json
```

## Flujo de una petición

La aplicación separa el procesamiento de las peticiones en diferentes capas:

```text
Cliente
   ↓
Route
   ↓
Controller
   ↓
Service
   ↓
PostgreSQL
```

### Routes

Las rutas reciben las peticiones HTTP y las dirigen al controller correspondiente.

```text
src/routes/
```

### Controllers

Los controllers reciben la petición, obtienen los datos necesarios, realizan validaciones relacionadas con la respuesta HTTP y determinan qué respuesta devolver al cliente.

```text
src/controllers/
```

### Services

Los services contienen la lógica relacionada con el acceso y manipulación de los datos.

Las consultas a PostgreSQL se realizan desde esta capa.

```text
src/services/
```

### Database

La conexión con PostgreSQL se centraliza mediante un `Pool` de `pg`.

```text
src/db/connection.js
```

La configuración de la conexión utiliza variables de entorno.

### App y Server

`app.js` configura la aplicación Express:

* Middleware.
* Rutas.
* Swagger.
* Endpoint `/status`.

`server.js` se encarga de iniciar el servidor HTTP.

Esta separación permite utilizar `app.js` en las pruebas sin necesidad de iniciar manualmente el servidor.

---

# Base de datos

La aplicación utiliza PostgreSQL.

## Tabla `authors`

```text
authors
├── id
├── name
├── email
├── bio
└── created_at
```

Características principales:

* `id` como clave primaria.
* `name` obligatorio.
* `email` obligatorio y único.
* `bio` opcional.
* `created_at` generado automáticamente.

## Tabla `posts`

```text
posts
├── id
├── author_id
├── title
├── content
├── published
└── created_at
```

`author_id` funciona como clave foránea hacia `authors.id`.

```text
posts.author_id
       ↓
authors.id
```

La relación utiliza:

```sql
ON DELETE CASCADE
```

Por lo tanto, al eliminar un author, PostgreSQL puede eliminar automáticamente los posts asociados.

---

# Instalación

Clonar el repositorio:

```bash
git clone https://github.com/jmgc9601-pixel/proyecto_integrador_M2.git
```

Ingresar al proyecto:

```bash
cd proyecto_integrador_M2
```

Instalar las dependencias:

```bash
npm install
```

---

# Variables de entorno

Crear un archivo `.env` en la raíz del proyecto utilizando `.env.example` como referencia.

Ejemplo:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=api_db
DB_USER=api_user
DB_PASSWORD=your_password_here
```

El archivo `.env` contiene información sensible y está excluido del repositorio mediante `.gitignore`.

El proyecto incluye `.env.example` para mostrar las variables necesarias sin exponer credenciales reales.

---

# Ejecución local

Para iniciar la aplicación:

```bash
npm start
```

La API estará disponible en:

```text
http://localhost:3000
```

Endpoint de estado:

```text
http://localhost:3000/status
```

Respuesta esperada:

```text
API funcionando
```

---

# Tests

El proyecto utiliza el **Node.js Test Runner** junto con **Supertest** para probar los endpoints de la API.

Ejecutar:

```bash
npm test
```

La suite desarrollada cuenta actualmente con:

```text
18 tests
18 passing
0 failing
```

Los tests cubren:

* Endpoint de estado.
* Listado de authors.
* Consulta de author por ID.
* Author inexistente.
* Validación al crear authors.
* Creación de authors.
* Email duplicado.
* Listado de posts.
* Consulta de post por ID.
* Post inexistente.
* Creación de posts.
* Validación al crear posts.
* Actualización de posts.
* Post inexistente durante actualización.
* Eliminación de posts.
* Verificación posterior a la eliminación.
* Author inexistente durante eliminación.
* Eliminación de authors.

---

# Endpoints

## Authors

| Método | Endpoint       | Descripción               |
| ------ | -------------- | ------------------------- |
| GET    | `/authors`     | Obtener todos los authors |
| GET    | `/authors/:id` | Obtener un author por ID  |
| POST   | `/authors`     | Crear un author           |
| DELETE | `/authors/:id` | Eliminar un author        |

## Posts

| Método | Endpoint     | Descripción             |
| ------ | ------------ | ----------------------- |
| GET    | `/posts`     | Obtener todos los posts |
| GET    | `/posts/:id` | Obtener un post por ID  |
| POST   | `/posts`     | Crear un post           |
| PUT    | `/posts/:id` | Actualizar un post      |
| DELETE | `/posts/:id` | Eliminar un post        |

---

# Ejemplo — Crear un author

```json
{
  "name": "Gabriel García",
  "email": "gabriel@example.com",
  "bio": "Escritor y periodista."
}
```

---

# Ejemplo — Crear un post

```json
{
  "author_id": 1,
  "title": "Primer post",
  "content": "Contenido de ejemplo.",
  "published": true
}
```

---

# Códigos HTTP utilizados

| Código | Significado                |
| ------ | -------------------------- |
| 200    | Operación exitosa          |
| 201    | Recurso creado             |
| 400    | Datos inválidos            |
| 404    | Recurso no encontrado      |
| 409    | Conflicto                  |
| 500    | Error interno del servidor |

Ejemplos de errores manejados:

* Author inexistente al crear un post.
* Campos obligatorios faltantes.
* Author o post inexistente.
* Email de author duplicado.

---

# Documentación OpenAPI / Swagger

La API está documentada utilizando **OpenAPI 3.0** y **Swagger UI**.

## Local

```text
http://localhost:3000/api-docs
```

## Producción

```text
https://proyectointegradorm2-production-5daa.up.railway.app/api-docs
```

Swagger permite consultar los endpoints, parámetros, respuestas y estructura de las operaciones disponibles.

---

# Despliegue

La aplicación está desplegada en **Railway**.

## API en producción

```text
https://proyectointegradorm2-production-5daa.up.railway.app
```

## Endpoint de estado

```text
https://proyectointegradorm2-production-5daa.up.railway.app/status
```

## Swagger

```text
https://proyectointegradorm2-production-5daa.up.railway.app/api-docs
```

La aplicación en producción está conectada a una instancia de PostgreSQL alojada en Railway.

Se verificó la comunicación entre:

```text
Cliente
   ↓
Railway
   ↓
Express
   ↓
Services
   ↓
PostgreSQL
```

También se realizaron pruebas reales de creación de authors y posts en el entorno de producción.

---

# GitHub

Repositorio del proyecto:

```text
https://github.com/jmgc9601-pixel/proyecto_integrador_M2
```

El repositorio contiene el código fuente, pruebas, documentación Swagger, configuración de ejemplo y documentación del proceso.

Las credenciales reales y el archivo `.env` no forman parte del repositorio.

---

# Uso de Inteligencia Artificial

Durante el desarrollo del proyecto se utilizó **ChatGPT como herramienta de apoyo y tutoría técnica**.

La inteligencia artificial se utilizó principalmente para:

* Comprender conceptos de Node.js, Express y PostgreSQL.
* Resolver dudas durante la implementación.
* Analizar errores de Node.js, PostgreSQL, PowerShell y Git.
* Comprender la arquitectura por capas.
* Recibir explicaciones paso a paso sobre conceptos que inicialmente no estaban claros.
* Revisar la estructura y legibilidad del código.
* Orientar la implementación de pruebas automatizadas.
* Comprender y configurar OpenAPI y Swagger.
* Recibir orientación sobre Git, GitHub y Railway.
* Identificar oportunidades de mejora durante el desarrollo.

El uso de IA se realizó principalmente como **herramienta de aprendizaje y acompañamiento**, procurando comprender cada solución y no limitarse a copiar código generado.

## Oportunidades de mejora y aprendizaje

Durante el desarrollo se identificaron diferentes conceptos que inicialmente no estaban completamente claros y que representaron oportunidades de aprendizaje:

* Diferencias entre parámetros de ruta y datos enviados en el cuerpo de una petición.
* Separación de responsabilidades entre routes, controllers y services.
* Manejo de errores mediante `try/catch`.
* Uso de códigos de estado HTTP.
* Manejo de errores específicos de PostgreSQL.
* Funcionamiento de claves primarias y claves foráneas.
* Relaciones entre tablas y `ON DELETE CASCADE`.
* Funcionamiento de pruebas automatizadas.
* Diferencia entre `app.js` y `server.js`.
* Propósito de OpenAPI y Swagger.
* Manejo de variables de entorno.
* Uso de Git para control de versiones.
* Diferencias entre el entorno local y producción.
* Conexión de una API con PostgreSQL en Railway.

Estas dificultades fueron utilizadas como oportunidades para reforzar conocimientos de backend y mejorar progresivamente la comprensión de la arquitectura y funcionamiento de la aplicación.

---

# Evidencias del proceso

La carpeta:

```text
docs/IA prompts/
```

contiene capturas y material relacionado con el uso de inteligencia artificial durante el proceso de desarrollo.

Estas evidencias permiten documentar parte del proceso de aprendizaje y acompañamiento utilizado durante la construcción del proyecto.

---

# Estado del proyecto

El proyecto cuenta con:

* ✅ API REST funcional.
* ✅ PostgreSQL integrado.
* ✅ Arquitectura por capas.
* ✅ CRUD implementado.
* ✅ Validaciones.
* ✅ Manejo de errores.
* ✅ 18 tests automatizados pasando.
* ✅ Documentación OpenAPI.
* ✅ Swagger UI.
* ✅ Variables de entorno.
* ✅ `.env.example`.
* ✅ Git y GitHub.
* ✅ Despliegue en Railway.
* ✅ PostgreSQL en producción.
* ✅ API pública funcionando.
* ✅ Evidencias del proceso de aprendizaje.
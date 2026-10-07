const test = require("node:test");
const assert = require("node:assert");
const request = require("supertest");

const app = require("../app");

test("GET /status debe responder API funcionando", async () => {
    const response = await request(app).get("/status");

    assert.strictEqual(response.statusCode, 200);
    assert.strictEqual(response.text, "API funcionando");
});

test("GET /authors debe responder 200 y devolver un array", async () => {
    const response = await request(app).get("/authors");

    assert.strictEqual(response.statusCode, 200);
    assert.ok(Array.isArray(response.body));
});

test("GET /authors/:id debe devolver un author", async () => {
    const response = await request(app).get("/authors/2");

    assert.strictEqual(response.statusCode, 200);
    assert.strictEqual(response.body.id, 2);
});

test("GET /authors/:id debe devolver 404 si no existe", async () => {
    const response = await request(app).get("/authors/9999");

    assert.strictEqual(response.statusCode, 404);
    assert.strictEqual(response.body.error, "Author not found");
});

test("POST /authors debe devolver 400 si faltan name y email", async () => {
    const response = await request(app)
        .post("/authors")
        .send({
            bio: "Prueba de validación"
        });

    assert.strictEqual(response.statusCode, 400);
    assert.strictEqual(response.body.error, "name and email are required");
});

test("GET /posts debe devolver 200 y un array", async () => {
    const response = await request(app).get("/posts");

    assert.strictEqual(response.statusCode, 200);
    assert.ok(Array.isArray(response.body));
});

test("GET /posts/:id debe devolver un post", async () => {
    const created = await request(app)
        .post("/posts")
        .send({
            author_id: 2,
            title: "Post para GET",
            content: "Contenido de prueba",
            published: true
        });

    assert.strictEqual(created.statusCode, 201);

    const postId = created.body.id;

    const response = await request(app).get(`/posts/${postId}`);

    assert.strictEqual(response.statusCode, 200);
    assert.strictEqual(response.body.id, postId);
});

test("GET /posts/:id debe devolver 404 si no existe", async () => {
    const response = await request(app).get("/posts/9999");

    assert.strictEqual(response.statusCode, 404);
    assert.strictEqual(response.body.error, "Post not found");
});

test("POST /authors debe crear un author", async () => {
    const response = await request(app)
        .post("/authors")
        .send({
            name: "Author de prueba",
            email: `test-${Date.now()}@example.com`,
            bio: "Author creado desde Supertest"
        });

    assert.strictEqual(response.statusCode, 201);
    assert.ok(response.body.id);
    assert.strictEqual(response.body.name, "Author de prueba");
});

test("POST /posts debe crear un post", async () => {
    const response = await request(app)
        .post("/posts")
        .send({
            author_id: 2,
            title: "Post creado con Supertest",
            content: "Contenido de prueba",
            published: false
        });

    assert.strictEqual(response.statusCode, 201);
    assert.ok(response.body.id);
    assert.strictEqual(response.body.author_id, 2);
    assert.strictEqual(response.body.title, "Post creado con Supertest");
});

test("POST /posts debe devolver 400 si faltan campos", async () => {
    const response = await request(app)
        .post("/posts")
        .send({
            author_id: 2,
            title: "Post incompleto"
        });

    assert.strictEqual(response.statusCode, 400);
    assert.strictEqual(
        response.body.error,
        "author_id, title, content and published are required"
    );
});

test("PUT /posts/:id debe actualizar un post", async () => {
    const created = await request(app)
        .post("/posts")
        .send({
            author_id: 2,
            title: "Post original",
            content: "Contenido original",
            published: false
        });

    assert.strictEqual(created.statusCode, 201);

    const postId = created.body.id;

    const response = await request(app)
        .put(`/posts/${postId}`)
        .send({
            title: "Post actualizado con Supertest",
            content: "Contenido actualizado",
            published: true
        });

    assert.strictEqual(response.statusCode, 200);
    assert.strictEqual(response.body.id, postId);
    assert.strictEqual(response.body.title, "Post actualizado con Supertest");
    assert.strictEqual(response.body.published, true);
});

test("PUT /posts/:id debe devolver 404 si no existe", async () => {
    const response = await request(app)
        .put("/posts/9999")
        .send({
            title: "Post inexistente",
            content: "Contenido",
            published: true
        });

    assert.strictEqual(response.statusCode, 404);
    assert.strictEqual(response.body.error, "Post not found");
});

test("DELETE /posts/:id debe eliminar un post", async () => {
    const created = await request(app)
        .post("/posts")
        .send({
            author_id: 2,
            title: "Post para DELETE",
            content: "Contenido de prueba",
            published: false
        });

    assert.strictEqual(created.statusCode, 201);

    const postId = created.body.id;

    const response = await request(app)
        .delete(`/posts/${postId}`);

    assert.strictEqual(response.statusCode, 200);
    assert.strictEqual(response.body.id, postId);
});

test("GET /posts/:id debe devolver 404 después de eliminarlo", async () => {
    const created = await request(app)
        .post("/posts")
        .send({
            author_id: 2,
            title: "Post para comprobar DELETE",
            content: "Contenido de prueba",
            published: false
        });

    assert.strictEqual(created.statusCode, 201);

    const postId = created.body.id;

    await request(app)
        .delete(`/posts/${postId}`);

    const response = await request(app)
        .get(`/posts/${postId}`);

    assert.strictEqual(response.statusCode, 404);
    assert.strictEqual(response.body.error, "Post not found");
});

test("DELETE /authors/:id debe devolver 404 si no existe", async () => {
    const response = await request(app)
        .delete("/authors/9999");

    assert.strictEqual(response.statusCode, 404);
    assert.strictEqual(response.body.error, "Author not found");
});

test("DELETE /authors/:id debe eliminar un author", async () => {
    const created = await request(app)
        .post("/authors")
        .send({
            name: "Author para DELETE",
            email: `delete-${Date.now()}@example.com`,
            bio: "Author creado para probar DELETE"
        });

    assert.strictEqual(created.statusCode, 201);

    const authorId = created.body.id;

    const response = await request(app)
        .delete(`/authors/${authorId}`);

    assert.strictEqual(response.statusCode, 200);
    assert.strictEqual(response.body.id, authorId);
});

test("POST /authors debe devolver 409 si el email ya existe", async () => {
    const email = `duplicate-${Date.now()}@example.com`;

    const firstResponse = await request(app)
        .post("/authors")
        .send({
            name: "Author original",
            email,
            bio: "Primer registro"
        });

    assert.strictEqual(firstResponse.statusCode, 201);

    const secondResponse = await request(app)
        .post("/authors")
        .send({
            name: "Author duplicado",
            email,
            bio: "Segundo registro"
        });

    assert.strictEqual(secondResponse.statusCode, 409);
    assert.strictEqual(secondResponse.body.error, "email already exists");
});
test("GET /posts/author/:authorId", async () => {
    const response = await request(app)
        .get("/posts/author/1");

    assert.strictEqual(response.statusCode, 200);
    assert.ok(Array.isArray(response.body));

    for (const post of response.body) {
        assert.strictEqual(post.author_id, 1);
    }
});
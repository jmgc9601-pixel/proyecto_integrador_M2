const express = require("express");
const swaggerUi = require("swagger-ui-express");

const swaggerDocument = require("./swagger.json");
const authorsRoute = require("./src/routes/authors.routes");
const postsRoute = require("./src/routes/posts.routes");

const app = express();

app.disable("x-powered-by");

app.use(express.json());

app.get("/status", (req, res) => {
    res.send("API funcionando");
});

app.use("/authors", authorsRoute);
app.use("/posts", postsRoute);

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

module.exports = app;
const express = require("express");
const router = express.Router();
const {getAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor} = require("../controllers/authors.controller");

router.get("/", getAuthors);
router.get("/:id", getAuthorById);
router.post("/", createAuthor);
router.put("/:id", updateAuthor);
router.delete("/:id", deleteAuthor);

module.exports = router;
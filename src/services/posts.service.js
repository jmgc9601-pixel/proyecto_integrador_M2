const pool = require("../db/connection");

const getAllPosts = async () => {
    const result = await pool.query("SELECT * FROM posts");
        return(result.rows);
    };
const getPostById = async (id) => {
const result = await pool.query(
        "SELECT * FROM posts WHERE id = $1",
        [id]
    );
    return result.rows[0]
};
const createPost = async (author_id, title, content, published) => {
    const result = await pool.query(
    "INSERT INTO posts (author_id, title, content, published) VALUES ($1, $2, $3, $4) RETURNING *",
    [author_id, title, content, published]
    );
return result.rows[0]
};
const updatePost = async (id, title, content, published) => {
    const result = await pool.query(
        "UPDATE posts SET title = $2, content = $3, published = $4 WHERE id = $1 RETURNING *",
        [id, title, content, published]
    );
    return result.rows[0];
};
const deletePost = async (id) => {
    const result = await pool.query(
        "DELETE FROM posts WHERE id = $1 RETURNING *",
        [id]
    );
    return result.rows[0];
};

module.exports = {getAllPosts, getPostById, createPost, updatePost, deletePost};
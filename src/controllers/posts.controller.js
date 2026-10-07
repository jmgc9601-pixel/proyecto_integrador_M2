const { getAllPosts, getPostById: getPostByIdService, createPost: createPostService, updatePost: updatePostService, deletePost: deletePostService } 
    = require("../services/posts.service");


const getPosts = async (req, res) => {
    const posts = await getAllPosts();
    res.json(posts);
};
const getPostById = async (req, res) => {
    const id = req.params.id;
    const post = await getPostByIdService(id);
    if (!post) {
        return res.status(404).json({
            error: "Post not found"
        });
    }
    res.json(post);
};
const createPost = async (req, res) => {
    const { author_id, title, content, published } = req.body;
    if (!author_id || !title || !content || published === undefined) {
        return res.status(400).json({
            error: "author_id, title, content and published are required"
        });
    }
    try {
        const post = await createPostService(author_id, title, content, published);
        res.status(201).json(post);
    } catch (error) {
        if (error.code === "23503") {
            return res.status(400).json({
                error: "author does not exist"
            });
        }
        return res.status(500).json({
            error: "internal server error"
        });
    }
};
const updatePost = async (req, res) => {
    const id = req.params.id;
    const { title, content, published } = req.body;
    if (!title || !content || published === undefined) {
    return res.status(400).json({
        error: "title, content and published are required"
    });
}
    const post = await updatePostService(id, title, content, published);
    if (!post) {
    return res.status(404).json({
        error: "Post not found"
    });
}
    res.status(200).json(post);
};
const deletePost = async (req, res) => {    
    const id = req.params.id;
    const post = await deletePostService(id);

     if (!post) {
    return res.status(404).json({
        error: "Post not found"
    });
}
    res.status(200).json(post);
};

module.exports = { getPosts, getPostById, createPost, updatePost, deletePost };

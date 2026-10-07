const { getAllAuthors, getAuthorById: getAuthorByIdService, createAuthor: createAuthorService, updateAuthor: updateAuthorService, deleteAuthor: deleteAuthorService} 
    = require("../services/authors.service");

const getAuthors = async (req, res) => {  
    const authors = await getAllAuthors()
    res.json(authors);
};
const getAuthorById = async (req, res) => {  
    const id = req.params.id
    const author = await getAuthorByIdService(id);
    if (!author) {
    return res.status(404).json({
        error: "Author not found"
    });
}
    res.json(author);
};
const createAuthor = async (req, res) => {
    const { name, email, bio } = req.body;
    if (!name || !email) {
    return res.status(400).json({
        error: "name and email are required"
    });
}
 try {
    const author = await createAuthorService(name, email, bio);
    res.status(201).json(author);
    } 
 catch (error) {
    if (error.code === "23505") {
        return res.status(409).json({
            error: "email already exists"
        });
    }
    return res.status(500).json({
        error: "internal server error"
    });
}
};
const updateAuthor = async (req, res) => {
    const id = req.params.id;
    const { name, email, bio } = req.body;
    const author = await updateAuthorService(id, name, email, bio);
    res.status(200).json(author);
};
const deleteAuthor = async (req, res) => {
    const id = req.params.id;
    const author = await deleteAuthorService(id);

     if (!author) {
    return res.status(404).json({
        error: "Author not found"
    });
}
    res.status(200).json(author);
};

module.exports = {getAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor}
// const comment = require('../models/comment');
const comments = require('../models').comments;

const Blog = require('../models').blog;


// create main Model
// const Blog = db.blogs
//added try catch blocks

// 1. create blog
const addBlog = async (req, res) => {
  try {
      let info = {
      title: req.body.title,
      content: req.body.content,
      imageUrl: req.body.imageUrl,
      userId: req.userId,
  }
      console.log(info)

      const blog = await Blog.create(info)
      res.status(200).send(blog)
      console.log(blog)
} catch(err) {
      console.log(err)
      res.status(500).send({ message: err.message })
  }
}

// 2. get all blogs

const getAllBlogs = async (req, res) => {
  try {
    const limit =  req.query.limit || 10;
    const offset = 0 + (req.query.page - 1) * limit || 0;
    var blogs = await Blog.findAndCountAll({
      offset: offset,
      limit: +limit
    })
    res.status(200).json(blogs);
} catch (err) {
    console.log(err)
    res.status(500).send({ message: err.message })
  }
}

// 3. get single blog

const getOneBlog = async (req, res) => {
  try {
    let id = req.params.id
    let blog = await Blog.findOne({ 
      attributes: ['title', 'content', 'imageUrl'],
      include:[{
        model:comments
      }
       
      ],
      where: { id: id } })

      res.send(blog)
   
} catch (err) {
    console.log(err)
    res.status(500).send({ message: err.message })
  }
}



// 4. update blog

const updateBlog = async (req, res) => {
  try {
    let id = req.params.id
    const blog = await Blog.update(req.body, { where: { id: id } })
    res.status(200).send(blog)
} catch (err) {
    console.log(err)
    res.status(500).send({ message: err.message })
  }
}

// 5. delete blog by id

const deleteBlog = async (req, res) => {
  try {
    let id = req.params.id
    await Blog.destroy({ where: { id: id } })
    res.status(200).send('Blog is deleted !')
} catch (err) {
    console.log(err)
    res.status(500).send({ message: err.message })
}
}

module.exports = {
  addBlog,
  getAllBlogs,
  getOneBlog,
  updateBlog,
  deleteBlog,
}
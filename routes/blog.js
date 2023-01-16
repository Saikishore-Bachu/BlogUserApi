// import controllers blogs
const blogController = require('../modules/blog')
const commentController = require('../modules/comment')
const auth= require('../middleware/auth')
const { validateAddBlogRequest, isRequestValidated,validateCommentRequest } = require('../middleware/validation')

// router
const router = require('express').Router()


router.route('/addBlog').post(validateAddBlogRequest,isRequestValidated,auth, blogController.addBlog)

router.get('/allBlogs',blogController.getAllBlogs)

router.get('/:id',blogController.getOneBlog)

router.put('/:id', blogController.updateBlog)

router.delete('/:id', blogController.deleteBlog)

router.post('/addComment/:postId',validateCommentRequest,isRequestValidated, auth, commentController.addComment)

module.exports = router
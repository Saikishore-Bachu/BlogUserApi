const Blog = require('../models').blog
const Comment = require('../models').comments

//adding comments
exports.addComment = async(req, res) => {
    console.log("hello")
    try {
        let info = 
            {
            comments: req.body.commentContent,
            userId: req.userId,
            
        }

        const data = {
          postId:req.params.postId,
          comments: [info]
        }
        
        const comment = await Comment.create(data)
        res.status(200).send(comment)

    } catch (err) {
        console.log(err)
        res.status(500).send({ message: err.message })

    }
}

// //getting comments
// exports.getComments = async (req, res) => {
//     try {
//         const comments = await Comment.findAll()
//         res.status(200).send(comments)
//     } catch (err) {
//         console.log(err)
//         res.status(500).send({ message: err.message })
//     }
// }
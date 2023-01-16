// const { body } = require('express-validator');

// module.exports = (controller = '') => {
//     switch (controller) {
//     case 'addBlog': {
//         return [
//             body('title')
//                 .not()
//                 .isEmpty()
//                 .trim()
//                 .escape()
//                 .withMessage('title cannot be left blank'),
//             body('content')
//                 .trim()
//                 .not()
//                 .isEmpty()
//                 .withMessage('content cannot be left blank'),
//             body('imageUrl')
//                 .not()
//                 .isEmpty()
//                 .trim()
//                 .escape()
//                 .withMessage('imageUrl cannot be left blank'),
//             body('userId')
//                 .not()
//                 .isEmpty()
//                 .trim()
//                 .escape()
//                 .withMessage(' user Id cannot be left blank'),
//         ];
//     }
// }
// };


const { check, validationResult } = require('express-validator')

exports.validateSignupRequest = [
  check('name').notEmpty().withMessage('name is required'),
  check('email').isEmail().withMessage('Valid Email is required'),
  check("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
]

exports.validateSigninRequest = [
  check('email').isEmail().withMessage('Valid Email is required'),
  check("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
]

exports.validateAddBlogRequest = [
  check('title').notEmpty().withMessage('title is required'),
  check('content').notEmpty().withMessage('content is required'),
  check('imageUrl').notEmpty().withMessage('imageUrl is required'),
]

exports.validateCommentRequest = [
  check('comment').notEmpty().withMessage('comment is required'),
]

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req)

  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg })
  }
  next()
}
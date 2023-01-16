const userController = require('../modules/user')
const auth = require('../middleware/auth')
const { validateSignupRequest, validateSigninRequest, isRequestValidated } = require('../middleware/validation')
const router = require('express').Router()

// use routers
// router.post('/user/register',validateSignupRequest ,isRequestValidated,userController.signup)
router.route('/user/register').post(validateSignupRequest,isRequestValidated,userController.signup)
router.post('/user/login',validateSigninRequest,isRequestValidated ,auth,userController.signin)
router.post('/user/blogdetails/:id',userController.oneToOne)
// router.post('/user/blogownerdetails/:id', userController.belongsto)

module.exports = router;
const express = require("express");
const router = express.Router();
const authController=require('./../../controllers/auth/auth-controller')
const verifyAuth=require('./../../../middleware/auth_check');
const asyncHandler=require('../../../utils/async_handler')

router.post("/addNewUser",asyncHandler(authController.addNewUser) );
router.post("/login",authController.login);
router.get('/getAllUsers',verifyAuth.authVerify,authController.getAllUsers);
router.get('/getUserById/:id',verifyAuth.authVerify,authController.getUserById)
router.post('/forgotPass',authController.changeForgotPassword)
router.get('/disAbleUser/:id',verifyAuth.isAdmin,authController.disAbleUser)

module.exports=router;
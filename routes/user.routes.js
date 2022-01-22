const router = require('express').Router();  
const authController = require('../controllers/auth.controller'); 
const userController = require('../controllers/user.controller'); 
const uploadController = require('../controllers/upload.controller'); 
const multer = require('multer'); 
const upload = multer(); 

//auth 
router.post("/register" , authController.signUp); 
router.post("/login", authController.signIn); 
router.get("/logout" , authController.logout)

//user display 
router.get('/', userController.getAllUsers);
//user info
router.get('/:id' , userController.userInfo); 
//update user  
router.put('/:id' ,userController.updateUser ); 
//delete user 
router.delete('/:id' , userController.deleteUser ); 
//follow user
router.patch('/follow/:id' , userController.follow); 
//unfollow user 
router.patch('/unfollow/:id' , userController.unfollow); 

//upload 
router.post('/upload' , upload.single('file') , uploadController.uploadProfil ); 

module.exports = router;  
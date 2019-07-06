const express=require('express');
const router=express.Router();
const passport=require('passport');
const postsController=require('../controllers/posts_controller');


//this middleware is added for authentication purpose
router.post('/create',passport.checkAuthentication,postsController.create);



module.exports=router;
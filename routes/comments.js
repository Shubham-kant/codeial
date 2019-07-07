const express=require('express');
const router=express.Router();
const passport = require('passport');

const commentsController=require('../controllers/comments_controller');

//this middleware is added for authentication purpose
router.post('/create',passport.checkAuthentication,commentsController.create);



module.exports=router;
const express=require('express');
const router=express.Router();

const usersController=require('../controllers/users_controller');

router.get('/profile',usersController.profile);
router.get('/profile-pic',usersController.profilepic);
router.use('/posts',require('./posts'));

//ye file kahi par import karani padegi isliye yaha se export ki hai
module.exports=router;
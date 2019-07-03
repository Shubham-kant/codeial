const express=require('express');
const router=express.Router();
const passport = require('passport');

const usersController=require('../controllers/users_controller');

router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);
router.use('/posts',require('./posts'));
router.post('/create',usersController.create);
// use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {
        failureRedirect:'/users/sign-in'
    },
) ,usersController.createSession);

//ye file kahi par import karani padegi isliye yaha se export ki hai
module.exports=router;
const express=require('express');
const router=express.Router();
const passport = require('passport');

const usersController=require('../controllers/users_controller');

//now profile page cant be accessed without proper sign in 
//this is because of  middleware added in this route
router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
router.post('/update/:id',passport.checkAuthentication,usersController.update);
router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);
router.use('/posts',require('./posts'));
router.post('/create',usersController.create);
router.get('/sign-out',usersController.destroySession);
// use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {
        failureRedirect:'/users/sign-in'
    },
) ,usersController.createSession);
//sending request to google for user's info
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
//this is callback url where google send the info
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}), usersController.createSession);



//this file will be need to import somewhere thats why exported from here
module.exports=router;
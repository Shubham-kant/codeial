const passport=require('passport');
//imported passport-local module and especially Strategy property..
const LocalStrategy=require('passport-local').Strategy;
//imported user
const User=require('../models/user');

//authentication using passport.js
passport.use(new LocalStrategy({
    //usernameField is inbuilt..
     usernameField:'email',
    /*specially added this statement to enable req object as arguement
    in below callback function..
    to add a flash message in req object..*/
     passReqToCallback:true
    },
    function(req,email,password,done){
        //find the user and establish the identity
        User.findOne({email:email},function(err,user){
            if(err){
                req.flash('error', err);
                return done(err);
            }
            if(!user || user.password!=password){
                req.flash('error','Invalid Username/Password');
                return done(null,false);
            }
            // console.log(user);
            return done(null,user);
        });

    }
));
//serialising the user and decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});
//deserialing the user  from the key in cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('error in finding user --> passport ');
            return done(err);

        }
        return done(null,user);
    });
   
});
//to check that user is authenticated or not 
//it is passed as a middle ware
passport.checkAuthentication=function(req,res,next){
    //if user is signed in then pass the request on next(controller action)
    if(req.isAuthenticated()){
        return next();
    }
    //if user is not signed in
    return res.redirect('/users/sign-in');
}
passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        
        /* req.user contains the current signed in user 
        from the session cookie and we are just sending 
        this to the locals for the views*/
       res.locals.user=req.user;
    //    console.log(req);
    
    }
    //to run the next process
    next();



}
module.exports=passport;
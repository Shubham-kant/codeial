const passport=require('passport');
//imported passport-local module and especially Strategy property..
const LocalStrategy=require('passport-local').Strategy;
//imported user
const User=require('../models/user');

//authentication using passport.js
passport.use(new LocalStrategy({
    //usernameField is inbuilt..
     usernameField:'email'
    },
    function(email,password,done){
        //find the user and establish the identity
        User.findOne({email:email},function(err,user){
            if(err){
                console.log('error in finding user --> passport');
                return done(err);
            }
            if(!user || user.password!=password){
                console.log('invalid Username/Password');
                return done(null,false);
            }
            console.log(user);
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
    User.findById(id,function(err,done){
        if(err){
            console.log('error in finding user --> passport ');
            return done(err);

        }
        return done(null,user);
    });
   
});
module.exports=passport;
const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');

//telling passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID:'530865618639-kkt7vs5n877tur4k45bihmko01c2lu4k.apps.googleusercontent.com',
    clientSecret:'7dy9f9YdWCNp3RIp_Hr10G_s',
    callbackURL:'http://localhost:8000/users/auth/google/callback',
},
function(accessToken,refreshToken,profile,done){
    //find a user
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
        if(err){
            console.log('error in google strategy passport',err);
            return;
        }
        console.log(profile);
        //if user is found
        if(user){
            return done(null,user);
        }
        // if not found, create the user and set it as req.user
        else{
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            },function(err,user){
                if(err){
                    console.log('error in google strategy passport',err);
                    return;
                }
                return done(null,user);

            });
        }
    });
}
));
module.exports=passport;

const passport=require('passport');
const JWTStrategy=require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const env=require('./environment');

const User=require('../models/user');
let opts={
    //finding jwt from request
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
    //key to encrypt/decrypt the token
    secretOrKey:env.jwt_secret
}
//telling passport to use jwt strategy
passport.use(new JWTStrategy(opts,function(jwtPayLoad,done){
   User.findById(jwtPayLoad._id,function(err,user){
       if(err){
           console.log('error in finding user from jwt');
           return;
       }
       //if user is found
       if(user){
            return done(null,user);
       }
       //if user is not found
       else{
           return done(null,false);
       }
   })
}));

module.exports=passport;
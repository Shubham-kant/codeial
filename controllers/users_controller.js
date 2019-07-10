const User=require('../models/user');
module.exports.profile = function(req, res){
    //finding the user's profile by id
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user:user

        });
    });
    
  
}
module.exports.signUp=function(req,res){
    //now if user is signed in now user cant go sign up page 
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up');

}

module.exports.signIn=function(req,res){
    //now if user is signed in now user cant go sign in page 
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    //just printing the cookies on screen 
    console.log(req.cookies);
    //setting up the cookies
    // res.cookie('user_id',25);
    // res.cookie('name','pheobe');
    return res.render('user_sign_in');

}
//get the sign up data
module.exports.create=function(req,res){
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('error in finding user in signing up');
            return;
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('error in creating a user while signing up');
                    return;
                }
                return res.redirect('/users/sign-in');
            })
        }
        else{
            return res.redirect('back');
        }
        
    });
}
module.exports.createSession=function(req,res){
    return res.redirect('/');
}
module.exports.destroySession=function(req,res){
    /*Passport exposes a logout() function on req that can be called from any 
    route handler which needs to terminate a login session.
    Invoking logout() will remove the req.user property and clear the login session 
    */ 
    req.logout();
    //then redirecting to home page.
    return res.redirect('/');
}
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
module.exports.update=function(req,res){
    if(req.user.id==req.params.id){
        // User.findByIdAndUpdate(req.params,id,{name:req.body.name,email:req.body.email},function(err,user){

        // });
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            req.flash('success','Updated Successfully!!');
            return res.redirect('/');
        });
    }else{
        req.flash('error','Unauthorized');
        return res.status(401).send('Unauthorised');
    }
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
        req.flash('error','Passwords do not match!!')
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            // console.log('error in finding user in signing up');
            req.flash('error',err);
            return;
        }
        //if current user is not in database, so it means he is unique. add his id 
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    // console.log('error in creating a user while signing up');
                    req.flash('error',err);
                    return;
                }
                req.flash('success','You have Signed Up, Login to continue ');
                return res.redirect('/users/sign-in');
            })
        }
        else{
            req.flash('error','User Already exists!!!!');
            return res.redirect('back');
        }
        
    });
}

module.exports.createSession=function(req,res){
    
    //creating a flash message
    req.flash('success','Logged in Successfully');
    
    return res.redirect('/');
}
//sign-out
module.exports.destroySession=function(req,res){
    /*Passport exposes a logout() function on req that can be called from any 
    route handler which needs to terminate a login session.
    Invoking logout() will remove the req.user property and clear the login session 
    */ 
    req.logout();
    //creating a flash message
    req.flash('success','You have Logged out');

    //then redirecting to home page.
    return res.redirect('/');
}
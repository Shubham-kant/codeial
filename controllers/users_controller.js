const User=require('../models/user');
const fs=require('fs');
const path=require('path');
module.exports.profile = function(req, res){
    //finding the user's profile by id
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user:user

        });
    });
    
  
}
module.exports.update= async function(req,res){
    if(req.user.id==req.params.id){
        // User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
        //     return res.redirect('/');
        // });
        try{
            let user=await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('********Multer error',err);
                    // return ;
                }
                // console.log(req.file);
                //Multer adds a body object and file object to the request object. 
                //body object contains the values of the text fields of the form.
                //file object contains the files uploaded via the form.
                user.name=req.body.name;
                user.email=req.body.email;
                if(req.file){
                    //checking if user already has a avatar  
                    if(user.avatar){
                        //if the file of that avatar exists
                        if(fs.existsSync(path.join(__dirname,"..",user.avatar))){
                            //deleting the file (old avatar)
                            fs.unlinkSync(path.join(__dirname,"..",user.avatar));
                        }
                    }
                    //saving the path of uploaded file in avatar field of user
                    user.avatar=User.avatarPath + '/' + req.file.filename;
                }
                //saving user
                user.save();
                req.flash('success','Updated Successfully!!');
                return res.redirect('/');
            });
        }
        catch(err){
            req.flash('error',err);
            return res.redirect('back');

        }
    }
    else{
        req.flash('error','Unauthorized');
        return res.status(401).send('Unauthorized');
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
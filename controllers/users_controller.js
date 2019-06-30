const User=require('../models/user');
module.exports.profile=function(req,res){
    return res.render('user_profile');
}
module.exports.signUp=function(req,res){

    return res.render('user_sign_up');

}
module.exports.signIn=function(req,res){
    //just printing the cookies on screen 
    // console.log(req.cookies);
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
//sign in and create the session for the user
module.exports.createSession=function(req,res){
    //steps to authenticate
    //find the user
    User.findOne({email:req.body.email},function(err,user){
        
        if(err){
            console.log('error finding user in signing in');
            return;
        }
        // console.log(user);
        //user mail is matched in the DB..
        //a handle user is found
        if(user){
            //password doesnt match
            if(user.password!=req.body.password){
                return res.redirect('back');
            }
            //handle session created
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');


            //password matches

        }
        //user mail is matched in the DB...
        //handle user not found
        else{
             return res.redirect('back');
        }

    });

}
module.exports.signUp=function(req,res){

    return res.render('user_sign_up');

}
module.exports.signIn=function(req,res){
    //just printing the cookies on screen 
    console.log(req.cookies);
    //setting up the cookies
    res.cookie('user_id',25);
    res.cookie('name','pheobe');
    return res.render('user_sign_in');

}

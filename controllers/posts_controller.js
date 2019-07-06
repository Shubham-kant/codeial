const Post=require('../models/post');
module.exports.create=function(req,res){
   Post.create({
       content:req.body.content,
       //passing the user id.
       user:req.user._id
    },function(err){
        if(err){
            console.log('error in posting a post');
            return;
        }
        return res.redirect('back');
    });

}
const Post=require('../models/post');
const Comment=require('../models/comment');
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
module.exports.destroy=function(req,res){
    //req.params.id contains id of post to be deleted
   Post.findById(req.params.id,function(err,post){
       //post.user contains id of the user who posted that post.
       //req.user contains info of current logged in user.
       // .id means converting the object id into string.
       if(post.user==req.user.id){
           post.remove();
           
           Comment.deleteMany({post:req.params.id},function(err){
               return res.redirect('back');
           });
       }
       else{
           return res.redirect('back');
       }
    
   });

}
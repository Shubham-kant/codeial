const Comment=require('../models/comment');
const Post=require('../models/post');

module.exports.create=function(req,res){
   Post.findById(req.body.post,function(err,post){
    if(err){
        console.log('error in fetching comments');
        return ;
    }
       if(post){
           
           Comment.create({
            //req.body contains content and post id
              content:req.body.content,
              post:req.body.post,
              user:req.user._id
           },function(err,comment){
               if(err){
                   console.log('error in fetching comments');
                   return ;
               }
               //pushing the comment in the field 'comments' of post
               //added comment to the post.
               post.comments.push(comment);
               //saving 
               post.save();
               return res.redirect('/');
           });
       }

   });
}
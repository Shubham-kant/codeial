const Comment=require('../models/comment');
const Post=require('../models/post');

//creating a comment
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
//deleting a comment
module.exports.destroy=function(req,res){
    Comment.findById(req.params.id,function(err,comment){
        
            let postId=comment.post;
            Post.findById(postId,function(err,post){
                let userId=post.user;
                if(post.user==req.user.id||comment.user == req.user.id){
                    comment.remove(); 
                    let postId=comment.post;
                    Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}},function(err,post){
                   
                        return res.redirect('back');
                 });
                }
                else{
                    return res.redirect('back');
                }
            });
          
        
    });
    
}
const Comment=require('../models/comment');
const Post=require('../models/post');
//creating a comment
module.exports.create=async function(req,res){
  
    try{
       let post=await Post.findById(req.body.post);
       if(post){
           
           let comment=await Comment.create({
            //req.body contains content and post id
              content:req.body.content,
              post:req.body.post,
              user:req.user._id
           });
               
               //pushing the comment in the field 'comments' of post
               //added comment to the post.
               post.comments.push(comment);
               //saving 
               post.save();
               req.flash('success','Comment added');
               return res.redirect('/');
       }
    }
    catch(err){
        // console.log('error in creting a comment',err);
        req.flash('error',err);
        return;
    }
   
}
//deleting a comment
module.exports.destroy=async function(req,res){
    try{
    let comment=await Comment.findById(req.params.id);

            let postId=comment.post;
            let post=await Post.findById(postId);
                let userId=post.user;
                if(post.user==req.user.id||comment.user == req.user.id){
                    comment.remove(); 
                    let postId=comment.post;
                    let post=await Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}});
                    req.flash('success','Comment deleted!');
                        return res.redirect('back');           
                }
                else{
                    req.flash('error','Unauthorized');
                    return res.redirect('back');
                }
    }
    catch(err){
        // console.log('error in deleting a comment',err);
        req.flash('error',err);
        return ;
    }       
}
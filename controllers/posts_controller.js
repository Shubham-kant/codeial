const Post=require('../models/post');
const Comment=require('../models/comment');
const Like = require('../models/like');
module.exports.create=async function(req,res){
  
    try{
        let post=await Post.create({
           content:req.body.content,
           //passing the user id.
           user:req.user._id
        });
        // console.log(req);
        //if ajax request comes
        if(req.xhr){
            
            /* if we want to populate just the name of the user 
            (we'll not want to send the password in the API), this is how we do it!*/
            post=await post.populate('user','name').execPopulate();
            //returning the son object
            return  res.status(200).json({
               data:{
                   post:post
               },
               message:'Post Created!'
           });
        }
        req.flash('success','Post published!!');
        return res.redirect('back');
    }
    catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
     

}
module.exports.destroy=async function(req,res){
    //req.params.id contains id of post to be deleted
    try{
        let post=await Post.findById(req.params.id);
            //post.user contains id of the user who posted that post.
            //req.user contains info of current logged in user.
            // .id means converting the object id into string.
            if(post.user==req.user.id){
                //deleting likes of posts before deleting posts 
                await Like.deleteMany({likeable:post,onModel:'Post'});
                //deleting likes of comments before deleting comments of posts
                await Like.deleteMany({_id: {$in: post.comments}});
                post.remove();
           
                await Comment.deleteMany({post:req.params.id});

                if (req.xhr){
                    return res.status(200).json({
                        data: {
                            post_id: req.params.id
                        },
                        message: "Post deleted"
                    });
                }
    
                req.flash('success','Post and associated comments deleted!');
                return res.redirect('back');
            }
            else{
                req.flash('error', 'You cannot delete this post!');
                return res.redirect('back');
            }
        }
    catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
}
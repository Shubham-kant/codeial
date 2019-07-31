const Comment=require('../models/comment');
const Post=require('../models/post');
const Like=require('../models/like');
// const commentsMailer = require('../mailers/comments_mailer');
const queue=require('../config/kue');
//calling thw worker file
const commentEmailWorker = require('../workers/comment_email_worker');
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
               
            comment = await comment.populate('user', 'name email').execPopulate();
            // commentsMailer.newComment(comment);
            //creating the queue and inserting job in it..
            let job=queue.create('emails',comment).save(function(err){
                  if(err){
                      console.log('error in sending to the queue');
                      return;
                  }
                  console.log('job enqueued',job.id);
            });

            if (req.xhr){
                // Similar for comments to fetch the user's id!
                
                
    
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Comment created!"
                });
            }
               req.flash('success','Comment Added!');
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
                 if((post.user==req.user.id)||(comment.user == req.user.id)){
                    //deleting likes before deleting comments 
                    await Like.deleteMany({likeable:comment,onModel:'Comment'});
                    
                    comment.remove(); 
                    let postId=comment.post;
                    let post=await Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}});
                    // send the comment id which was deleted back to the views
                    if(req.xhr){
                        return res.status(200).json({
                            data:{
                                comment_id : req.params.id
                            },
                            message:'Comment Deleted!'

                        });

                    }
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
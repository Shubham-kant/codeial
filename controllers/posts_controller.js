const Post=require('../models/post');
const Comment=require('../models/comment');
module.exports.create=async function(req,res){
  
    try{
        await Post.create({
           content:req.body.content,
           //passing the user id.
           user:req.user._id
        });
        return res.redirect('back');
    }
    catch(err){
        console.log('Error in creating a post',err);
        return;
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
                post.remove();
           
                await Comment.deleteMany({post:req.params.id});
                return res.redirect('back');
            }
            else{
                return res.redirect('back');
            }
        }
    catch(err){
        console.log('error in deleting a post',err);
        return;
    }
}
const Post=require('../../../models/post');
const Comment=require('../../../models/comment');

module.exports.index= async function(req,res){
    let posts=await Post.find({})
    .sort('-createdAt')
 //populating user field of post schema
    .populate('user')
    .populate({
    //populating comments field of post schema
       path:'comments',
       populate:{
       //populating user field of comment schema
          path:'user'
       }
    });
    return res.json(200,{
        message:'Lists of Posts',
        posts:posts
    });
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
                return res.json(200,{
                    message:'Post and associated comments deleted!!'
                });
            }
            else{
                return res.json(401, {
                    message: "You cannot delete this post!"
                });
            }
        }
    catch(err){
       console.log('********error',err);
       return res.json(500,{
           message:'internal server error'
       });
    }
}
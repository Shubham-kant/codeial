const Like=require('../models/like');
const Post=require('../models/post');
const Comment=require('../models/comment');

module.exports.toggleLike=async function(req,res){
    try{
        let likeable;
        let deleted=false;
        // /likes/toggle/?id=abcde&type=Post
        if(req.query.type=='Post'){
            likeable=await Post.findById(req.query.id).populate('likes');
        }
        // /likes/toggle/?id=abcde&type=Comment
        else{
            likeable=await Comment.findById(req.query.id).populate('likes');
        }
        //check if a like already exists
        let existingLike=await Like.findOne({
            user:req.user.id,
            likeable:req.query.id,
            onModel:req.query.type

        });
        // if a like already exists then delete it
        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();
            existingLike.remove();
            deleted=true;

        }

        else{
            // else make a new like
            let newLike=await Like.create({
                user:req.user._id,
                onModel:req.query.type,
                likeable:req.query.id
                
            });
            likeable.likes.push(newLike._id);
            likeable.save();

        }
        return res.json(200,{
            data:{
                deleted:deleted
            },
            message:'request successful'
        });

    }
    catch(err){
        console.log(err);
        return res.json(500,{
            message:'Internal Server Error'
        });

    }
}
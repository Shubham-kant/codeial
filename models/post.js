const mongoose=require('mongoose');

const postSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    //linking post schema with user model
    user:{
        type:mongoose.Schema.Types.ObjectId,
        //name of model to be linked
        ref:'User'
    },
    // include the array of ids of all comments in this post schema itself
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        //name of model to be linked
        ref:'Comment'
    }],
    //include the array of ids of all likes in this post schema itself
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Like'
    }]
   
},{
    timestamps:true

});
const Post=mongoose.model('Post',postSchema);
module.exports=Post;
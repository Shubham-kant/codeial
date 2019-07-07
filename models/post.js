const mongoose=require('mongoose');

const postSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    //linking post schema with user schema
    user:{
        type:mongoose.Schema.Types.ObjectId,
        //name of schema to be linked
        ref:'User'
    },
    // include the array of ids of all comments in this post schema itself
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        //name of schema to be linked
        ref:'comment'
    }]
   
},{
    timestamps:true

});
const Post=mongoose.model('Post',postSchema);
module.exports=Post;
const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        
        unique:true
    },
    name:{
        type:String,
        required:true
    }

},{
    //to add a feature of 'created at' and 'updated at'.
    timestamps:true
});
const User=mongoose.model('User',userSchema);
module.exports=User;
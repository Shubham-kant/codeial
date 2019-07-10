const Post=require('../models/post');
const User=require('../models/user');
//module.exports.action_name= function(req,res){}
module.exports.home=function(req,res){
   // Post.find({},function(err,posts){
   //     if(err){
   //        console.log('error in finding the posts');
   //        return;
   //     }
   //     return res.render('home',{
   //        title:'home',
   //        posts:posts
   //     });
   // })
   
   //here user is the field in post schema 
   //we have populated the user field
   //populate the post of each user
   Post.find({})
   //populating user field of post schema
   .populate('user')
   .populate({
      //populating comments field of post schema
      path:'comments',
      populate:{
         //populating user field of comment schema
         path:'user'
      }
   })
   .exec(function(err,posts){
        if(err){
           console.log('error in finding the posts');
           return;
        }
        //finding all the users to show them on screen
        User.find({},function(err,users){
         return res.render('home',{
            title:'home',
            posts:posts,
            all_users:users

        });
        
        });



   })
 
}

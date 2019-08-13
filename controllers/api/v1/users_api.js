const User=require('../../../models/user');
const env=require('../../../config/environment');
//this library is used to generate a token
const jwt=require('jsonwebtoken');
module.exports.createSession=async function(req,res){
    try{
        let user=await User.findOne({email:req.body.email});
        //if user is not found
        if(!user || user.password!=req.body.password){
            return res.json(422,{
                message:'Invalid Username/Password'
            });
        }
        //if user is found
        //returning token
        return res.json(200,{
            message:'Sign In successful ,here is your token please keep it safe!',
            data:{
                token:jwt.sign(user.toJSON(), env.jwt_secret , {expiresIn:'100000'})
            }
        });
    }
    catch(err){
        console.log('********error',err);
        return res.json(500,{
            message:'internal server error'
        });
     }

    
}
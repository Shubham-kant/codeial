module.exports.index=function(req,res){
    return res.json(200,{
        message:'Lists of Posts',
        posts:[]
    });
}
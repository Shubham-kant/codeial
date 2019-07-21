const express=require('express');
const router=express.Router();
const passport=require('passport');
const postsApi=require('../../../controllers/api/v1/posts_api');


router.get('/',postsApi.index);
/*{session:false} added to prevent session cookies from being generaed as we will 
use token to do this*/
router.delete('/:id',passport.authenticate('jwt',{session:false}),postsApi.destroy);

module.exports=router;
{
    let createComment=function(){
        let newCommentForm=$(`#post-${post._id}-comments-form`);
    
        console.log(newCommentForm);

        newCommentForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'post',
                url:'/comments/create',
                data:newCommentForm.serialize(),
                success:function(data){
                    // console.log(data);
                    let newComment=newCommentDom(data.data.comment);
                    $(' .post-comments-list>ul').prepend(newComment);
                    newLike($(' .toggle-like-button',newComment));
                    iterate_comment();
                    deleteComment($(' .delete-comment-button', newComment));
                    
                    // new ToggleLike($(' .toggle-like-button', newComment));
                    // newLike($(' .toggle-like-button',newComment));
                    new Noty({

                        theme:'relax',
                        type:'success',
                        text:'Comment Added!!!',
                        layout:'topRight',
                        timeout:1500


                    }).show();
                },error:function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
    let newCommentDom=function(comment){
        return $(`
        <li id="comment-${ comment._id }">
            <p>
                <small>
                    
                ${ comment.user.name }
                </small>
                <div>
                ${ comment.content }
                </div>
                
                <small>
                            
                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${comment._id}&type=Comment">
                    0 Likes
                </a>
            
            </small>
                <div>
                    
                <a class="delete-comment-button" href="/comments/destroy/${ comment._id }">x</a>
                        
                </div>
            </p>
            </li>`);
    }
    //method to delete any comment 
    // method to iterate over all post  delete button
    let iterate_comment=function(){
        let loop=$('.delete-comment-button');
        for(i of loop ){
            deleteComment(i);
        }
    }
   
    let deleteComment=function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                
                success:function(data){
                    console.log(data);
                    $(`#comment-${data.data.comment_id}`).remove();
                    new Noty({

                        theme:'relax',
                        type:'success',
                        text:'Comment deleted!!!',
                        layout:'topRight',
                        timeout:1500


                    }).show();
                },error:function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
    let newLike=function(likeLink){
        $(likeLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type:'post',
                url:$(likeLink).prop('href'),
                
                success:function(data){
                    //parseInt() is used to convert string into int.
                    let likeCount=parseInt($(likeLink).attr('data-likes'));
                    console.log(likeCount);
                    console.log(data);
                    if(data.data.deleted==true){
                        likeCount-=1;
                    }
                    else{
                        likeCount+=1;
                    }
                    console.log(likeCount);
                    $(likeLink).attr('data-likes',likeCount);
                    $(likeLink).html(`${likeCount} likes`);

                },error:function(err){
                    console.log(err.responseText);

                }
            });
        });
    }

    
    createComment();
    
    // $('.new-comment-form').each(function(){
    //     let self = this;
    //     console.log('this means:',self);
    //     createComment(self);
    // });



    iterate_comment();
    
}


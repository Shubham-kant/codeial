{
    let createComment=function(){
        let newCommentForm=$('#new-comment-form');
        newCommentForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'post',
                url:'/comments/create',
                data:newCommentForm.serialize(),
                success:function(data){
                    console.log(data);
                    let newComment=newCommentDom(data.data.comment);
                    $(' .post-comments-list>ul').prepend(newComment);
                    deleteComment($(' .delete-comment-button', newComment));
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
                <div>
                    
                <a class="delete-comment-button" href="/comments/destroy/${ comment._id }">x</a>
                        
                </div>
            </p>
            </li>`);
    }
    //method to delete any comment 
    // method to iterate over all post  delete button
    let iterate_comment=function(){
        var loop=$('.delete-comment-button');
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


    createComment();

    iterate_comment();
    
}
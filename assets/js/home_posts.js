{   
    //method to send the form data for new post using AJAX..
    let createPost=function(){
        let newPostForm=$('#new-post-form');
        newPostForm.submit(function(e){
            //submit button disabled by this statement..
            e.preventDefault();

            $.ajax({
                type:'post',
                url:'/posts/create',
                //this converts data into json format i.e key value pairs
                data:newPostForm.serialize(),
                success:function(data){
                    //post here comes from the returned json data in create action 
                    let newPost=newPostDom(data.data.post);
                    //new post will come at the top now.. i.e prepend
                    $('#posts-list-container>ul').prepend(newPost);
                    /*passing the 'a' tag having class 'delete-post-button' from 
                    newpost function.
                    passing this 'a' tag to deletePost function*/
                    deletePost($(' .delete-post-button', newPost));
                    newLike($(' .toggle-like-button',newPost));
                    
                    
                    new Noty({

                        theme:'relax',
                        type:'success',
                        text:'Post Added!!!',
                        layout:'topRight',
                        timeout:1500


                    }).show();

                },error:function(error){
                    /*read-only XMLHttpRequest property responseText returns
                      text received from a server following a request being sent.
                    */ 
                    console.log(error.responseText);
                }
            });
        });
    }
    // method to create a post in DOM
    //post here comes from the returned json data in create action
    let newPostDom=function(post){
        //using backtick here
        return $(`
        <li id="post-${ post._id }" class="post-code">
        <section class="full-post">
         
            <p class="post-user-info">${ post.user.name }</p>
           
            <p class="post-content">${ post.content }
                
            <!--checking if current logged in user id with the user id who created the post-->

            <a class="delete-post-button" href="/posts/destroy/${ post._id }">x</a>
            
            </p>
            
            <small class="like-content">
                            
            <a class="toggle-like-button" toggle-like="false" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
            <i class="fas fa-thumbs-up"></i>  0 likes  
            
            </a>
        
            </small>
        </section>    
        
            
        
            
        
            <div class="post-comments">
                <div class="post-comments-list">
                    <ul id="post-comments-${ post._id}">
                        <!-- here 'post' in 'post.comment' is the iterating  varible in the above for loop-->
                
                    </ul>
                </div>
             
         
        
                <form action="/comments/create" id="post-<%= post._id %>-comments-form" method="POST">
                    <input type="text" name="content" placeholder="Type here to add a comment..." required>
                       <!-- sending the id of the post below which comment needs to be added -->
                        <input type="hidden" name="post" value="${ post._id }">
                    <input type="submit" value="Add Comment">
        
                </form>
        
           
                
            </div>
        </li>`)
    
    }
    // method to iterate over all post  delete button
    let iterate_post=function(){
        var loop=$(' .delete-post-button');
        for(i of loop){
            deletePost(i);
        }
    }
        


    // method to delete a post from DOM
    //deleteLink contains 'a' tag 
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                //grabs the link in href attribute from 'a' tag..
                url: $(deleteLink).prop('href'),
                success: function(data){
                    //deleting whole post 
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({

                        theme:'relax',
                        type:'success',
                        text:'Post Deleted!!!',
                        layout:'topRight',
                        timeout:1500


                    }).show();

                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }
    let newLike=function(likeLink){
     
        $(likeLink).click(function(e){
            e.preventDefault();
            // if($(likeLink).attr('toggle-like')=='false'){
            //     $(likeLink).attr('toggle-like','true');
            //     $(likeLink).css({
            //         color:"blue"
            //     })
            // }
            // else{
            //     $(likeLink).attr('toggle-like','false');
            //     $(likeLink).css({
            //         color:"#909090"
            //     })
            // }
            
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
                   
                    if($(likeLink).attr('toggle-like')=='false'){
                        $(likeLink).attr('toggle-like','true');
                        $(likeLink).css({
                            color:"blue"
                        })
                    }
                    else{
                        $(likeLink).attr('toggle-like','false');
                        $(likeLink).css({
                            color:"#909090"
                        })
                    }
                    



                },error:function(err){
                    console.log(err.responseText);

                }
            });
            
        });
    }
    let iterate_Likes=function(){
        let loop=$(' .toggle-like-button');
        for(i of loop){
            newLike(i);
        }
    }
    createPost();
    iterate_post();
    iterate_Likes();

}
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
        <li id="post-${ post._id }">
         
            <p>${ post.user.name }</p>
           
            <p>${ post.content }
        
            <!--checking if current logged in user id with the user id who created the post-->

            <a class="delete-post-button" href="/posts/destroy/${ post._id }">x</a>
            
        
            </p>
        
            <div class="post-comments">
             
         
        
                <form action="/comments/create" method="POST">
                    <input type="text" name="content" placeholder="Type here to add a comment..." required>
                       <!-- sending the id of the post below which comment needs to be added -->
                        <input type="hidden" name="post" value="${ post._id }">
                    <input type="submit" value="Add Comment">
        
                </form>
        
           
                <div class="post-comments-list">
                    <ul id="post-comments-${ post._id}">
                        <!-- here 'post' in 'post.comment' is the iterating  varible in the above for loop-->
                        
                    </ul>
                </div>
            </div>
        </li>`)
    }
    createPost();
}
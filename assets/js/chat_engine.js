class chatEngine{
    constructor(chatBoxId,userEmail){
        this.chatBoxId=$(`#${chatBoxId}`);
        this.userEmail=userEmail;
        console.log('io',io);
        
        this.socket=io.connect('http://localhost:5000');
        // console.log('this.socket: ',this.socket);
        if(this.userEmail){
            this.connectionHandler();

        }
        console.log('class',this);


    }
    connectionHandler(){
        console.log('function',this);
        let self=this;
        this.socket.on('connect',function(){
            console.log('connection established using sockets');
        });
        self.socket.emit('join_room',{
            user_email:self.userEmail,
            chatroom:'codeial'

        });
        self.socket.on('user_joined',function(data){
            console.log('a user joined',data);
        });
        // CHANGE :: send a message on clicking the send message button
        
        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val();
            // $("#user-chat-box").stop().animate({ scrollTop: $("#user-chat-box")[0].scrollHeight}, 1000);

            if (msg != ''){
                $('#chat-message-input').val('');
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'codeial'
                });
               
                
            }
        });
        //sending request for broadcasting if a user presses any key during chat
        $('#chat-message-input').on('keypress',function(){
            self.socket.emit('typing',{
                user_email:self.userEmail
            });

        });
        //receiving request of broadcasting msg to other users 
        self.socket.on('typing',function(data){
            console.log('data is',data.user_email);
            $('#feedback').html(data.user_email+'<i>is typing a message<i>')
        });
        //receiving the receieve_message request
        self.socket.on('receive_message',function(data){
            console.log('message recieved ',data.message);

            $('#feedback').html('');
            

            let newMessage=$('<li>');
            let messageType='other-message';

            if(self.userEmail==data.user_email){
                messageType='self-message';
            }
            newMessage.append($('<span>',{
                'html':data.message
            }));
            newMessage.append($('<sub>',{
                'html':data.user_email
            }));
            newMessage.addClass(messageType);
            $('#chat-messages-list').append(newMessage);
            

        })
        

    }

}
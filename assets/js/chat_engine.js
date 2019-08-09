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

            if (msg != ''){
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'codeial'
                });
            }
        });
        self.socket.on('receive_message',function(data){
            console.log('message recieved ',data.message);
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
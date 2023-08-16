const { Server } = require("socket.io");

const io = new Server({
    cors: {
        origin: "*",
    }
});

const meetings = []

io.on("connection", (socket) => {

    socket.emit('created-meeting',meetings)

    // socket.emit(meetings)
    socket.on('create-meeting', (meetingId) => {
        console.log('创建会议', meetingId)
        if(!meetings.includes(meetingId)){
            meetings.push(meetingId)
        }
        socket.emit('created-meeting',meetings)
    })

    socket.on('join-meeting', (meetingId) => {
        console.log('加入会议', meetingId);
        socket.join(meetingId)
        
        socket.to(meetingId).emit('new-chat', '欢迎加入聊天')
        socket.emit('joined-meeting')
    })

    socket.on('send-chat', (meetingId, chat) => {
        console.log('发送消息',meetingId, chat);
        socket.broadcast.to(meetingId).emit('new-chat', chat)
    })
});

io.listen(3000);
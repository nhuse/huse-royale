const server = require('http').createServer()
const { get_Current_User, user_Disconnect, join_User } = require("./users");

const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:4000",
        methods: ["GET", "POST"]
    }
})

io.on('connection', (socket) => {
    console.log('New client connected')
    socket.on('JOIN_ROOM', (data) => {
        const p_user = join_User(socket.id, data.username, data.roomId)
        console.log(socket.id, "=id")
        socket.join(p_user.room)

        socket.emit("message", {
            username: p_user.username,
            text: `Welcome ${p_user.username}`
        })

        socket.broadcast.to(p_user.room).emit("message", {
            username: p_user.username,
            text: `${p_user.username} has joined the chat`,
        });
    })

    socket.on("sendMessage", (data) => {
        const p_user = get_Current_User(socket.id)
        console.log(data.text)
        io.to(p_user.room).emit("message", {
            username: p_user.username,
            text: data.text
        })
    })

    socket.on("disconnect", () => {
        const p_user = user_Disconnect(socket.id)
        if(p_user) {
            io.to(p_user.room).emit("message", {
                username: p_user.username,
                text: `${p_user.username} has left the chat`,
            });
        }
    })

    
})
server.listen(9000, () => {
    console.log('Server listening on port 9000')
})
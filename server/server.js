const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors")

const ChatModel = require("./model").getModel("chat");
const apiRouter = require("./apiRoute");

const app = express();
const server = require("http").server(app)
const sockets = {}
const io = require("socket.io")(server)

io.on("connection", function(socket) {
    const userid = socket.handshake.query.userid
    if(!userid) {
        return;
    }
    const saveSocket = sockets[userid]
    if (saveSocket) {
        delete sockets[userid]
        saveSocket.disconnect()
    }
    sockets[userid] = socket
    console.log(socket)
    console.log("客户端连接上了服务器");
    socket.on("sendMsg", function({from, to, content}) {
        console.log("服务端接受到了消息", from , to, content)

        const chat_id = [from, to].sort().join("_");
        const create_time = Date.now();
        const chatModel = new ChatModel({chat_id, from, to, create_time, content})
        chatModel.save(function(err, chatMsg) {
            console.log(err, chatModel, {from ,to, content, chat_id, create_time})
            sockets[from] && sockets[from].emit("receiveMsg", chatMsg)
            sockets[to] && sockets[to].emit("receiveMsg", chatMsg)
            
        })
    })
})

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true  // 是否带cookie
}))
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use("/api", apiRouter);

server.listen(4000, function() {
    console.log("server is runnin in 4000")
});


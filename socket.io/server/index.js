const {Server}=require("socket.io")
const auth =require("../server/middlewares/auth")
const messageHandler = require("./controllers/message")
const example=require("../server/middlewares/examplemiddleware")
const io=new Server (8080,{cors:{origin:"*"}})
const clients={}
const users=io.of("/users")
const admin=io.of("/admin")
users.on("connection",(socket)=>{
    console.log("from users")

})
admin.on("connection",(socket)=>{
    console.log("from admin")

})
io.use(auth)
io.on("connection",(socket)=>{
    console.log(socket.user)
    socket.use(example)

    const user_id=socket.handshake.headers.user_id
    clients[user_id]={socket_id:socket.id,user_id}
    console.log(clients)
    messageHandler(socket,io)
    socket.on("error",(error)=>{
        socket.emit("error",{error:error.message})
    })
  
    socket.on("disconnect",()=>{
        console.log(socket.id)
for(const key in clients){
    if(clients [key].socket_id===socket.id){
        delete clients [key]
    }
}    
console.log(clients)
    
    })

})
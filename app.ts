import express , {Application} from "express"
import * as http from 'http'
import {Socket  , Server } from 'socket.io'
import * as path from 'path';
import { Room } from "./Room";

const app : Application = express();
const server = http.createServer(app);

//read file 
app.use(express.static(path.join(__dirname, "public")));

server.on("error", ()=>{
       console.log("server error")
})

const io = new Server(server);
const room = new Room();

io.on('connection', async  (socket : Socket)=>{
   const roomId : string  =  await room.join();
    await  socket.join(roomId);

    socket.on("disconnect", async ()=>{
       await room.leave(roomId);
    })


    socket.on("send-message", async (message) =>{
          socket.to(roomId).emit("recieve-message", message)
    })
});



app.listen(3001 , ()=>{
    console.log("Server is working")
})
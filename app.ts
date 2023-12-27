import express , {Application} from "express"
import * as http from 'http'
import {Socket  , Server } from 'socket.io'

const app : Application = express();
const server = http.createServer(app);


server.on("error", ()=>{
       console.log("server error")
})

const io = new Server(server);


io.on('connection', (socket : Socket)=>{
       console.log(`${socket.id} connected to our server`)

       socket.emit("send-message", (data :  string )=>{
             console.log(data);

       })


       socket.on("recieve-message", (data : string) =>{
              console.log(data)
       });
       
});



app.listen(3001 , ()=>{
    console.log("Server is working")
})
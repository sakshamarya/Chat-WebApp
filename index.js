const express = require('express');
const app=express();
const http=require('http');
const server=http.createServer(app);
// socket.io
const {Server}=require("socket.io");
const io=new Server(server);


app.get('/',(req,res)=>{
    // res.sendFile(__dirname+'\\index.html');
    // console.log(__dirname+'\\index.html');
    res.sendFile(__dirname+'/index.html');
});

// for sending external css, we need to sendFile on request
app.get('/style.css',(req,res)=>{
    // res.sendFile(__dirname+'\\style.css');
    // console.log(__dirname+'\\style.css');

    res.sendFile(__dirname+'/style.css');
});

// similarly, we also have to send the local images like we did for css
app.get('/images/fieldbg1.jpg',(req,res)=>{
    // res.sendFile(__dirname+'\\images\\fieldbg1.jpg');
    // console.log(__dirname+'\\images\\fieldbg1.jpg');
    res.sendFile(__dirname+'/images/fieldbg1.jpg');
});

io.on('connection',(socket)=>{
    console.log('a user is connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });


    socket.on('chat message',(name,msg)=>{
        console.log(name+': '+msg);
        // io.emit('chat message',msg); // to broadcast the message, we will capture this on client side to display on message window
        socket.broadcast.emit('chat message',name,msg); // this will broadcast msg only to other users and not the one who is sending.
    });


});


server.listen(process.env.PORT || 3000,()=>{
    console.log('listening on port 3000');
});
import express from "express";
import http from "http";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import {Server} from "socket.io";
import router from "./routes.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));




io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    })
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    })
})

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });

// app.post('/', (req, res) => {

// })


app.use(function(req,res,next){
    req.io = io;
    next();
})


app.use("/", router);



httpServer.listen(5000, () => {
    console.log('listening on port 3000');
})
import Router from "express";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const router = Router();


router.get('/', async (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

router.post('/', async (req, res, next) => {
    console.log("test post");
    // console.log(req.body.msg);
    req.io.emit("chat message", "hello from postman")
    // (socket)=>{
    //     socket.on("chat message", io.emit("hello from post man"))
    // });
    res.send({"msg":"socket sent"})
}) 

export default router
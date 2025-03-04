import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';


import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js'
import connectDB from './db/connectMongoDB.js';
import { app, server } from './socket/socket.js';

const PORT = process.env.PORT || 5000

const __dirname = path.resolve();

dotenv.config();

app.use(express.json());   // to parse the incoming request with json payload (from req.body)
app.use(cookieParser()); // for parseing the incoming cookie from req.cookie

app.use('/api/auth',authRoutes);
app.use('/api/messages',messageRoutes);
app.use('/api/users',userRoutes);

app.use(express.static(path.join(__dirname,"/frontend/dist")))

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
})
// app.get('/',(req,res)=>{
//     // root route
//     res.send("!!Hello word !!")
// })


server.listen(PORT,()=>{
    connectDB();
    console.log(`The server is running at http://localhost:${PORT}`)
})


// this looks ugly and too much code in same file

// app.get('/api/auth/signup',(req,res)=>{
//     console.log("signup route");
// })

// app.get('/api/auth/login',(req,res)=>{
//     console.log("signup route");
// })

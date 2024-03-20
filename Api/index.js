const express = require('express');
const app = express();
const mongoose = require('mongoose');
const env = require('dotenv').config();
const cors = require('cors');
const  cookieParser = require("cookie-parser");
const path = require('path');

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors({
    origin:["http://localhost:3000","http://localhost:3001"],
    credentials:true
}));

// router imports
const authRouter = require('./routers/auth');
const userRouter = require('./routers/user');
const roomRouter = require("./routers/room")
const invitationRouter = require("./routers/invitation")


// routes
app.use('/image', express.static(path.join(__dirname, '')));
app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);
app.use("/api/room",roomRouter);
app.use("/api/invitation",invitationRouter);

// Database configuration
mongoose.connect(process.env.DB_URL)
.then(()=>console.log("DB conencted."))
.catch((error)=>console.log(error))

// server configuration
app.listen(process.env.PORT,()=>{
    console.log('server is running');
})
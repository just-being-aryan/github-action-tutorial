/*
Setup Express app

Apply middlewares (CORS, cookie-parser, JSON parsing)

Connect to MongoDB

Set up basic routes

Handle 404 and global errors



*/

require('dotenv').config(); //loads env variables


const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const connectDB = require('./config/db')
const app =express();

//Middlewares

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin : "https://localhost:5173",
    credentials : true
}))


//Routes
const authRoutes = require('./routes/auth.routes');
const resumeRoutes = require('./routes/resume.routes');

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/resume', resumeRoutes)

//404 Route Handler


app.use("*", (req,res) => {
    res.status(400)
    .json({
        success: false,
        message : 'API endpoint not found'
    })
})

//Global Error Handler
app.use((err,req,res,next) => {
    console.log("Global Error Handler",err)

    res.status(err.status || 500)
    .json({
        success: false,
        message : err.message || "Internal Server Error",
    })
})

//Start Server After DB Connection

const PORT = process.env.PORT || 8000;

connectDB().then( () => {
    app.listen(PORT ,() => {
        console.log(`\n Server Running on PORT ${PORT}`);
    })
}).catch((err) => {
    console.log("Failed to connect to database",err)
})
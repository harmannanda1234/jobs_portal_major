const express =require('express')
const Arouter = require('./routes/authroutes')
const app = express()
const {protected}=require("./middlewares/verifytoken")
const AdminRouter = require('./routes/admin')
const Jrouter = require('./routes/jobsroutes')
const cors = require('cors')
require('dotenv').config()


//middlewares
app.use(cors({
    origin: 'http://localhost:5173', // change to your frontend origin
    credentials: true, methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//routers
app.use(Arouter)
app.use("/jobs",protected, Jrouter);
app.use("/admin", protected, AdminRouter);

app.listen(process.env.API_PORT,process.env.API_HOST,()=>{
    console.log(`server up and running at PORT ${process.env.API_PORT}`)
})
require("dotenv").config()
const express=require("express");
const router=require("./router/auth-router")
const connectdb=require("./utils/db");
const cors=require("cors");
const bodyParser = require('body-parser');

const app=express();
// "https://auth-project-topaz.vercel.app" || 
// https://auth-project-6yea.vercel.app
const PORT="https://auth-project-topaz.vercel.app" || 5000;
const corsOptions={
    origin:"https://auth-project-6yea.vercel.app",
    methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials:true
}
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.json())
app.use(cors(corsOptions))
app.use("/api/",router)


app.get("/",(req,res)=>{
    res.status(200).send("Hello");
})
connectdb().then(()=>{
app.listen(PORT,()=>{
    console.log(`server is running at port : ${PORT}`)
})
})
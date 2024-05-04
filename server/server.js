require("dotenv").config()
const express=require("express");
const router=require("./router/auth-router")
const connectdb=require("./utils/db");
const cors=require("cors");
const bodyParser = require('body-parser');

const app=express();

const PORT=process.env.BACKPORT;
const corsOptions={
    origin:process.env.FRONTURL,
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
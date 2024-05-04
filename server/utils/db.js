const mongoose=require("mongoose");

const URI=process.env.MONGODBURI

const connectdb=async()=>{
    try {
        await mongoose.connect(URI);
        console.log("DB conected successfully")
    } catch (error) {
        console.log("DB connection failed");
        process.exit(0)
    }
}

module.exports=connectdb
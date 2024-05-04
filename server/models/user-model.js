const mongoose=require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true,
    },
    email: {
        type: String,
        // required: true,
        unique: true
    },
    uid: {
        type: String,
        // required: true,
        unique: true
    },

    profilePicture:{
        type:String,
        default:""
    },
})


const User = new mongoose.model("Person", userSchema);
module.exports = User;
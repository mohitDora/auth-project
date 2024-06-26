const User = require("../models/user-model");
const cloudinary = require("../utils/cloudinary")

const register = async (req, res) => {
    try {

        const { name, email, gender, profilePicture, uid } = req.body;
        let result;
        if(profilePicture){
            result = await cloudinary.uploader.upload(profilePicture,
                { folder: "test", width: 300, height: 300, crop: "fill" });
            console.log(result)
        }
        
        // const result1 = await cloudinary.uploader.upload(coverPicture,
        //     { folder: "test", width: 300, height: 300, crop: "fill" });
        // console.log(result)

        const user = await User.create({ name, email, gender, profilePicture:result.secure_url || "", uid })
        console.log(user)
        res.status(200).json({ user })
    } catch (error) {
        res.status(501).json("server error")
    }
}

const user = async (req, res) => {
    try {
        console.log(req.params)
        const { uid } = req.params
        const isPresent = await User.findOne({ uid });

        res.status(200).json(isPresent)
    } catch (error) {
        console.log(error)
    }

}

module.exports = { register, user }
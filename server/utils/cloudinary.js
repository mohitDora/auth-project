const cloudinary=require("cloudinary").v2
          
cloudinary.config({ 
  cloud_name: 'ddchidkne', 
  api_key: '311139629439813', 
  api_secret: '7dkX0ipfIEaHm6KjwANlgrho9wA' 
});

module.exports=cloudinary;
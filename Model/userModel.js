const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    profileImage:String,
    phoneNo:String,
    Country:String,
    Dateofbirth:String,
    Gender:String,
    city:String,
    randomToken:String,
});


const datacolllection = new mongoose.model("userdata", schema);



module.exports = {datacolllection};


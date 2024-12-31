const express = require("express");
const body_parser = require("body-parser");
const routs = require("./routes/router.js");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(express.static(path.resolve(path.join(__dirname,"public"))));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(body_parser.json());
app.use(routs); 

const db = process.env.MONGODB_URL;
mongoose.connect(db).then(() => {
    console.log("Connected");
}).catch((err) => {
    console.log("Not connect " + err);
});
const port = process.env.PORT;
app.use(cors({
    origin:"*",
    withCredentials:true,
}))
app.listen(port,()=>{
    console.log("Server is riunning on PORT", port);
});


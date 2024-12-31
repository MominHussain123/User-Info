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

app.use(cors({
    origin:"https://user-info-4jzj27k9u-hafizmominhussain222-gmailcoms-projects.vercel.app",
    withCredentials:true,
}))
const db = process.env.MONGODB_URL;
mongoose.connect(db).then(() => {
    console.log("Connected");
}).catch((err) => {
    console.log("Not connect " + err);
});
const port = process.env.PORT;
app.listen(port,()=>{
    console.log("Server is riunning on PORT", port);
});


const routs = require("express").Router();
const authToken = require("../middleware/auth.js")

const routadate = require("../Controller/usercontroller.js");

routs.post("/signup", routadate.upload.single('profileImage'), routadate.signup);
// routs.post("/signup", routadate.upload.array('profileImage',12), routadate.signup);
routs.post("/login", routadate.login);

routs.put("/update/:id", routadate.Update);
routs.delete("/delete/:id", routadate.deletedata);
// routs.get("/data", authToken, routadate.getData);
routs.get("/data", routadate.getData);

routs.get("/profileget/:id", routadate.profileget);

routs.post("/forgotpassword", routadate.forgotpassword);
routs.post("/resetpassword", routadate.resetpassword);

routs.post("/todoadd", routadate.todoadd);
routs.put("/todoupdate/:id", routadate.todoUpdate);
routs.delete("/tododelete/:id", routadate.tododelete);
routs.get("/getalltodo", routadate.getalltodo);

module.exports = routs;
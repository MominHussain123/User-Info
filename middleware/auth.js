
const jwt = require("jsonwebtoken");
const seckey = "Mominhussain";

const authToken = async (req, resp, next) => {

    try {

        const authHeader = req.headers["authorization"];
        if (!authHeader) return resp.send("Auth not define");

        const token = authHeader.split(" ")[1];

        if (!token) return resp.send("access denied");

        // jwt.verify(token,seckey,(err,data)=>{
        jwt.verify(token, seckey, (err, user) => {
            if (err) return resp.send({ err: err });
            // req.user=data;
            req.userId = user.userId
            next()
        })
    }
    catch (error) {
        resp.status(500).send({ message: error.message })  
    }
}
module.exports = authToken

const mongoose = require("mongoose");


const todoschema = new mongoose.Schema({
    todo: {
        type: String,
    },
    userId: mongoose.Types.ObjectId
})

const todocolllection = new mongoose.model("list", todoschema);

module.exports = {
    todocolllection
};

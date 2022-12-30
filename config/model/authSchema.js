const mongoose = require("mongoose");



const MODEL_USER = new mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required:true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})




module.exports = mongoose.model("users",MODEL_USER);
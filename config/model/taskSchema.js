const {Schema,model} = require("mongoose");

const  MODEL_TASK = new Schema({
    task:{
        type: String,
        trim: true,
        required: true
    },
    estado: {
        type: Boolean,
        default: false
    },
    userId:{
        type: Schema.Types.ObjectId,
        model: "users",
        required: true
       
    },
    projectId:{
        type: Schema.Types.ObjectId,
        model: "projects",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


module.exports = model("tasks",MODEL_TASK);
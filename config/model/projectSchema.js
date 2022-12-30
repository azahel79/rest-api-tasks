const { Schema, model } = require("mongoose");


const MODEL_PROJECT = new Schema({
     project: {
          type: String,
          trim: true
     },
     userId: {
         type: Schema.Types.ObjectId,
         model: "users"
     },
     createdAt: {
         type: Date,
         default: Date.now
     }
})

module.exports = model("projects",MODEL_PROJECT);
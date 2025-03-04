import { Types } from "mongoose";
import mongoose, {Schema, model } from "mongoose";

const todoSchema = new Schema({
    title:{
        type:Schema.Types.String,
        required:true
    },
    status:{
        type:Schema.Types.String,
        enum:["pending","completed"],
        default:"pending"
    },
    category:{
        type:Schema.Types.String,
        required:true,
    },
    dueDate:{
        type:Schema.Types.String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});


const Todo = model("Todo",todoSchema);

module.exports = Todo
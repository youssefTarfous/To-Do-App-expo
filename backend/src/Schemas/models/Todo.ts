import mongoose  from "mongoose";

const todoSchema = new mongoose.Schema({
    title:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    status:{
        type:mongoose.Schema.Types.String,
        enum:["pending","completed"],
        default:"pending"
    },
    category:{
        type:mongoose.Schema.Types.String,
        required:true,
    },
    dueDate:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});


const Todo = mongoose.model("Todo",todoSchema);

export default Todo
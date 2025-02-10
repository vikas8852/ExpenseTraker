import mongoose from "mongoose";
const expenseSchema=new mongoose.Schema({
    description:{
        type:String,
        require:true
    },
    amount:{
        type:Number,
        require:true
    },
    category:{
        type:String,
        require:true
    },
     done:{
        type:Boolean,
        default:false
    }, 
   userId:{
        type:mongoose.Schema.Types.ObjectId,
       ref:'User'
    }
},{timestamps:true})
export const Expense=mongoose.model("Expense",expenseSchema);
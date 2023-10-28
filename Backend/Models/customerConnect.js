const mongoose=require("mongoose")
const customerModel=new mongoose.Schema({
    username:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        trim:true
    },
    confirmPassword:{
        type:String,
        trim:true
    }
})
const customerConnect=new mongoose.model("ToDoList",customerModel)
module.exports=customerConnect
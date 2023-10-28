const mongoose=require("mongoose")
const todoModel=new mongoose.Schema({
    title:{
        type:String,
        trim:true
    },
    description:{
        type:String,
        trim:true
    },
    date:{
        type:String,
        trim:true
    },
    time:{
        type:String,
        trim:true
    }
})
const todoConnect=new mongoose.model("todoActivities",todoModel)
module.exports=todoConnect
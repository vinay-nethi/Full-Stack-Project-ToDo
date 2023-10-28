const dotenv=require("dotenv")
const express=require("express")
const jwt=require("jsonwebtoken")
const cors=require("cors")
const middleware=require("./middleware.js")
const customerModel=require('./Models/customerConnect.js')
const todoModel=require("./Models/Todolist.js")
const mongoose=require("mongoose")

dotenv.config()
const app=express()

//middleware
app.use(express.json())
app.use(cors())

//database connection
const Db_URL=process.env.Db_URL
mongoose.connect(Db_URL).then((database,error)=>{
    try{
        console.log("database connected")
    }catch(e){
        console.log(e)
    }
})
let regex=/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/



//post route
app.post("/registration",async(req,res)=>{
    try{
        const {username,email,password,confirmPassword}=req.body
        let validEmail=regex.test(email)
        let present=await customerModel.findOne({email})
        if(present){
            return res.status(400).json({message:"email already exists"})
        }
        else if(username===""){
            return res.status(400).json({message:"enter username"})
        }
        else if(email===""){
            return res.status(400).json({message:"enter email"})
        }
        else if(!validEmail){
            return res.status(400).json({message:"invalid email"})
        }
        else if(password===""){
            return res.status(400).json({message:"enter password"})
        }
        else if(confirmPassword===""){
            return res.status(400).json({message:"confirm your password"})
        }
        else if(password!==confirmPassword){
            return res.status(400).json({message:"enter password correctly"})
        }
        else{
            await customerModel.create(req.body)
            return res.status(200).json({message:"registered successfully"})
        }

    }catch(e){
        console.log(e)
    }
})

//login
app.post("/login",async(req,res)=>{
    try{
        const {email,password}=req.body
        let exists=await customerModel.findOne({email})
        if(!exists){
            return res.status(400).json({message:"email does not exists"})
        }
        else if(email===""){
            return res.status(400).json({message:"enter email"})
        }
        else if(password===""){
            return res.status(400).json({message:"enter password"})
        }
        else if(exists.password!=password){
            return res.status(400).json({message:"incorrect password"})
        }else{
            const payload={
                user:{
                    id:exists.id
                }
            }
            jwt.sign(payload,"jwtoken",{expiresIn:2400000},(err,token)=>{
                try{
                    if(err) throw err
                    else{
                        res.json({token})
                    }
                }catch(e){
                    console.log(e)
                }
            })
        }

    }catch(e){
        console.log(e)
    }
})

//todo post api
app.post("/addtodo",async(req,res)=>{
    try{
        const{title,description,date,time}=req.body
        await todoModel.create(req.body)
        return res.status(200).json({message:"todo created"})
    }catch(e){
        console.log(e)
    }
})

//todo patch
app.patch("/addtodo/:id",async(req,res)=>{
    try{
        await todoModel.findByIdAndUpdate(req.params.id,req.body)
        return res.status(200).json({message:"todo updated"})
    }catch(e){
        console.log(e)
    }
})

//todo delete api
app.delete("/:id",async(req,res)=>{
    try{
        await todoModel.findByIdAndDelete(req.params.id)
        return res.status(200).json({message:"todo deleted"})
    }catch(e){
        console.log(e)
    }
})

//todo get api
app.get("/todo",middleware,async(req,res)=>{
    try{
        let exists=await customerModel.findById(req.user.id) 
        if(!exists){
            return res.status(400).json({message:"user not found"})
        
    }else{
        const allTodos=await todoModel.find()
        return res.status(200).send(allTodos)
 
    }
    }catch(e){
        console.log(e)
    }
})

//server connection
app.listen(8080,()=>{
    console.log("port listening on 8080")
})
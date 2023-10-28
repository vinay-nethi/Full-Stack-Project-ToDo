import axios from "axios"
//connecting url to backend
let url="http://localhost:8080"

const registerApi=(fd)=>{
    try{
        const resp=axios.post(url+"/registration",fd)
        return resp
    }catch(e){
        console.log(e)
    }
}
const loginApi=(fd)=>{
    try{
        const resp=axios.post(url+"/login",fd)
        return resp
    }catch(e){
        console.log(e)
    }
}
const addTodoApi=async(fd)=>{
    try{
        const resp=await axios.post(url+"/addtodo",fd)
        return resp
    }catch(e){
        console.log(e)
    }
}
const deleteTodoApi=(id)=>{
    try{
        const resp=axios.delete(url+`/${id}`)
        return resp

    }catch(e){
        console.log(e)
    }
}
const editTodoApi=(id,fd)=>{
    try{
        const resp=axios.patch(url+`/addtodo/${id}`,fd)
        return resp
    }catch(e){
        console.log(e)
    }
}
export {registerApi,loginApi,addTodoApi,deleteTodoApi,editTodoApi}

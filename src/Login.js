import React, { useState } from 'react'
import { loginApi } from './APIs/customerApi'
import {useNavigate} from "react-router-dom"

const Login = () => {
  const [formInfo,setFormInfo]=useState({
    email:"",
    password:""
  })
  const navigate=useNavigate()
  const onFormSubmit=(e)=>{
    e.preventDefault()
  }
  const onSubmitFormInfo=async()=>{
    try{
      const res=await loginApi(formInfo)
      // console.log("res",res.data.token)
      if(res?.data?.token){
        localStorage.setItem('token',res.data.token)
        navigate("/todo",{state:res.data.token})

      }else{
        navigate("/login",{state:null})
      }

    }catch(e){
      console.log(e)
    }
    
  }
  const onChangeFormData=(e)=>{
    let name=e.target.name
    let value=e.target.value
    setFormInfo((pv)=>({...pv,[name]:value}))
  }
  return (
    <div>
      <form onSubmit={onFormSubmit}>
        
        <lable>Email : </lable><br/>
        <input type="text" name="email" onChange={onChangeFormData}/>
        <br/>
        <lable>Password : </lable><br/>
        <input type="text" name="password" onChange={onChangeFormData}/>
        
        <button type="button" class="btn btn-info btn2" onClick={onSubmitFormInfo}>Login</button>
        
      </form>
    </div>
  )
}

export default Login

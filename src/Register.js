import React, { useState } from 'react'
import "./App.css"
import { registerApi } from './APIs/customerApi'

const Register = () => {

  const onFormSubmit=(e)=>{
    e.preventDefault()
  }
  const [formInfo,setFormInfo]=useState({
    username:"",
    email:"",
    password:"",
    confirmPassword:""
  })
  const onChangeFormInfo=(e)=>{
    let name=e.target.name
    let value=e.target.value
    setFormInfo((pv)=>({...pv,[name]:value}))
  }
  const [displayMsg,setDisplayMsg]=useState(
    {
      text:"",
      className:""
    }
  )
  const onSubmitFormInfo=async()=>{
    try{
      
      // console.log("formInfo",formInfo)
      const res=await registerApi(formInfo)
      setDisplayMsg({
        text:res.data.message,
        className:"successMsg",
      })
  }catch(e){
    console.log(e)
    setDisplayMsg({
      text:e.response.data.message,
      className:"errMsg",
    })
  }
    
  }
  return (
    <div>
     
      <form onSubmit={onFormSubmit}>
      {displayMsg.text && <p className={displayMsg.className}>{displayMsg.text}</p>}

        
        {/* <p className='errMsg'>{err}</p> */}
        <lable>Username : </lable><br/>
        <input type="text" name="username" onChange={onChangeFormInfo}/>
        <br/>
        <lable>Email : </lable><br/>
        <input type="text" name="email" onChange={onChangeFormInfo}/>
        <br/>
        <lable>Password : </lable><br/>
        <input type="password" name="password" onChange={onChangeFormInfo}/>
        <br/>
        <lable>Confirm Password : </lable><br/>
        <input type="password" name="confirmPassword" onChange={onChangeFormInfo}/>
        <button type="button" class="btn btn-info" onClick={onSubmitFormInfo}>Register</button>
        
      </form>
    </div>
  )
}

export default Register

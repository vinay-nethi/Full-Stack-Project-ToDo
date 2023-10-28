import { useState } from "react"
import "./App.css"
import Login from "./Login"
import Register from "./Register"
const Account=()=>{
    const [selectedAcType,setSelectedAcType]=useState("login")
    const ondisplayAcType=(type)=>{
        if(type==="login"){
            setSelectedAcType("login")
        }else{
            setSelectedAcType("register")
        }
    }
    return(
        <div className="mainbox">
            <div className="userbox">
            <h1 className="appTitle">To<span className="appTitle2">Do</span></h1>
                {selectedAcType==="login"?(
                    <div>
                        <Login/>
                        <p>or</p>
                        <p className="orOption" onClick={()=>ondisplayAcType("register")}>create new account</p>
                    </div>
                ):(
                    <div>
                        <Register/>
                        <p>or</p>
                        <p className="orOption" onClick={()=>ondisplayAcType("login")}>Already have account Login</p>
                    </div>
                )}
                
            </div>
        </div>
    )
}
export default Account

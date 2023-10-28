import React, { useEffect, useState } from 'react'
import { addTodoApi, editTodoApi } from './APIs/customerApi'
import { useLocation, useNavigate } from 'react-router-dom'

const CreateTodo = () => {
    const [formInfo, setFormInfo] = useState({
        title:"",
        description:"",
        date:"",
        time:""
    })
    const location=useLocation()
    const [token,setToken]=useState(location?.state[2])
    // console.log("location data",location.state)
    const activityCheck=location?.state[1]==="edit" ? "Update Blog" : "Add Blog";
    const navigate = useNavigate()
    const onChangeTodo = (e) => {
        try {
            let name = e.target.name
            let value = e.target.value
            setFormInfo((pv) => ({ ...pv, [name]: value }))

        } catch (e) {
            console.log(e)
        }
    }
    const onSubmitFormData=(e)=>{
        e.preventDefault()

    }
    const onPostTodo=async()=>{
        try{
            if(activityCheck==="Add Blog"){
                await addTodoApi(formInfo)
            // console.log("token",token)
            navigate("/todo",{state:token})

            }else{
                let reqId=location.state[0]._id
                const res=await editTodoApi(reqId,formInfo)
                if(res.data.message==="todo updated"){
                    navigate("/todo",{state:location.state[2]})
                }
            }

            
            // console.log("location info",location.state)
         
        }catch(e){
            console.log(e)
        }
    }
    // const createTodoDemo=async()=>{
    //     await axios.post("http://localhost:8080/addtodo",)

    // }
    const editTodoValues=()=>{
        document.getElementById("title").value=location.state[0].title
        document.getElementById("description").value=location.state[0].description
        document.getElementById("date").value=location.state[0].date
        document.getElementById("time").value=location.state[0].time


        setFormInfo(location.state[0])


    }
    useEffect(()=>{
        editTodoValues()
    },[])
    return (
        
        <form onSubmit={onSubmitFormData} >
            <label className='labelAlign'>Enter Title:</label>
            
            <input type="text" className="createTodoinput1" name="title" id="title" onChange={onChangeTodo} />
            

            <label className='labelAlign' >Enter <br /> Description:</label>
            
            <input type="text" className="createTodoinput2" name="description" id="description" onChange={onChangeTodo} />
            <br />

            <label className='labelAlign' >Enter Date:</label>
            
            <input type="date" className="createTodoinput3" name="date" id="date" onChange={onChangeTodo} />
            

            <label className='labelAlign' >Enter Time:</label>
            
            <input type="time" className="createTodoinput4" name="time" id="time" onChange={onChangeTodo} />
            <br />

            <button onClick={onPostTodo} class="btn btn-info todoCreate">{activityCheck}</button>
        </form>
        
    )
}

export default CreateTodo

import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import './App.css';
import { deleteTodoApi } from "./APIs/customerApi";

const Todos = () => {
    const location = useLocation()
    const navigate = useNavigate()
    //const [token, setToken] = useState(location?.state)
    const token=localStorage.getItem('token')
    const [todoData, setTodoData] = useState()


    const getAllTodo = async () => {
        try {
            if (token === null) {
                navigate("/", { state: null })
            }
            else {
                const res = await axios.get("http://localhost:8080/todo", {
                    headers: {
                        "a-token": token
                    }
                })
                //console.log("resp", res.data)
                setTodoData(res.data)

            }

        } catch (e) {
            console.log(e)
        }
        //navigate('/todo')
        //  const resp=await axios.get("http://localhost:8080/todo", {
        //                 headers: {
        //                     "a-token": token
        //                 }
        //             })
        //             setTodoData(resp.data)

    }
    const onCreateTodo = () => {
        navigate("/addtodo", { state: token })
    }
    const onDeleteTodo = async (id) => {
        try {
            const res = await deleteTodoApi(id)
            // console.log("delete response", res)
            if (res.data.message === "todo deleted") {
                getAllTodo()
            }


        } catch (e) {
            console.log(e)
        }
    }
    const onEditTodo = (val) => {
        let activity = "edit"
        navigate("/addtodo", { state: [val, activity, token] })
        //console.log("todo act", location.state)
    }
    // console.log("todo data", todoData)
    useEffect(() => {
        getAllTodo()
    }, [token])

    return (
        <div>
            <nav style={{ display: "flex", justifyContent: "space-between" }}>
                <button type="button" onClick={onCreateTodo} class="btn btn-info todoCreate">Create Todo</button>
                <button type="button" onClick={()=>navigate('/')} class="btn btn-dark todoLogOut">Log out</button>
                {/* <p onClick={onCreateTodo}>Create Todo</p>
            <p onClick={()=>setToken(null)}>Log out</p> */}


            </nav>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
                {
                    todoData?.map((val) => {
                        // console.log("date values", val.date)
                        let formattedDate = ""
                        if (val?.date) {
                            let ActualDate = val?.date
                            let [year, month, day] = ActualDate.split('-')
                            formattedDate = `${day}-${month}-${year}`

                        } else {
                            formattedDate = ""
                        }
                        let formattedTime = ""
                        if (val?.time) {
                            let ActualTime = val?.time
                            let [hours, minutes] = ActualTime.split(':')
                            let amOrpm = hours >= 12 ? "PM" : "AM"
                            let formattedHours = hours % 12;
                            if (formattedHours === 0) {
                                formattedHours = 12;
                            }
                            formattedTime = `${formattedHours}:${minutes} ${amOrpm}`
                        } else {
                            formattedTime = ""
                        }


                        return (

                            <div class="card text-left p-1 m-3" style={{ width: "45%" }}>
                                <div class="card-header bg-light text-dark">
                                    {formattedDate}
                                </div>
                                <div class="card-body">
                                    <h5 class="card-title" style={{color:"#00008B"}}>{val?.title}</h5>
                                    <p class="card-text" style={{color:"#191970"}}>{val?.description}</p>
                                    <button type="button " className="btn btn-primary todoBtn" onClick={() => onEditTodo(val)}><i class="bi bi-pencil-square"></i></button>
                                    <button type="button " className="btn btn-danger todoBtn" onClick={() => onDeleteTodo(val?._id)}><i class="bi bi-trash3"></i></button>


                                </div>
                                <div class="card-footer text-muted">
                                    {formattedTime}
                                </div>
                            </div>



                        )

                    })
                }
            </div>
        </div>
    )
}
export default Todos
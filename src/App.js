import {BrowserRouter, Route, Routes} from "react-router-dom"
import './App.css';
import Account from "./Account";
import Login from "./Login";
import Register from "./Register";
import Todos from "./Todos";
import CreateTodo from "./CreateTodo";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Account/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/todo" element={<Todos/>}/>
      <Route path="/addtodo" element={<CreateTodo/>}/>
    </Routes>
    
    </BrowserRouter>
    
  );
}

export default App;

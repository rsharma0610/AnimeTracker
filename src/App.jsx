import React from "react";
import { Routes, Route} from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import Create from "./components/Create";

function App(){

    return(
        <>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home/:id" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/create/:id" element={<Create />} />
            </Routes>
        </>
        
        
    )
}

export default App;
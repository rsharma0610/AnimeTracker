import React from "react";
import { Routes, Route} from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";

function App(){

    return(
        <>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home/:id" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/create" element={<h1>Create Page: To be implemented later</h1>} />
            </Routes>
        </>
        
        
    )
}

export default App;
import { Link, useNavigate } from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import "../styles/Register.css";

function Register(){
    const navigate = useNavigate();

    const[registrationError, setRegistrationError] = useState(false);

    const[registrationInfo, setRegistrationInfo] = useState({
        username: "",
        email: "",
        password: ""
    })

    function handleRegistrationInfoChange(event){
        const {name, value} = event.target;
        setRegistrationInfo((prevValue) => {
            return{
                ...prevValue,
                [name]: value
            }
        })
    }

    async function handleRegister(){
        const{username, email, password} = registrationInfo;
        try{
            const response = await axios.post("http://localhost:4000/register", {
                username,
                email,
                password
            })
            navigate("/");
        }catch(error){
            if(error.response.status === 400){
                setRegistrationError(true);
            }
        }
    }

    

    return(
        <div className="page_container">
            <div className="registration_container">
                <h1>Register</h1>
                {registrationError && <div className="error_container"><p>That email is already in use</p></div>}
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" value={registrationInfo.username} onChange={handleRegistrationInfoChange} placeholder="Create a username"></input><br></br>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" value={registrationInfo.email} onChange={handleRegistrationInfoChange} placeholder="name@email.com"></input><br></br>
                <label htmlFor="password">Password</label>
                <input type="text" id="password" name="password" value={registrationInfo.password} onChange={handleRegistrationInfoChange} placeholder="Create your password"></input><br></br>
                <button onClick={handleRegister} type="button">Register</button>
                <p>Already a User? <Link to="/">Login</Link></p>
            </div>
        </div>
    )
}

export default Register;
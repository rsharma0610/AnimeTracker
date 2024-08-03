import react, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GoogleOAuth from "./GoogleOAuth";

function Login(){
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })

    function handleCredentialChange(event){
        const {name, value} = event.target;
        setCredentials((prevValue) => {
            return{
                ...prevValue,
                [name]: value
            }
        })
    }

    async function handleLogin(){
        const {email, password} = credentials;
        try{
            const response = await axios.post("http://localhost:4000/login", {
                    email,
                    password
                });
            console.log("Server response", response);
            //Maybe turn into a switch statement
            //Note regarding server sending error:
            //When the server sends the 401 error back, it triggers the catch block, we need to find a way around that
            //Maybe do multiple catches to deal with the different types of errors
            if(response.status === 200){
                console.log("You can continue into the site");
                navigate('/home');
            }else if(response.status === 401){
                console.log("YOU SHALL NOT PASS");
            }else if(response.status === 500){
                console.log("Unknown spooky error")
            }
            }catch(error){
                console.log("Error communicating with the express server", error)
            }
    }

    return(
        <div>
            <h1>Login</h1>
            <label for="email">Email:</label>
            <input type="text" id="email" name="email" value={credentials.email} onChange={handleCredentialChange}></input><br></br>
            <label for="password">Password:</label>
            <input type="text" id="password" name="password" value={credentials.password} onChange={handleCredentialChange}></input><br></br>
            <GoogleOAuth />
            <button onClick={handleLogin} type="button">Login</button>
        </div>
    )
}

export default Login;
import react, {useState} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import GoogleOAuth from "./GoogleOAuth";
import "../styles/Login.css";

function Login(){
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })

    const[loginError, setLoginError] = useState(false);

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
            }
        }catch(error){
            if(error.response.status === 401){
                console.log("Invalid email or password", error);
                setLoginError(true);
            }else if(error.response.status === 500){
                console.log("Error communicating with the database", error);
            }else{
                console.log("unknown error", error);
            }
        }
    }

    return(
        <div className="page_container">
            <div className="login_container">
                <h1>Welcome Back</h1>
                {loginError && <div className="error_container"><p>We don't recognize that username or password. You can try again or use another login option.</p></div>}
                <label for="email">Email</label>
                <input type="text" id="email" name="email" value={credentials.email} onChange={handleCredentialChange} placeholder="name@email.com"></input><br></br>
                <label for="password">Password</label>
                <input type="text" id="password" name="password" value={credentials.password} onChange={handleCredentialChange} placeholder="Enter your password"></input><br></br>
                <button onClick={handleLogin} type="button">Login</button>
                <GoogleOAuth />
                <p>New User? <Link to="/register">Sign up</Link></p>
            </div>
        </div>
    )
}

export default Login;
import {jwtDecode} from "jwt-decode";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";


function GoogleOAuth() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  async function handleCallbackResponse(response){
    var userObject = jwtDecode(response.credential);
    const {email, name} = userObject
    //console.log(email, name);
    try{
      await axios.post("http://localhost:4000/login-gmail", {
        email,
        name
      })
    }catch(error){
      console.log("Error", error);
    }
    setUser(userObject);
    //send userinfo as a prop or something, or as a query param somehow
    navigate('/home');
  }
  useEffect(() => {
    /* global google  */
    google.accounts.id.initialize({
      client_id:"523446144226-d02se9sapbfdm5g2a278e56hbh8fk7da.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme: "outline", size: "large"}
    )
  }, []);
  return (
    <div className="App">
      <p>or</p>
      <div id="signInDiv"></div>
    </div>
  );
}

export default GoogleOAuth;

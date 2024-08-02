import {jwtDecode} from "jwt-decode";
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [user, setUser] = useState({});

  function handleCallbackResponse(response){
    console.log("Encoded JWT ID token", response.credential);
    var userObject = jwtDecode(response.credential);
    console.log(userObject);
    setUser(userObject);
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
      <div id="signInDiv"></div>
    </div>
  );
}

export default App;

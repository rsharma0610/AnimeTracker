import { useNavigate } from "react-router-dom";
import "../styles/Header.css"

function Header(props){

    const navigate = useNavigate();

    function handleLogout(){
        navigate('/');
    }

    function handleCreateClick(){
        //console.log(props.user_id);
        navigate(`/create/${props.user_id}`);
    }

    return(
        <div className="header_container">
            <h1>Anime Tracker</h1>
            <button type="button" onClick={handleCreateClick}>Create</button>
            <button type="button" onClick={handleLogout}>Log out</button><br></br><br></br>
        </div>
    )
}

export default Header;
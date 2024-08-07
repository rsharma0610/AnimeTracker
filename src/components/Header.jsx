import { useNavigate } from "react-router-dom";

function Header(){

    const navigate = useNavigate();

    function handleLogout(){
        navigate('/');
    }

    function handleCreateClick(){
        navigate('/create');
    }

    return(
        <div>
            <h1>Anime Tracker</h1>
            <button type="button" onClick={handleCreateClick}>Create</button>
            <button type="button" onClick={handleLogout}>Log out</button><br></br><br></br>
        </div>
    )
}

export default Header;
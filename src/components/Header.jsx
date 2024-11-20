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

    function handleOnClick(event){
        const {name} = event.target;
        props.updateSelectedOption(name);
    }

    return(
        <div className="header_container">
            <h1>Anime Tracker Part 2</h1>
            <button type="button" name="My Animes" onClick={handleOnClick}>My Animes</button>
            <button type="button" name="Create" onClick={handleOnClick}>Create</button>
            <button type="button" name="Recommendations" onClick={handleOnClick}>Recommendations</button>
            <button type="button" onClick={handleLogout}>Log out</button><br></br><br></br>
        </div>
    )
}

export default Header;
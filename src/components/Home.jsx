import { useNavigate } from "react-router-dom";
function Home(){
    const navigate = useNavigate();

    function handleLogout(){
        navigate('/');
    }
    return(
        <div>
            <h1>HELLO WORLD</h1>
            <button type="button" onClick={handleLogout}>Log out</button>
        </div>
    )
}

export default Home;
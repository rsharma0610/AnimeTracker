import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Navbar"
import "../styles/Home.css"
import axios from "axios";
import MainContent from "./MainContent";

function Home(){
    const { id } = useParams();
    const navigate = useNavigate();

    const [status, setStatus] = useState("Watching");
    const [animeList, setAnimeList] = useState([]);

    function handleStatusChange(newStatus){
        setStatus(newStatus);
    }

    useEffect(() => {
        console.log(status)
        async function getAnimeList(){
            try{
                const result = await axios.get("http://localhost:4000/get-anime", {
                    params:{
                        user_id: id,
                        type: status 
                    }
                })
                console.log(result.data.animes);
                setAnimeList(result.data.animes);
            }catch(error){
                console.log("Error with setting anime list", error);
            }
        }
        getAnimeList();
    }, [status])

    function handleLogout(){
        navigate('/');
    }

    return(
        <div className="main_container">
            <h1>HELLO WORLD</h1>
            <button type="button" onClick={handleLogout}>Log out</button><br></br><br></br>
            <Navbar updateStatus={handleStatusChange}/>
            <MainContent animeList={animeList} />
        </div>
    )
}

export default Home;
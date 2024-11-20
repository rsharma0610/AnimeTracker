import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Navbar"
import "../styles/Home.css"
import axios from "axios";
import MainContent from "./MainContent";
import Header from "./Header";
import Create from "./Create";
import Recommendations from "./Recommendations";

function Home(){
    const { id } = useParams();

    const [status, setStatus] = useState("Watching");
    const [deleteToggle, setDeleteToggle] = useState(false);
    const [animeList, setAnimeList] = useState([]);
    const [selectedOption, setSelectedOption] = useState("My Animes")

    function handleStatusChange(newStatus){
        setStatus(newStatus);
    }

    function handleSelectedOptionChange(newSelectedOption){
        setSelectedOption(newSelectedOption);
    }

    useEffect(() => {
        //console.log(status)
        if(selectedOption === "My Animes"){
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
        }
    }, [status, deleteToggle, selectedOption])

    return(
        <div className="main_container">
            <Header user_id={id} updateSelectedOption={handleSelectedOptionChange}/>
            {selectedOption === "My Animes" && (
                <>
                    <Navbar updateStatus={handleStatusChange}/>
                    <MainContent animeList={animeList} updateDeleteToggle={setDeleteToggle}/>
                </>
            )}
            {selectedOption === "Create" && (
                <>
                    <Create id={id}/>
                </>
            )}
            {selectedOption === "Recommendations" && (
                <>
                    <Recommendations id={id}/>
                </>
            )}
            
        </div>
    )
}

export default Home;
import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


function Create(props){
    const id = props.id
    const navigate = useNavigate();

    const [animeInfo, setAnimeInfo] = useState({
        name: "",
        favCharacter: "",
        rating: 1,
        status: "",
    })

    const [confirmationMessage, setConfirmationMessage] = useState("")

    function handleInputChange(event){
        const {name, value} = event.target;
        setAnimeInfo((prevValue) => {
            return{
                ...prevValue,
                [name]: value
            }
        })
        console.log(animeInfo)
    }

    async function handleSubmitAnime(){
        const {name, favCharacter, rating, status} = animeInfo;
        try{
            await axios.post("http://localhost:4000/log-anime", {
                id,
                name,
                favCharacter,
                rating,
                status
            })
            setAnimeInfo({   // After a new anime is logged, clear all the input forms
                name: "",
                favCharacter: "",
                rating: 1,
                status: "",
            });
            setConfirmationMessage("Anime logged!"); // Display a message so the user knows the anime was logged
            setTimeout(() => { // Display the confirmation message for 3 seconds
                setConfirmationMessage("");
            }, 3000);

        }catch(error){
            console.log("Error in create component, handle submit function");
        }
    }

    return(
        <div className="log_container">
            <input name="name" placeholder="Anime name" onChange={handleInputChange} value={animeInfo.name}></input>
            <input name="favCharacter" placeholder="Favorite character" onChange={handleInputChange} value={animeInfo.favCharacter}></input>
            <input name="rating" placeholder="rating" onChange={handleInputChange} value={animeInfo.rating}></input>
            <select name="status" onChange={handleInputChange} value={animeInfo.status}>
                <option value="">--Please choose an option--
                </option>
                <option value="Finished">Finished</option>
                <option value="Waiting">Waiting for next season</option>
                <option value="Watching">Watching</option>
                <option value="Dropped">Dropped</option>
            </select>
            <button type="button" onClick={handleSubmitAnime}>Submit</button>
            {confirmationMessage && <p>{confirmationMessage}</p>}
        </div>
    )
}
export default Create;
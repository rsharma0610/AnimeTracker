import axios from "axios";
import "../styles/AnimeItem.css";

function AnimeItem(props){

    async function handleDelete(){
        const id = props.id;
        const user_id = props.user_id;

        try{
            await axios.post("http://localhost:4000/delete-anime", {
                id,
                user_id
            })
            props.updateDeleteToggle((prevValue) => !prevValue);
        }catch(error){
            console.log("Error in the handleDelete function");
        }
    } 

    return(
        <div className="animeItem_container">
            <h3>{props.name}</h3>
            <p>{props.favCharacter}</p>
            <p>{props.rating}</p>
            <button type="button" onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default AnimeItem;

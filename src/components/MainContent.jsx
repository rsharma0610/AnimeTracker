import "../styles/MainContent.css";
import AnimeItem from "./AnimeItem";

function MainContent(props){

    return(
        <div className="mainContent_container">
            {props.animeList.map((anime) => {
                    const {id, user_id, name, favoritecharacter, rating} = anime;
                    
                    return(
                        <AnimeItem id={id} key={id} user_id={user_id} name={name} favCharacter={favoritecharacter} rating={rating} updateDeleteToggle={props.updateDeleteToggle} />
                    )
                        
                    
                    
                    /* return(
                        <div>
                            <h3>{name}</h3>
                            <p>{favoritecharacter}</p>
                            <p>{rating}</p>
                        </div>
                    ) */
                })}
        </div>
    )
}
export default MainContent;
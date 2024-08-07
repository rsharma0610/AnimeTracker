import "../styles/MainContent.css";
import AnimeItem from "./AnimeItem";

function MainContent(props){

    return(
        <div className="mainContent_container">
            {props.animeList.map((anime) => {
                    const{name, favoritecharacter, rating} = anime;
                    return(
                        <AnimeItem name={name} favCharacter={favoritecharacter} rating={rating} />
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
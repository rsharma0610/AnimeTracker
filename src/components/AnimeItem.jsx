
function AnimeItem(props){

    return(
        <div>
            <h3>{props.name}</h3>
            <p>{props.favCharacter}</p>
            <p>{props.rating}</p>
        </div>
    )
}

export default AnimeItem;

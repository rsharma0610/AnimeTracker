import "../styles/Navbar.css";

function Navbar(props){

    function handleOnClick(event){
        const {name} = event.target;
        props.updateStatus(name);
    }
    return(
        <div className="navbar_container">
            <button type="button" name="Watching" onClick={handleOnClick}>Watching</button>
            <button type="button" name="Finished" onClick={handleOnClick}>Finished</button>
            <button type="button" name="Waiting" onClick={handleOnClick}>Waiting</button>
            <button type="button" name="Dropped" onClick={handleOnClick}>Dropped</button>
        </div>
    )
    
}

export default Navbar;
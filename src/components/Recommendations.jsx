import axios from "axios";
import { useEffect, useState } from "react";

function Recommendations(props){
    const id = props.id
    const [recList, setRecList] = useState([])

    useEffect(() => {
        async function getRecList(){
            try{
                const result = axios.get("http://localhost:4000/get-anime-recommendations", {
                    params:{
                        user_id: id
                    }
                })
            }catch(error){
                console.log(error)
            }
        }
        getRecList();
    }, [])

    
    return(
        <div>
            <h1>Reccomendation Page</h1>
        </div>
    )
}

export default Recommendations;
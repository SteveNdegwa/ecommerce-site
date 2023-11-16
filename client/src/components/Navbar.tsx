import { useNavigate } from "react-router-dom"
import { State } from "../store";
import { useSelector } from "react-redux";
import api from "../config/api";


export function Navbar(){
  
    const navigate = useNavigate();

    const username = useSelector((state: State)=> state.user.value.username);

    function onLogout(){
        api.post("/jwt/revoke-user-token/username")
        navigate("/login");
    }

    return(
        <div className="navbar">
            <h2 className="username">{username && <>Hi {username}</>}</h2>
            {username && <button type="button" onClick={onLogout}>Logout</button>}
        </div>
    )
}
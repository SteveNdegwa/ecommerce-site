import { Link, useNavigate } from "react-router-dom"

import api from "../config/api";


export function Navbar(){
  
    const navigate = useNavigate();

    const username = localStorage.getItem("username") || null;

    
    function onLogout(){
        api.post(`/jwt/revoke-user-token/${username}`)
        localStorage.clear();
        navigate("/login");
    }

    return(
        <nav className="navbar">
            <div className="links">
                <Link className="link" to="/">Home</Link>
                <Link className="link" to="/">Catalog</Link>
                <Link className="link" to="/">Collections</Link>
                <Link className="link" to="/">Contact us</Link>
            </div>
            <h2 className="username">{username && <>Hi {username}</>}</h2>
            <button type="button" onClick={onLogout}>{username ? <>Logout</> : <>Login</>}</button>
        </nav>
    )
}
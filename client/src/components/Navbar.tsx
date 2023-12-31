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
            <section className="links">
                <ul className="menu">
                    <li className="menuItem">
                        <Link className="link" to="/">Home</Link>
                    </li>
                    <li className="menuItem">
                        <Link className="link" to="/view-products/all">Products</Link>
                        <ul className="subMenu">
                            <li className="subMenuItem">
                                <Link className="link" to="/view-products/phone">Phones</Link>
                            </li>
                            <li className="subMenuItem">
                                <Link className="link" to="/view-products/watch">Watches</Link>
                            </li>
                            <li className="subMenuItem">
                                <Link className="link" to="/view-products/fridge">Fridges</Link>
                            </li>
                            <li className="subMenuItem">
                                <Link className="link" to="/view-products/microwave">Microwaves</Link>
                            </li>
                            <li className="subMenuItem">
                                <Link className="link" to="/view-products/toaster">Toasters</Link>
                            </li>
                        </ul>
                    </li>
                    <li className="menuItem">
                        <Link className="link" to="/">About us</Link>
                    </li>
                    <li className="menuItem">
                        <Link className="link" to="/">Contact us</Link>
                    </li>
                    <li className="menuItem">
                        <Link className="link" to="/cart">Cart</Link>
                    </li>
                </ul>
            </section>
            <section className="user">
                <h3 className="message">{username && <>Hi  {username}</>}</h3>
                <button type="button" style={{backgroundColor: username ? "red" : "green"}} onClick={onLogout}>{username ? <>Logout</> : <>Login</>}</button>
            </section>
        </nav>
    )
}
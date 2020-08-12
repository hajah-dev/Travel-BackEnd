import React, { useContext } from 'react';
import { AuthContext } from '../../Context/auth-context';
import { NavLink } from 'react-router-dom';
// NavLink special link which can analyze the url, 
// and allows us color the link differently if we are
// on the page the link leads to, to show the user that
// this is currently the active link. 
import './NavLinks.css';

const NavLinks = props => {
    // What we get back from the useContext(AuthContext) is an object
    // which will hold the latest context and the current component
    // will re-render whenever the useContext(AuthContext) changes
    // Bellow, auth is an object which hold : isLoggedIn, login, and logou method
    // and we can now use them. 
    
    const auth = useContext(AuthContext);
    return (
        <ul className="nav-links">
            <li>
                <NavLink to ="/" exact> All users </NavLink>
            </li>
            {auth.isLoggedIn && (
                <li>
                    <NavLink to ="/u1/places"> My places </NavLink>
                </li>
            )}
            {auth.isLoggedIn && (
                <li>
                    <NavLink to ="/places/new"> Add place </NavLink>
                </li>
            )}
            {!auth.isLoggedIn && (
                <li>
                    <NavLink to ="/auth"> Authenticate </NavLink>
                </li>
            )}
            {auth.isLoggedIn && (
                <li>
                    <button onClick={auth.logout}>LOGOUT</button>
                </li>
            )}
        </ul>
    )
};
export default NavLinks
import React from "react";
import './AppBar.scss';

export default function AppBar({id, title}){
    return(
        <>
             <nav className="navbar-app"> {title}</nav>
        </>
    )
}
import React from 'react';
import Logo from "../components/Logo";
import {NavLink} from "react-router-dom";

const NotFound = () => {
    return (
        <div className="main-wrapper">
            <div className="header">
                <Logo />
            </div>
            <div className="text">
                <p>La page que vous demandez n'existe pas</p>
                <NavLink exact to="/">Cliquez ici pour revenir à la page principal</NavLink>
            </div>
        </div>
    );
};

export default NotFound;
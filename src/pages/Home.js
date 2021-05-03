import React from 'react';
import Logo from "../components/Logo";
import Movies from "../components/Movies";

const Home = () => {
    return (
        <div className="main-wrapper">
            <div className="header">
                <Logo />
            </div>
            <Movies />
        </div>
    );
};

export default Home;
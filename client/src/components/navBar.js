import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navBar.css"

export const NavBar = ({testLogIn}) => {
    const setLogIn = () => {
        testLogIn(true);
    }
    return (
        <div>

            <header>
                <Link to = "/" id= "homePageNavBarButton"><img id="logo"src = "./logo.png" height="10%" width="10%" ></img></Link>
                
                <div id="mikey-quote"><p>“There comes a time, brothers, where history is forged like melted cheese… it sticks together as one, but it’s still soft and squishy in the middle… mmm… are you with me?!” -Michaelangelo</p></div>
                <nav>
                    <Link to = "/login"><a id="login" onClick = {setLogIn}>login</a></Link>
                    <Link to = "/signup"><a id="signup">signup</a></Link>
                </nav>
            </header>
        </div>
    )
}
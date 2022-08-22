import React, { useState } from "react";
import "./HomePage.css"
import { OrderPage } from "./OrderPage";
import { Login } from "./Login";



export const HomePage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <div className = "fade-in">
        <div id="pizza-div">
            
            <img id="quote" src = "Pizza_Quote.png" height="30%" width="30%"/></div>
        {/* {isLoggedIn ? <OrderPage /> : <Login />} */}

        </div>

    )
}
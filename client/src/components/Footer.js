import React, { useState } from "react";
import "./footer.css"
export const Footer = () => {

    return (
        <div id = "footer">
            <p>Slice N' Dice Made With Love By:</p><br />
            <div id="icons">
            <a href="https://github.com/clogerie92"><div id="leo"><img src = "leo.png" height="75px" width="75px" /><p>clogerie92</p></div></a>
            <a href="https://github.com/chrisjackson1"><div id="mike"><img src = "mike.png" height="75px" width="75px" /><p>chrisjackson1</p></div></a>
            <a href="https://github.com/krosario314"><div id="don"><img src = "donatello.webp" height="75px" width="75px" /><p>krosario314</p></div></a>
            <a href="https://github.com/IanAHill"><div id="raph"><img src = "raph.png" height="75px" width="75px" /><p>ianahill</p></div></a>
            </div>
        </div>
    )
}
import React, {useState, createContext} from "react";
import {UserProvider} from "../context/user"
import User from "./context/user";
import Home from "./Home";

function App(){
    return(
        <UserProvider>
            <Home/>
        </UserProvider>
    )
}
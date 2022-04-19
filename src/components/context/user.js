import Home from "../Home";
import {createContext} from 'react'


    const UserContext = createContext()

    function UserProvider({children}){
        const currentUser = {
            username: "bob",
            password: "hi"
        }
        return <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>
    }


export {UserContext, UserProvider}
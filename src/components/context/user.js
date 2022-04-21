import Home from "../Home";
import {createContext, useState} from 'react'


    const UserContext = createContext()

    function UserProvider({children}){
        const [currentUser, setCurrentUser] = useState({
            username: "bob",
            password: "hi",
            profile_pic: {
                picture_src: "https://cdn.mos.cms.futurecdn.net/C9JVYkqCELkdERaqd9gFbj.jpg",
                alt_text: "a beauteus gent"
            }

        })

        return <UserContext.Provider value={[currentUser, setCurrentUser]}>{children}</UserContext.Provider>
    }


export {UserContext, UserProvider}
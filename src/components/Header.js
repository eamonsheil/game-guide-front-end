import {UserContext} from "./context/user"
import {useContext} from 'react'

function Header(){
    const user = useContext(UserContext)
    return(
        <header className="header">

            <h3> Welcome {user ? `back, ${user.username}!` : "to Game Guide"}</h3>
            <button>{user ? "log out" : "log in"}</button>
            {/* user avatar, log in or view page */}
            
        </header>
    )
}

export default Header;

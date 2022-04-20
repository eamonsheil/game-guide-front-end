import {UserContext} from "./context/user"
import{useNavigate} from 'react-router-dom'
import {useContext} from 'react'

function Header(){
    const [user, setUser] = useContext(UserContext)
    const navigate = useNavigate()

    function handleLogOut(){
        setUser(null)
        navigate("/")
    }

    function handleLogIn(){
        navigate("/")
    }
    return(
        <header className="header">

            <h3> Welcome {user ? `back, ${user.username}!` : "to Game Guide"}</h3>
            {user ? <button onClick={handleLogOut}>log out</button> : <button onClick={handleLogIn}>log in</button>}
            {user ? <button onClick={()=> navigate("/userpage")}>view user page</button> : null}
            {/* user avatar, log in or view page */}
            
        </header>
    )
}

export default Header;

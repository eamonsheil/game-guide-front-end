import {UserContext} from "./context/user"
import{useNavigate} from 'react-router-dom'
import {useContext} from 'react'

function Header({location}){
    // console.log(location)
    const [user, setUser] = useContext(UserContext)
    const navigate = useNavigate()

    // let destinationButton
    // if (location === "UserPage"){
    //     destinationButton = <button onClick={()=> navigate("/games")}>view games</button> }
    // else if (location === "GameList"){
    //     destinationButton = <button onClick={()=> navigate("/userpage")}>view user page</button> }

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
            <button onClick={()=> navigate("/games")}>view games list</button>
            {/* user avatar, log in or view page */}
            
        </header>
    )
}

export default Header;

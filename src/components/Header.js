import {UserContext} from "./context/user"
import{useNavigate} from 'react-router-dom'
import {useContext, useEffect} from 'react'

function Header({location}){
    // console.log(location)
    const [user, setUser] = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() =>(
        console.log(user)
    ) ,[])
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

            <h3 className="welcome-user"> Welcome {user ? `back, ${user.username}!` : "to Game Guide"}</h3>
            {user ? <img className="profile-picture" src={user.profile_pic.picture_src} alt="a beauteus gent" ></img> : null}
            {user ? <button onClick={handleLogOut}>log out</button> : <button onClick={handleLogIn}>log in</button>}
            {user ? <button onClick={()=> navigate("/userpage")}>view user page</button> : null}
            <button onClick={()=> navigate("/games")}>view games list</button>
            {/* user avatar, log in or view page */}
            
        </header>
    )
}

export default Header;

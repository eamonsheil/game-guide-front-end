import {UserContext, userObject} from "./context/user"
import{useNavigate} from 'react-router-dom'
import {useContext, useEffect, useState} from 'react'

function Header({location}){
    // console.log(location)
    const [user, setUser] = useContext(UserContext)
    const [showKey, setShowKey] = useState(false)

    const navigate = useNavigate()

    useEffect(() =>(
        console.log(user)
    ) ,[])


    function handleLogOut(){
        setUser(userObject)
        navigate("/")
    }

    function handleLogIn(){
        navigate("/")
    }

    const emojiKey = 
        <div className='key-spot'>
            <button onClick={()=>setShowKey(false)}>X</button>
            <ul>
                <strong>highlights key:  </strong>
                <li>🎲 - dice rolling</li>
                <li>🃏 - card game</li> 
                <li>🎉 - party game</li> 
                <li>🧒 - kids game</li> 
                <li>🀄 - tile placement</li> 
                <li>🤼‍♂️ - fight for space</li> 
            </ul>
            <ul>
                <strong>your games key: </strong>
                <li>🎮 - played</li> 
                <li>👍 - liked</li> 
                <li>💸 - bought</li> 
            </ul>
        </div>
    return(
        <header className="header">

            <h3 className="welcome-user"> Welcome {user ? `back, ${user.username}!` : "to Game Guide"}</h3>
            {user ? <img className="profile-picture" src={user.profile_pic.picture_src} alt="a beauteus gent" ></img> : null}
            {user ? <button onClick={handleLogOut}>log out</button> : <button onClick={handleLogIn}>log in</button>}
            {user ? <button onClick={()=> navigate("/userpage")}>view your games</button> : null}
            <button onClick={()=> navigate("/games")}>view full games list</button>
            {showKey ? emojiKey : <button className='emoji-btn' onClick={()=> setShowKey(true)}>Emoji Explainer</button>}
            {/* user avatar, log in or view page */}
            
        </header>
    )
}

export default Header;

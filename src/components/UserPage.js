import {UserContext} from "./context/user"
import {useContext, useState, useEffect} from 'react'
import Header from "./Header"
import{useNavigate} from 'react-router-dom'
import GameDetail from "./GameDetail"
import GameList from "./GameList"


function UserPage() {
    const [accountSettingsForm, setAccountSettingsForm] = useState({})
    const [showAccountForm, setShowAccountForm] = useState(false)
    const [user] = useContext(UserContext)
    const navigate = useNavigate()
    const [showDetail, setShowDetail] = useState(false)
    const [currentGame, setCurrentGame] = useState(null)
    const [userGames, setUserGames] = useState([])
    const [profilePics, setProfilePics] = useState([])

    const counter = 0
    function increaseCounter(){
        counter++
    }

    useEffect(() => {
        fetch(`http://localhost:9292/profile_pics`)
        .then( res => res.json())
        .then( data => setProfilePics(data))
    },[])

    function handleAccountSettingsForm(event){
        setAccountSettingsForm({
            ...accountSettingsForm,
            [event.target.name] : event.target.value
        })
    }

    function handleOptionChange(e) {
        console.log(e.target.value)
            setAccountSettingsForm({
                ...accountForm, profile_pic: e.target.value
            })
    }


    useEffect(() => {
        fetch(`http://localhost:9292/user_games/${user.id}`)
        .then(resp => resp.json())
        .then(data => setUserGames(data))
    }, [increaseCounter])

    if(!user){navigate('/games')}
    let gameDisplay

    if(user.game_relationships){


        gameDisplay = <>
            {/* <h3>Your Saved Games:</h3> */}
            <GameList increaseCounter={increaseCounter} games={userGames}/>
        </>
    }
    else{
        gameDisplay = <div>
            <p>you have no saved games! Oh nooooooooo</p>
            <p>check out our game page to add some games to your list</p>
            <button className="sassy-button"onClick={()=>navigate('/games')}>FIND SOME DAMN GAMES</button>
        </div>
    }

    const accountForm = <div>FORM</div>
    // const accountForm = <div className="account-form">
    //     <button onClick={()=>setShowAccountForm(false)}>X</button>
    //     <form>
    //         <input type="submit"/>
    //         <label><strong>Username: </strong></label>
    //         <input 
    //             name="username" 
    //             onChange={handleAccountSettingsForm} 
    //             type="text"
    //             placeholder={user.username}
    //         />
    //         <label><strong>Password</strong></label>
    //         <input name="password" onChange={handleAccountSettingsForm} type="test" />
    //         <label>Profile Picture</label>
    //         <div className='avatar-select' >
    //                 {profilePics.map((pic) => 
    //                     (
    //                         <label for="profile_pic">
    //                             <img id={pic.id} src={pic.picture_src} alt={pic.alt_text} style={{height: 50}}/>
    //                             <input id={pic.id} type="radio" name="profile_pic" value={pic.id} onChange={handleOptionChange}/>
    //                         </label>
    //                     )
    //                 )}
    //             </div>
    //     </form>
    // </div>

    return (
        <div className="user-page">
            <Header location="UserPage"/>
            {user ? <img className="profile-picture" src={user.profile_pic.picture_src} alt="a beauteus gent" ></img> : null}
            {showAccountForm ? accountForm : <button onClick={()=> setShowAccountForm(true)} className="account-setting-button">Edit your account settings</button>}
            <h2> Your Saved Games: </h2>
            <ul className='game-list'>
                {showDetail ? <button onClick={() => setShowDetail(!showDetail)}>Show All</button> : null} 
                {showDetail ? <GameDetail detailID={currentGame.id} /> : gameDisplay}
            </ul>
        </div>
                
    )
}

export default UserPage
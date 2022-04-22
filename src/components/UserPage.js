import {UserContext} from "./context/user"
import {useContext, useState, useEffect} from 'react'
import Header from "./Header"
import{useNavigate} from 'react-router-dom'
import GameDetail from "./GameDetail"
import GameList from "./GameList"


function UserPage() {
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

    const currentUserObj = {
        username: user.username,
        password: user.password,
        profile_pic_id: user.profile_pic_id
    }

    const [accountSettingsForm, setAccountSettingsForm] = useState(currentUserObj)


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
            setAccountSettingsForm({
                ...accountSettingsForm, profile_pic_id: e.target.value
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

    function handleSubmit(event){
        event.preventDefault()

        fetch(`http://localhost:9292/users/${user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(accountSettingsForm)
        })
        .then( res => res.json())
        .then( data => alert("account settings updated!"))
        .catch( error => console.log(error.message));
    }

    // const accountForm = <div>FORM</div>
    const accountForm = <div className="account-form">
        <button onClick={()=>setShowAccountForm(false)}>X</button>
        <form onSubmit={handleSubmit}>
            <label><strong>Username: </strong></label>
            <input 
                name="username" 
                onChange={handleAccountSettingsForm} 
                type="text"
                placeholder={user.username}
                className="text-input"
            />
            <br/>
            <label><strong>Password: </strong></label>
            <input 
                name="password" 
                onChange={handleAccountSettingsForm} 
                placeholder={user.password}
                className="text-input"
                type="test" />
                <br/>
            <label> <strong> New Profile Picture: </strong></label>
            <div className='avatar-select' >
                    {profilePics.map((pic) => 
                        (
                            <label for="profile_pic">
                                <img id={pic.id} src={pic.picture_src} alt={pic.alt_text} style={{height: 50}}/>
                                <input id={pic.id} type="radio" name="profile_pic" value={pic.id} onChange={handleOptionChange}/>
                            </label>
                        )
                    )}
                </div>
            <input className="account-form-submit" type="submit"/>

        </form>
    </div>

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
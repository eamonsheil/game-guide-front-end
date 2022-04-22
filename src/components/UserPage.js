import {UserContext} from "./context/user"
import {useContext, useState, useEffect} from 'react'
import Header from "./Header"
import{useNavigate} from 'react-router-dom'
import GameDetail from "./GameDetail"
import GameList from "./GameList"


function UserPage() {

    const [user] = useContext(UserContext)
    const navigate = useNavigate()
    const [showDetail, setShowDetail] = useState(false)
    const [currentGame, setCurrentGame] = useState(null)
    const [userGames, setUserGames] = useState([])
    const counter = 0
    function increaseCounter(){
        counter++
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

    return (
        <div className="user-page">
            <Header location="UserPage"/>
            <h2> Your Saved Games: </h2>
            <ul className='game-list'>
                {showDetail ? <button onClick={() => setShowDetail(!showDetail)}>Show All</button> : null} 
                {showDetail ? <GameDetail detailID={currentGame.id} /> : gameDisplay}
            </ul>
        </div>
                
    )
}

export default UserPage
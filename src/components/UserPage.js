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

    useEffect(() => {
        // console.log(user.id)
        fetch(`http://localhost:9292/user_games/${user.id}`)
        .then(resp => resp.json())
        .then(data => setUserGames(data))
    }, [])

    // function toggleGameDetail(game) {
    //     setShowDetail(!showDetail)
    //     setCurrentGame(game)
    // }


    // function removeFromGames(game, event){
    //     fetch(`http://localhost:9292/game_relationships/${user.id}/${game.id}`, {
    //         method: "DELETE"
    //     })
    //     .then( res => res.json())
    //     .then( data => {
    //         // console.log(data)
    //         // event.target.parent.remove()
    //     })
    //     .catch( error => console.log(error.message));
    // }

    if(!user){navigate('/games')}
    let gameDisplay

    if(user.game_relationships){


        gameDisplay = <>
            {/* <h3>Your Saved Games:</h3> */}
            <GameList games={userGames}/>
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
            {user ? <img className="profile-picture" src={user.profile_pic.picture_src} alt="a beauteus gent" ></img> : null}
            <h2> Your Saved Gmes: </h2>
            <ul className='game-list'>
                {showDetail ? <button onClick={() => setShowDetail(!showDetail)}>Show All</button> : null} 
                {showDetail ? <GameDetail detailID={currentGame.id}/> : gameDisplay}
            </ul>
        </div>
                
    )
}

export default UserPage
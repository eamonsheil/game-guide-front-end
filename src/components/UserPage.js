import {UserContext} from "./context/user"
import {useContext, useState} from 'react'
import Header from "./Header"
import{useNavigate} from 'react-router-dom'
import GameDetail from "./GameDetail"


function UserPage() {
    const [user] = useContext(UserContext)
    const navigate = useNavigate()
    const [showDetail, setShowDetail] = useState(false)
    const [currentGame, setCurrentGame] = useState(null)

    function toggleGameDetail(game) {
        setShowDetail(!showDetail)
        setCurrentGame(game)
    }

    function removeFromGames(game){

    }

    let gameDisplay

    if(user.game_relationships){
        const gamesToShow = user.game_relationships.map(relationship => {
            const game = (relationship.game)
            return(
                <div className='game-list-item'>
                    <img className="games-list-img" src={game.image_url} alt={game.title} height="100px" width="auto"/>
                    <p>Title: <strong>{game.title}</strong></p>
                <button onClick={() => toggleGameDetail(game)}>View Details</button>
                <button>remove from your list</button>
                </div>
            )
        })

        gameDisplay = <div>
            <h4>Your Saved Games</h4>
            {gamesToShow}
        </div>
    }
    else{
        gameDisplay = <div>
            <p>you have no saved games! Oh nooooooooo</p>
            <p>check out our game page to add some games to your list</p>
            <button onClick={()=>navigate('/games')}>FIND SOME DAMN GAMES</button>
        </div>
    }

    return (
        <div className="user-page">
            <Header location="UserPage"/>
            <h2>User Page....</h2>
            <p>User: {user.username }</p>
            {/* {gameDisplay} */}

            <ul className='game-list'>
                {/* {gameDisplay} */}
                {showDetail ? <button onClick={() => setShowDetail(!showDetail)}>Show All</button> : null} 
                {showDetail ? <GameDetail detailID={currentGame.id}/> : gameDisplay}
            </ul>
        </div>
                
    )
}

export default UserPage
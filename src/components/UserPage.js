import {UserContext} from "./context/user"
import {useContext, useState, useEffect} from 'react'
import Header from "./Header"
import{useNavigate} from 'react-router-dom'
import GameDetail from "./GameDetail"


function UserPage() {
    const [user] = useContext(UserContext)
    const [showDetail, setShowDetail] = useState(false)
    const [currentGame, setCurrentGame] = useState(null)
    const [userGames, setUserGames] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:9292/user_games/${user.id}`)
        .then(resp => resp.json())
        .then(data => setUserGames(data))
    }, [])

    function toggleGameDetail(game) {
        setShowDetail(!showDetail)
        setCurrentGame(game)
    }


    function removeFromGames(game, event) {
        fetch(`http://localhost:9292/game_relationships/${user.id}/${game.id}`, {
            method: "DELETE"
        })
        .catch( error => console.log(error.message));
        }
    // if(user === null){navigate('/games')}
    let gameDisplay

    if (user.game_relationships) {

        const gamesToShow = userGames.map(game => (
                <li className='saved-game-item'>
                    <img className="saved-list-img" src={game.image_url} alt={game.title} height="100px" width="auto"/>
                    <p>Title: <strong>{game.title}</strong></p>
                    <button onClick={() => toggleGameDetail(game)}>View Details</button>
                    <button onClick={(event) => removeFromGames(game, event)}>remove from your list</button>
                </li>
                )
            )
        gameDisplay = <div>
                        <h3>Your Saved Games</h3>
                        {gamesToShow}
                      </div>
    }
    else {
        gameDisplay = <div>
                        <p>you have no saved games! Oh nooooooooo</p>
                        <p>check out our game page to add some games to your list</p>
                        <button onClick={()=>navigate('/games')}>FIND SOME DAMN GAMES</button>
                      </div>
    }

    return (
        <>
        <Header location="UserPage"/>
            <div className="user-page">
                <h2> User Page: </h2>
                {/* {gameDisplay} */}
                {showDetail ? <button onClick={() => setShowDetail(!showDetail)}>Show All</button> : null} 
                <ul className='saved-game-list'>
                    {/* {gameDisplay} */}
                    {showDetail ? <GameDetail detailID={currentGame.id}/> : gameDisplay}
                </ul>

            </div>
        </>
    )
}

export default UserPage
import { useState, useEffect, useContext } from 'react'
import {UserContext} from "./context/user"
import GameDetail from './GameDetail'
import {useLocation} from 'react-router-dom'



function GameList({games}) {
    const location = useLocation()
    console.log(location.pathname)
    const [user, setUser] = useContext(UserContext)
    const [showDetail, setShowDetail] = useState(false)
    const [currentGame, setCurrentGame] = useState({})

    function toggleGameDetail(game) {
        setShowDetail(!showDetail)
        setCurrentGame(game)
    }

    function removeFromGames(game, event){
        fetch(`http://localhost:9292/game_relationships/${user.id}/${game.id}`, {
            method: "DELETE"
        })
        .then( res => res.json())
        .then( data => {
            console.log(data)
            console.log(event.target)
            // event.target.parent.remove()
        })
        .catch( error => console.log(error.message));
    }


    const showGames = games.map((game) => {
        let isOwnedDiv
        if(user){game.game_relationships.forEach(relationship => {
            if(relationship.user_id === user.id){
                isOwnedDiv = <div>
                                <p>In your games!</p>
                                {relationship.played ? <>🎮</> : null}
                                {relationship.liked ? <>👍</> : null}
                                {relationship.owned ? <>💸</> : null}
                             </div>
            }
        })}
        return(
            <li className='game-list-item' key={game.id}>
                    <img className="games-list-img" src={game.image_url} alt={game.title} height="100px" width="auto"/>
                    <p>Title: <strong>{game.title}</strong></p>
                    <div className='game-list-emojis'>
                        <p>highlights:</p>
                        {game.mechanics.includes("dice_rolling") ? <>🎲</> : null}
                        {game.categories.includes("card_game") ? <>🃏</> : null}
                        {game.categories.includes("cooperative") ? <>🤝</> : null}
                        {game.categories.includes("party_game") ? <>🎉</> : null}
                        {game.mechanics.includes("bluffing") ? <>👀 </> : null}
                    </div>
                    {isOwnedDiv}
                    <button className='detail-button' onClick={() => toggleGameDetail(game)}>View Details</button>
                    {location.pathname === '/userpage' ? <button onClick={(event) => removeFromGames(game,event)}>Remove from Your Games</button>:null}
            </li>
        )
    })

    return (
        <>
            {showDetail ? <button className='close-detail-button' onClick={() => setShowDetail(!showDetail)}>Close Details</button> : null}
            {showDetail ? <GameDetail detailID={currentGame.id}/> : showGames}
        </>
    )
}
export default GameList
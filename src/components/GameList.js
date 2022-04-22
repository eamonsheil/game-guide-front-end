import { useState, useEffect, useContext } from 'react'
import {UserContext} from "./context/user"
import GameDetail from './GameDetail'


function GameList({games}) {
    const [user, setUser] = useContext(UserContext)
    const [showDetail, setShowDetail] = useState(false)
    const [currentGame, setCurrentGame] = useState({})

    function toggleGameDetail(game) {
        setShowDetail(!showDetail)
        setCurrentGame(game)
    }

    const showGames = games.map((game) => {
        let isOwnedDiv
        console.log(game.game_relationships)
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
                    <div>
                        <p>highlights:</p>
                        {game.mechanics.includes("dice_rolling") ? <>🎲</> : null}
                        {game.categories.includes("card_game") ? <>🃏</> : null}
                        {game.categories.includes("cooperative") ? <>🤝</> : null}
                        {game.categories.includes("party_game") ? <>🎉</> : null}
                        {game.mechanics.includes("bluffing") ? <>👀 </> : null}
                    </div>
                    {isOwnedDiv}
                    <button onClick={() => toggleGameDetail(game)}>View Details</button>
            </li>
        )
    })

    return (
        <>
            {showDetail ? <button onClick={() => setShowDetail(!showDetail)}>Close Details</button> : null}
            {showDetail ? <GameDetail detailID={currentGame.id}/> : showGames}
        </>
    )
}
export default GameList
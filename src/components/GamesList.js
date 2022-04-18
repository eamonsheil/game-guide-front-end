import {useState, useEffect} from 'react'
import GameDetail from './GameDetail'

function GamesList() {
    const [games, setGames] = useState([])
    const [search, setSearch] = useState("")
    const [showDetail, setShowDetail] = useState(false)
    const [currentGame, setCurrentGame] = useState({})

    useEffect(() => {
        fetch(`http://localhost:9292/games`)
        .then( res => res.json())
        .then( data => setGames(data))
    },[])

    const showGames = games.map((game) => {
        return(
            <li>
               <img src={game.image_url} alt={game.title} height="100px" width="100px"/>
               <p>Title: {game.title}</p>
               <p>{game.description}</p>
                <button onClick={() => toggleGameDetail(game)}>View Details</button>
            </li>
        )
    })

    function toggleGameDetail(game) {
        console.log(currentGame, showDetail)
        setShowDetail(!showDetail)
        setCurrentGame(game)
    }

    return (
        <>
         <h3>This will be the gameslist</h3>
         <form>
            {/* <input name="search" placeholder='Search for games....' value={search} onChange={search}/> */}
            <br/>
            <select>
                <option value="all">Rating</option>
                <option></option>
                <option></option>
                <option></option>
            </select>

         </form>
        
        <ul>
        {showDetail? <button onClick={() => setShowDetail(!showDetail)}>Show All</button> : null}
            {showDetail ? <GameDetail currentGame={currentGame}/> : showGames}
        </ul>
        
        </>
    )
}

export default GamesList;
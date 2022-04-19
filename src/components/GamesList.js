import {useState, useEffect} from 'react'
import GameDetail from './GameDetail'
// import ReactHtmlParser from 'react-html-parser'

function GamesList() {
    const [games, setGames] = useState([])
    const [formData, setFormData] = useState({
        search:  "",
        numPlayers: 0,
        playtime: 0,
        category: "all"
    })
    //const [search, setSearch] = useState("")
    const [showDetail, setShowDetail] = useState(false)
    const [currentGame, setCurrentGame] = useState({})

    useEffect(() => {
        fetch(`http://localhost:9292/games_with_comments`)
        .then( res => res.json())
        .then( data => setGames(data))
    },[])

    const showGames = games.map((game) => {
        const description = document.createElement("div")
        console.log(game.description)
                    //description.innerHTML = game.description
        return(
            <div className='game-list'>
                <ul>
                    <img className="games-list-img" src={game.image_url} alt={game.title} height="100px" width="100px"/>
                    <p>Title: <strong>{game.title}</strong></p>

                    {/* {ReactHtmlParser(game.description)} */}
                    {/* <div style="height:120px;width:120px;border:1px solid #ccc;font:16px/26px Georgia, Garamond, Serif;overflow:auto;"> */}
                    {/* </div> */}
                    <button onClick={() => toggleGameDetail(game)}>View Details</button>
                </ul>
            </div>
        )
    })

    function toggleGameDetail(game) {
        //console.log(currentGame, showDetail)
        setShowDetail(!showDetail)
        setCurrentGame(game)
    }

    function handleFormChange(event){
        setFormData({
            ...formData,
            [event.target.name] : event.target.value
        })
    }

    function handleFormSubmit(event){
        event.preventDefault()
        fetch(`http://localhost:9292/games/${formData.search}/${formData.playtime}/${formData.numPlayers}`)
        .then( res => res.json())
        .then( data => setGames(data))
        .catch( error => console.log(error.message));
    }

    return (
        <>
        <h3>Welcome to Game Guide</h3>
        <form onSubmit={handleFormSubmit}>
            <input name="search" placeholder='Search by name....' value={formData.search} onChange={handleFormChange}/>
            <br/>
            <select onChange={handleFormChange}>
                <option value="all">Category </option>
                <option>Card Game</option>
                <option>Dice Game</option>
                <option>Negotiation Game</option>
            </select>
            <label>Num players:
                <input 
                    onChange={handleFormChange} 
                    //value={formData.numPlayers} 
                    placeholder=""
                    min="0"
                    name="min_players" 
                    type="number"/>
            </label>
            <label>Available play time (in min):
                <input 
                    onChange={handleFormChange} 
                    //value={formData.numPlayers} 
                    placeholder=""
                    min="0"
                    name="max_players" 
                    type="number"/>
            </label>
            <input type="submit"></input>
            </form>

            
        
        <ul>
            {showDetail ? <button onClick={() => setShowDetail(!showDetail)}>Show All</button> : null}
            {showDetail ? <GameDetail currentGame={currentGame}/> : showGames}
        </ul>
        
        </>
    )
}

export default GamesList;
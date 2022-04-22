import { useState, useEffect, useContext } from 'react'
import GameDetail from './GameDetail'
import GameList from './GameList'
import Header from './Header'
// import AddToGamesForm from './AddToGamesForm'
import {UserContext} from "./context/user"
// import Modal from 'react-modal';
// import ReactHtmlParser from 'react-html-parser'

const defaultObj = {
    search:  "",
    numPlayers: 0,
    playtime: 0
}

function GamePage() {
    const [user, setUser] = useContext(UserContext)
    const [showKey, setShowKey] = useState(false)
    const [games, setGames] = useState([])
    const [filteredGames, setFilteredGames] = useState([])
    const [show, setShow] = useState([false])
    // const [showGameForm, setShowGameForm] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [formData, setFormData] = useState(defaultObj)
    // const [showDetail, setShowDetail] = useState(false)
    // const [currentGame, setCurrentGame] = useState({})
    useEffect(() => {
        getAllGames()
    },[])

    function getAllGames() {
        fetch(`http://localhost:9292/games_with_comments`)
        .then( res => res.json())
        .then( data => {
            setGames(data)
            setFilteredGames(data)})
    }

    function handleFormChange(event){
        console.log("d")
        if (formData.search === ""){
            console.log(formData)
                setFilteredGames(games)}
        
        setFormData({
            ...formData,
            [event.target.name] : event.target.value
        })
    }
    function handleCategoryChange(e) {
        const filteredGames = games.filter(game => (
            game.categories.includes(e.target.value)
        ))
        e.target.value === "all" ? getAllGames() : setFilteredGames(filteredGames)
    }

    function handleFormSubmit(event) {
        event.preventDefault()
        console.log(formData)
        const playtime = (!formData.playtime? 9999 : formData.playtime)
        const numPlayers = (!formData.numPlayers? 999 : formData.numPlayers)
        console.log("playtime:", playtime, "numPlayers:", numPlayers)

        const filteredSubmit = games.filter((game) => (
            game.title.toLowerCase().includes(formData.search.toLowerCase())
            && game.max_play_time <= playtime
            && game.min_players <= numPlayers
            && game.max_players >= numPlayers
        ))    
        setFilteredGames(filteredSubmit)
        
        // if (!formData.search) {
            //     fetch(`http://localhost:9292/search/${playtime}/${numPlayers}`)
            //     .then( res => res.json())
            //     .then( data => setGames(data))
            //     .catch( error => console.log(error.message));
            // }
            // else {        
            //     fetch(`http://localhost:9292/search/${formData.search}/${playtime}/${numPlayers}`)
            //     .then( res => res.json())
            //     .then( data => setGames(data))
            //     .catch( error => console.log(error.message));        
            // }
        setFormData(defaultObj)
    }
    const emojiKey = 
        <div className='key-spot'>
            <button onClick={()=>setShowKey(false)}>X</button>
            <ul>
                <strong>highlights key:  </strong>
                <li>🎲 - dice rolling</li>
                <li>🃏 - card game</li> 
                <li>🎉 - party game</li> 
                <li>👀 - card game</li> 
            </ul>
            <ul>
                <strong>your games key: </strong>
                <li>🎮 - played</li> 
                <li>👍 - liked</li> 
                <li>💸 - bought</li> 
            </ul>
        </div>

    return (
        <>
        <Header location="GameList" />
        <div>
        <form className='search-form'
            onSubmit={event => handleFormSubmit(event)}>
            <input className='text-input'
            name="search" 
            placeholder='Search by name....' 
            value={formData.search} 
            onChange={handleFormChange}/>
            <label for="numPlayers">Num players:
                <input className='num-input'
                    onChange={event => handleFormChange(event)} 
                    value={formData.numPlayers} 
                    min="0"
                    name="numPlayers" 
                    type="number"
                    />
            </label>
            <label>Play time (in min):
                <input className='num-input'
                    onChange={(event) => handleFormChange(event)} 
                    value={formData.playtime} 
                    min="0"
                    name="playtime" 
                    type="number"/>
            </label>
                <input className='game-list-submit' type="submit"></input>
        </form>
        </div>
            

            {showKey ? emojiKey : <button className='emoji-btn' onClick={()=> setShowKey(true)}>emoji explainer</button>}
            
            {/* {showDetail ? <button onClick={() => setShowDetail(!showDetail)}>Close Details</button> : null}
        
            {showDetail ? <GameDetail detailID={currentGame.id}/> : null} */}

            {/* <ul className='game-list'> {showGames} </ul> */}
            
            <div className='games-list-container'>
                <div className='choose-category'>
                    <label for="category">Filter by category:</label>
                    <select className='category-select'
                        name="category" onChange={(e) => handleCategoryChange(e)} >
                        <option value="all">All </option>
                        <option value="card_game">Card Game</option>
                        <option value="dice">Dice Game</option>
                        <option value="negotiation">Negotiation Game</option>
                        <option value="party_game">Party Game</option>
                    </select>
                </div>
                <ul className='game-list'>
                        <GameList games={filteredGames} />
                </ul>
            </div>
            {/* {showDetail ? null : <ul className='game-list'> {showGames} </ul>} */}
        
        </>
    )
}

export default GamePage;
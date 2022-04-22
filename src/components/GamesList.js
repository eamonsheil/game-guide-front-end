import { useState, useEffect, useContext } from 'react'
import GameDetail from './GameDetail'
import Header from './Header'
import AddToGamesForm from './AddToGamesForm'
import {UserContext} from "./context/user"
// import Modal from 'react-modal';
// import ReactHtmlParser from 'react-html-parser'

const defaultObj = {
    search:  "",
    numPlayers: 0,
    playtime: 0
}

function GamesList() {
    const [user, setUser] = useContext(UserContext)
    const [showKey, setShowKey] = useState(false)
    const [games, setGames] = useState([])
    // const [filteredGames, setFilteredGames] = useState([])
    const [show, setShow] = useState([false])
    const [showGameForm, setShowGameForm] = useState(false)
    const [formData, setFormData] = useState(defaultObj)
    const [showDetail, setShowDetail] = useState(false)
    const [currentGame, setCurrentGame] = useState({})
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        getAllGames()
    },[])

    function getAllGames() {
        fetch(`http://localhost:9292/games_with_comments`)
        .then( res => res.json())
        .then( data => setGames(data))
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
        // console.log(game.game_relationships)
        // const description = document.createElement("div")
        return (

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
                    {user && !isOwnedDiv ? <button onClick={() => toggleGameForm(game)}>Add to My Games</button> : null}
                    {showGameForm ? <AddToGamesForm currentGame={currentGame} setShowGameForm={setShowGameForm}/> : null}
            </li>
        )
    })

    function toggleGameForm(game) {
        setShowGameForm(!showGameForm)
        setCurrentGame(game)
        // document.scrollTo(options.top)
    }

    function toggleGameDetail(game) {
        //console.log(currentGame, showDetail)
        // console.log(game)
        setShowDetail(!showDetail)
        setCurrentGame(game)
    }

    function handleFormChange(event){
        setFormData({
            ...formData,
            [event.target.name] : event.target.value
        })
        if (!formData.search){
        // console.log(formData)
            getAllGames()}
    }

    function handleCategoryChange(e) {
        const filteredGames = games.filter(game => (
            game.categories.includes(e.target.value)
        ))
        e.target.value === "all" ? getAllGames() : setGames(filteredGames)
    }

    function handleFormSubmit(event) {
        event.preventDefault()
        console.log(formData)
        const playtime = (!formData.playtime? 9999 : formData.playtime)
        const numPlayers = (!formData.numPlayers? 999 : formData.numPlayers)
        console.log("playtime:", playtime, "numPlayers:", numPlayers)

            if (!formData.search) {
                fetch(`http://localhost:9292/search/${playtime}/${numPlayers}`)
                .then( res => res.json())
                .then( data => setGames(data))
                .catch( error => console.log(error.message));
            }
            else {        
                fetch(`http://localhost:9292/search/${formData.search}/${playtime}/${numPlayers}`)
                .then( res => res.json())
                .then( data => setGames(data))
                .catch( error => console.log(error.message));        
            }
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
        <div className='search-form-container'>
            <form className='search-form' onSubmit={event => handleFormSubmit(event)}>
                <input id='search-input' name="search" 
                type="text"
                placeholder='Search by name....' 
                value={formData.search} 
                onChange={event => handleFormChange(event)}/>
                <label>Num players:
                    <input
                        id='num-player-input' 
                        onChange={event => handleFormChange(event)} 
                        value={formData.numPlayers} 
                        min="0"
                        name="numPlayers" 
                        type="number"/>
                </label>
                <label>Play time (in min):
                    <input 
                        onChange={(event) => handleFormChange(event)} 
                        value={formData.playtime} 
                        placeholder=""
                        min="0"
                        name="playtime" 
                        type="number"/>
                </label>
                <div>
                <input className='game-list-submit' type="submit"></input>
                </div>
                </form>
            </div>
            <label for="category">filter by category</label>
            <br/>
            <select name="category" onChange={(e) => handleCategoryChange(e)} >
                <option value="all">Category </option>
                <option value="card_game">Card Game</option>
                <option value="dice">Dice Game</option>
                <option value="negotiation">Negotiation Game</option>
                <option value="party_game">Party Game</option>
            </select>
            



            {showKey ? emojiKey : <button className='emoji-btn' onClick={()=> setShowKey(true)}>emoji explainer</button>}
            <br/>
            {showDetail ? <button onClick={() => setShowDetail(!showDetail)}>Close Details</button> : null}
        
            {showDetail ? <GameDetail detailID={currentGame.id}/> : null}

            <ul className='game-list'> {showGames} </ul>

            {/* {showDetail ? null : <ul className='game-list'> {showGames} </ul>} */}
        
        </>
    )
}

export default GamesList;


    {/* <button onClick={handleModal}id="myBtn">Open Modal</button> */}

    // function handleModal(event){
    //     //event.target.style.display = "block"
    //     return(
    //         <div id="myModal" class="modal">

    //             <div class="modal-content">
    //                 <span onClick={closeModal} class="close">&times;</span>
    //                 <p>Some text in the Modal..</p>
    //             </div>
    //         </div>
    //     )
        
    // }

    // function closeModal(event){
    //     event.target.parent.style.display = "none"
    // }
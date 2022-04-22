import { useState, useEffect, useContext } from 'react'
import GameList from './GameList'
import Header from './Header'
import {UserContext} from "./context/user"

const defaultObj = {
    search:  "",
    numPlayers: 0,
    playtime: 0
}

function GamePage() {
    const [user, setUser] = useContext(UserContext)


    const [games, setGames] = useState([])
    const [filteredGames, setFilteredGames] = useState([])
    const [show, setShow] = useState([false])
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [formData, setFormData] = useState(defaultObj)

    useEffect(() => {
        getAllGames()
    },[])

    function getAllGames() {
        fetch(`http://localhost:9292/games_with_comments`)
        .then( res => res.json())
        .then( data => setGames(data))
    }


    function handleFormChange(event){
        setFormData({
            ...formData,
            [event.target.name] : event.target.value
        })
        if (!formData.search){
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


    return (
        <>
        <Header location="GameList" />
        <form onSubmit={event => handleFormSubmit(event)}>
            <input name="search" 
            placeholder='Search by name....' 
            value={formData.search} 
            onChange={event => handleFormChange(event)}/>
            <br/>
            <label>Num players:
                <input 
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

            <label for="category">filter by category</label>
            <br/>
            <select name="category" onChange={(e) => handleCategoryChange(e)} >
                <option value="all">Category </option>
                <option value="card_game">Card Game</option>
                <option value="dice">Dice Game</option>
                <option value="negotiation">Negotiation Game</option>
                <option value="party_game">Party Game</option>
            </select>
            
            {/* {showKey ? emojiKey : <button className='emoji-btn' onClick={()=> setShowKey(true)}>Emoji Explainer</button>} */}
            <br/>

            <ul className='game-list'>
                <GameList games={games} />
            </ul>
        
        </>
    )
}

export default GamePage;


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
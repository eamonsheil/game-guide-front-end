import { useState, useEffect } from 'react'
import GameDetail from './GameDetail'
import Header from './Header'
import AddToGamesForm from './AddToGamesForm'
// import Modal from 'react-modal';
// import ReactHtmlParser from 'react-html-parser'

const defaultObj = {
    search:  "",
    numPlayers: 999,
    playtime: 9999,
    category: "all"
}

function GamesList() {
    const [games, setGames] = useState([])
    const [show, setShow] = useState([false])
    const [showGameForm, setShowGameForm] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [formData, setFormData] = useState(defaultObj)
    //const [search, setSearch] = useState("")
    const [showDetail, setShowDetail] = useState(false)
    const [currentGame, setCurrentGame] = useState({})

    useEffect(() => {
        console.log(formData)

        fetch(`http://localhost:9292/games_with_comments`)
        .then( res => res.json())
        .then( data => setGames(data))
    },[])


    const showGames = games.map((game) => {
        // const description = document.createElement("div")
        return(
            <li className='game-list-item' key={game.id}>
               
                    <img className="games-list-img" src={game.image_url} alt={game.title} height="100px" width="auto"/>
                    <p>Title: <strong>{game.title}</strong></p>
                    {/* short description? */}
                    {/* {ReactHtmlParser(game.description)} */}
                    <button onClick={() => toggleGameDetail(game)}>View Details</button>
                    <button onClick={() => setShowGameForm(!showGameForm)}>Add to My Games</button>
                    {showGameForm? <AddToGamesForm currentGame={currentGame}/> : null}
            </li>
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
        console.log(formData)

        if (!formData.search) {
            fetch(`http://localhost:9292/search/${formData.playtime}/${formData.numPlayers}`)
        .then( res => res.json())
        .then( data => setGames(data))
        .catch( error => console.log(error.message));
        }
        else {
        
        fetch(`http://localhost:9292/search/${formData.search}/${formData.playtime}/${formData.numPlayers}`)
        .then( res => res.json())
        .then( data => setGames(data))
        .catch( error => console.log(error.message));
        
        }
    }

    return (
        <>
        <Header />
        <form onSubmit={event => handleFormSubmit(event)}>
            <input name="search" placeholder='Search by name....' value={formData.search} onChange={event => handleFormChange(event)}/>
            <br/>
            <select name="category" onChange={event => handleFormChange(event)}>
                <option value="all">Category </option>
                <option value="card_game">Card Game</option>
                <option value="dice_game">Dice Game</option>
                <option value="negotiation_game">Negotiation Game</option>
            </select>
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
            <input type="submit"></input>
            </form>

            
            {showDetail ? <button onClick={() => setShowDetail(!showDetail)}>Close Details</button> : null}
        
            {showDetail ? <GameDetail currentGame={currentGame}/> : null}

             <ul className='game-list'> {showGames} </ul>
        
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
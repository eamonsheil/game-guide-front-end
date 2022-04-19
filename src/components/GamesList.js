import { useState, useEffect } from 'react'
import GameDetail from './GameDetail'
import Header from './Header'
// import Modal from 'react-modal';
// import ReactHtmlParser from 'react-html-parser'

function GamesList() {
    const [games, setGames] = useState([])
    const [show, setShow] = useState([false])
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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
        return(
            <div className='game-list-item'>
                <ul>
                    <img className="games-list-img" src={game.image_url} alt={game.title} height="100px" width="auto"/>
                    <p>Title: <strong>{game.title}</strong></p>
                    {/* short description? */}
                    {/* {ReactHtmlParser(game.description)} */}
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
        fetch(`http://localhost:9292/search/${formData.search}/${formData.playtime}/${formData.numPlayers}`)
        .then( res => res.json())
        .then( data => setGames(data))
        .catch( error => console.log(error.message));
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

            
        
        <ul className='game-list'>
            {showDetail ? <button onClick={() => setShowDetail(!showDetail)}>Show All</button> : null}
            {showDetail ? <GameDetail currentGame={currentGame}/> : showGames}
        </ul>
        
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
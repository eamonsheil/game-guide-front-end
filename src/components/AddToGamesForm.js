import {useState, useContext} from 'react'
import {UserContext} from "./context/user"


function AddToGamesForm({currentGame, setShowGameForm}) {
    const [user, setUser] = useContext(UserContext)

    const [formData, setFormData] = useState({
        game_id: currentGame.id,
        owned: false,
        played: false,
        liked: false,
        comment: "",
        hours_played: 0
    })

    function handleFormChange(event){
        setFormData({
            ...formData,
            [event.target.name] : event.target.value
        })
    }

    function handleCheckChange(event){
        setFormData({
            ...formData,
            [event.target.name] : event.target.checked
        })
    }

    function addToMyGames(e) {
        e.preventDefault()
        console.log(formData.game_id)
        fetch(`http://localhost:9292/game_relationships`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                game_id: currentGame.id,
                user_id: user.id,
                owned: formData.owned,
                played: formData.played,
                liked: formData.liked,
                comment: formData.comment,
                hours_played: formData.hours_played
            })
        })
        .then( res => res.json())
        .then( data => {
            e.target.reset()
            setShowGameForm(false)
            console.log(currentGame)
            alert(`${currentGame.title} added to your game list!`)
        })
        .catch( error => console.log(error.message));
    }

    return (
        <div className='add-game-form'>
            <form onSubmit={addToMyGames}>
                
                    <label>Do you own this game?</label>
                    <input onChange={handleCheckChange} type="checkbox" name="owned"></input>
                    <br/>
                    <label >Have you played it?</label>
                    <input  onChange={handleCheckChange}  type="checkbox" name="played"></input>
                    {/* <br/> */}
                    {/* <label >If yes, for how many total hours?</label>
                    <input  onChange={handleFormChange} type="number" name="hours_played"></input> */}
                    <br/>
                    <label >Did you like it?</label>
                    <input  onChange={handleCheckChange} type="checkbox" name="liked"></input>
                    <br/>
                    <input  onChange={handleFormChange} type="text" name="comment" placeholder="Any comments to add?"></input>
                    <br/>
                    <input className="add-game-form-submit" type="submit"/>
            </form>
        </div>
    )
}

export default AddToGamesForm
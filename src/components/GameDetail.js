import { useState, useEffect, useContext } from 'react'
import {UserContext} from "./context/user"
import AddToGamesForm from './AddToGamesForm'
import { v4 as uuid } from "uuid";
import GameList from './GameList';


function GameDetail({detailID}) {


    const [user, setUser] = useContext(UserContext)
    
    const [showGameForm, setShowGameForm] = useState(false)

    const [currentGame, setCurrentGame] = useState({
        title: "Game Loading!",
        rating: 0,
        description: "<p><strong>Azul</strong> was designed by the world famous, award-winning game author Michael Riesling. Azul captures the beautiful aesthetics of Moorish art in a contemporary board game.</p>\r\n<p>Players compete as artisans decorating the walls of the royal Palace of Dvora. By carefully drafting the correct Quantity and style of tiles, the most clever of artisans plan ahead to maximize the beauty of their work (not to mention their scores!) while ensuring they wasted no supplies in the process.</p>\r\n<p>Introduced by the moors, &quot;azulejos&quot; (originally white and blue ceramic tiles) were fully embraced by the Portuguese, when their King Manuel I, on a visit to the Alhambra Palace in Southern Spain, was mesmerized by the stunning beauty of the Moorish decorative tiles. The King, awestruck by the interior beauty of the Alhambra, immediately ordered that his own Palace in Portugal be decorated with similar wall tiles.</p>\r\n<p>As a tile-laying artist, you have been challenged to embellish the walls of the royal Palace of Dvora.</p>",
        image_url:  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAbFBMVEUAAAD////s7Ow/Pz/w8PBhYWH6+vr39/c4ODhdXV2srKylpaVqamrJycn09PT8/PwWFhbDw8NXV1e9vb2np6fh4eHU1NTn5+d4eHh+fn6Xl5cxMTGfn59SUlLOzs5vb2+GhoYqKiq1tbWKiorn5zr+AAABxUlEQVR4nO3X7W7aMBgG0DhNA7SNaUhhhTJK2f3f42y+itRo2v6QbZwjodivjWQ/SoIpCgAAAAAAAAAAAAAAAAAAAAAAAAAAAPjrjMo4PjabKluf6mW1yI1JTK1jPU+exfLbYXKqzGIeioOsfAAhhLt94/trWXVtGzbLUz3kUIr71OjaLtXfcnE8CWGayvMQHorlOjRtNw/L98HWf1XnsB5CaA79U/0cVp0uZQjvp7Byfx9W6r8VxUsI1UCrv7JzWI/7sJ4PYS3bsLiPdfv9MqynU1ihXZ3Dusv35OvToHu4mv6w0m3WHfLpDSs0zxdh3Y7+sNKT1f4qrD1h/XlY69VqtR1yC9fTH9b6+BhOfiOs80/B/68vrEldp0vMn2lfWHWxvQjrI73g5sNu4lr6wspHq7Zpms2x8zWsWRM/31mPtxTW275xcc465nNOru+ctfg8Z61vKay267qXYrYsq13XhcU255MP6cXH6TbbdbvpYjv+coL/8ZK+vJvfTFjTqhqNRnXe7WaUPaa/g3Us89jHtJqmThWP9TS5Hs8Og5uYK7M6jcQqLgbdAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/FN+AqW1EoKj9wjeAAAAAElFTkSuQmCC",
        min_play_time: 30,
        max_play_time: 60,
        max_players: 4,
        min_players: 2,
        min_age: 8,
        is_expansion: false,
        mechanics: "",
        categories: "",
        game_relationships: []
    })

    const [similarGames, setSimilarGames] = useState([])

    
    function toggleGameForm(game){
        setShowGameForm(!showGameForm)
        setCurrentGame(game)
        // document.scrollTo(options.top)
    }

    useEffect(() => {
        fetch(`http://localhost:9292/games/${detailID}`)
        .then(resp => resp.json())
        .then(data => setCurrentGame(data))
        .then(fetch(`http://localhost:9292/get_similar_games/${detailID}`)
        .then(resp => resp.json())
        .then(data => setSimilarGames(data))
        )
    }, [showGameForm])

    const showDescription = {__html: currentGame.description}

    function getPrettyComments() {
        const comments = currentGame.game_relationships.map(relationship => {
            return (
            <div className="comment-box" key={uuid}>
            <img className='comment-img' src={relationship.user.profile_pic.picture_src} 
            alt={relationship.user.profile_pic.alt_text}
            height="50"
            />
            <p className='comment-content'><strong>{relationship.user.username} </strong> - {relationship.comment } </p>
            </div>
            )
        })
        return comments.reverse()
    }

    let currentGameOwned = false
    if(user)  {
        // console.log(currentGame.game_relationships)
        currentGame.game_relationships.forEach(relationship => {
        if(relationship.user_id === user.id){
            currentGameOwned = true
        }
        })}

    return(
        <div className='game-detail'>

                <img className="game-detail-img" src={currentGame.image_url} alt={currentGame.title} height="200px" width="auto"/>

                <div className="game-detail-info">
                    <p><strong>Title: </strong>{currentGame.title}</p>
                    <p><strong>Categories:</strong> {currentGame.categories.split("_").join(" ")}</p>
                    <p><strong>Gameplay Mechanics: </strong>{currentGame.mechanics.split("_").join(" ")}</p>
                    <p><strong>Rating: </strong>{Math.floor(currentGame.rating)} / 10</p>
                    <p><strong>Play time:</strong> {currentGame.min_play_time} - {currentGame.max_play_time} minutes</p>
                    <p><strong>Number of players:</strong> {currentGame.min_players} to {currentGame.max_players}</p>
                    {user && !currentGameOwned ? <button className="form-button" onClick={() => toggleGameForm(currentGame)}>Add to Your Game List?</button> : null}
                    {showGameForm ? <AddToGamesForm setShowGameForm={setShowGameForm} currentGame={currentGame} /> : <p className='in-your-list'> This game is in your list! </p>} 

                    <p><strong>Game Description:</strong></p>
                    <div className="detail-description" dangerouslySetInnerHTML={showDescription}/>
                    
                </div>
                <strong>User Comments:</strong>
                <div className="comments">
                    <div>
                        {getPrettyComments()}
                    </div>
                </div>
                <p>{similarGames.length > 0 ? "Check out these similar games!" : "this game is unique"}</p>
                <div className='game-list'>
                    <GameList games={similarGames}/>
                </div>
        </div>

    )
}

export default GameDetail
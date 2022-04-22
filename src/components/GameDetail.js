import {useEffect, useState} from 'react';
import { v4 as uuid } from "uuid";


function GameDetail({detailID}) {

    const [currentGame, setCurrentGame] = useState({
        title: "Azul",
        rating: 1,
        description: "<p><strong>Azul</strong> was designed by the world famous, award-winning game author Michael Riesling. Azul captures the beautiful aesthetics of Moorish art in a contemporary board game.</p>\r\n<p>Players compete as artisans decorating the walls of the royal Palace of Dvora. By carefully drafting the correct Quantity and style of tiles, the most clever of artisans plan ahead to maximize the beauty of their work (not to mention their scores!) while ensuring they wasted no supplies in the process.</p>\r\n<p>Introduced by the moors, &quot;azulejos&quot; (originally white and blue ceramic tiles) were fully embraced by the Portuguese, when their King Manuel I, on a visit to the Alhambra Palace in Southern Spain, was mesmerized by the stunning beauty of the Moorish decorative tiles. The King, awestruck by the interior beauty of the Alhambra, immediately ordered that his own Palace in Portugal be decorated with similar wall tiles.</p>\r\n<p>As a tile-laying artist, you have been challenged to embellish the walls of the royal Palace of Dvora.</p>",
        image_url:  "https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1559254200327-61EFZADvURL.jpg",
        min_play_time: 30,
        max_play_time: 60,
        max_players: 4,
        min_players: 2,
        min_age: 8,
        is_expansion: false,
        mechanics: "drafting, end_game_bonuses, pattern_building, tile_placement",
        categories: "abstract",
        game_relationships: []
    })

    const [similarGames, setSimilarGames] = useState([])

    useEffect(() => {
        fetch(`http://localhost:9292/games/${detailID}`)
        .then(resp => resp.json())
        .then(data => setCurrentGame(data))
        .then(fetch(`http://localhost:9292/get_similar_games/${detailID}`)
        .then(resp => resp.json())
        .then(data => setSimilarGames(data))
        )
    }, [])

    const showDescription = {__html: currentGame.description}

    function getPrettyComments(){
        const comments = currentGame.game_relationships.map(relationship => {
            return (
                <div className="comment-box" key={uuid}>
                    <img className='comment-img' src={relationship.user.profile_pic.picture_src} 
                    alt={relationship.user.profile_pic.alt_text}
                    height="50"/>
                    <p className='comment-content'><strong>{relationship.user.username} </strong> {relationship.comment + " - "} </p>
                </div>
            )
        })
        return comments
    }

    const prettySimilarGames = similarGames.map(game => {
        return  <div className='similar-game' key={uuid}>
                    <img className="similar-game-detail-img" src={game.image_url} alt={game.title} height="100px" width="auto"/>
                    <p><strong>Title: </strong>{game.title}</p>
                </div>
    })


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
                <p><strong>Game Description:</strong></p>                    
                <div className="detail-description" dangerouslySetInnerHTML={showDescription}/>  
            </div>
            
            <strong>User Comments:</strong>
            
            <div className="comments">
                    {getPrettyComments()}
            </div>
                <p>{prettySimilarGames.length > 0 ? <b>Check out some similar games!</b> : "this game is unique"}</p>  
            <div className='similar-game-bin'>
                {prettySimilarGames}
            </div>
        </div>

    )
}

export default GameDetail
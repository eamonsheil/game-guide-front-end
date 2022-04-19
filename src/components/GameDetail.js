



function GameDetail({currentGame}) {

    function getPrettyComments {
        currentGame.game_relationships
    }


    return(

            <div>
                <img src={currentGame.image_url} alt={currentGame.title} height="200px" width="auto"/>
                <p><strong>Title: </strong>{currentGame.title}</p>
                <p><strong>Categories:</strong> {currentGame.categories.split("_").join(" ")}</p>
                <p><strong>Rating: </strong>{Math.floor(currentGame.rating)} / 10</p>
                <p><strong>Play time:</strong> {currentGame.min_play_time} - {currentGame.max_play_time} minutes</p>
                <p><strong>Number of players:</strong> {currentGame.min_players} to {currentGame.max_players}</p>
                {currentGame.description}
                <div className="comments">
                 {/* currentGame.game_relationships.comment */}
                </div>
            </div>

    )
}

export default GameDetail
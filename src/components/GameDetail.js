import Header from './Header'


function GameDetail({currentGame}) {

    console.log(currentGame)
    function getPrettyComments(){
        const comments = currentGame.game_relationships.map(relationship => {
            return <p>{relationship.comment + " - "}  <strong>{relationship.user.username} </strong></p>
        })
        return comments
    }


    return(
        <div>
                <Header />
                <img class="game-detail-img" src={currentGame.image_url} alt={currentGame.title} height="200px" width="auto"/>
                
                <div class="game-detail-info">
                    <p><strong>Title: </strong>{currentGame.title}</p>
                    <p><strong>Categories:</strong> {currentGame.categories.split("_").join(" ")}</p>
                    <p><strong>Rating: </strong>{Math.floor(currentGame.rating)} / 10</p>
                    <p><strong>Play time:</strong> {currentGame.min_play_time} - {currentGame.max_play_time} minutes</p>
                    <p><strong>Number of players:</strong> {currentGame.min_players} to {currentGame.max_players}</p>
                    {currentGame.description}
                </div>
                <div className="comments">
                    <strong>User Comments:</strong>
                    <div>
                    {getPrettyComments()}
                    </div>
                </div>
            </div>

    )
}

export default GameDetail
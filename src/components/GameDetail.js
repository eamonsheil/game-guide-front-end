import {useEffect} from 'react';

function GameDetail({currentGame}) {

    console.log(currentGame)
    function getPrettyComments(){
        const comments = currentGame.game_relationships.map(relationship => {
            return <p>{relationship.comment + " - "}  <strong>{relationship.user.username} </strong></p>
        })
        return comments
    }

    // fetch(`http://localhost:9292/get_similar_games/${currentGame.id}`)
    // .then( res => res.json())
    // .then( data => console.log(data))

    // useEffect(() => {
    //     fetch(`http://localhost:9292/get_similar_games/${currentGame.id}`)
    //     .then(resp => resp.json())
    //     .then(data => {
    //         console.log("is there data?", data)
    //     })
    // }, [])


    return(
        <div>
                {/* <Header /> */}
                <img className="game-detail-img" src={currentGame.image_url} alt={currentGame.title} height="200px" width="auto"/>
                
                <div className="game-detail-info">
                    <p><strong>Title: </strong>{currentGame.title}</p>
                    <p><strong>Categories:</strong> {currentGame.categories.split("_").join(" ")}</p>
                    <p><strong>Gameplay Mechanics: </strong>{currentGame.mechanics.split("_").join(" ")}</p>
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
                <div>
                    <p> similar games!</p>
                </div>
            </div>

    )
}

export default GameDetail




function GameDetail({currentGame}) {


    return (

            <div>
               <img src={currentGame.image_url} alt={currentGame.title} height="100px" width="100px"/>
               <p>Title: {currentGame.title}</p>
               <p>Playstyle: {currentGame.play_style}</p>
               <p>Rating: {Math.floor(currentGame.rating)}</p>
               <p>Average play time: {currentGame.avg_play_time}</p>
               <p>Min/Max players: {currentGame.min_players}/{currentGame.max_players}</p>
               {currentGame.description}
            </div>

    )
}

export default GameDetail
import {UserContext} from "./context/user"
import {useContext} from 'react'
import Header from "./Header"
import{useNavigate} from 'react-router-dom'


function UserPage() {
    const [user] = useContext(UserContext)
    const navigate = useNavigate()

    let gameDisplay

    if(user.game_relationships){
        const gamesToShow = user.game_relationships.map(relationship => {
            const game = (relationship.game)
            return(
                <li className='game-list-item'>
                    <img className="games-list-img" src={game.image_url} alt={game.title} height="100px" width="auto"/>
                    <p>Title: <strong>{game.title}</strong></p>
                    {/* short description? */}
                    {/* {ReactHtmlParser(game.description)} */}
                {/* <button onClick={() => toggleGameDetail(game)}>View Details</button> */}
                </li>
            )
        })

        gameDisplay = <div>
            <h4>Your Saved Games</h4>
            {gamesToShow}
        </div>
    }
    else{
        gameDisplay = <div>
            <p>you have no saved games! Oh nooooooooo</p>
            <p>check out our game page to add some games to your list</p>
            <button onClick={()=>navigate('/games')}>FIND SOME DAMN GAMES</button>
        </div>
    }
    //user.games

    // const showGames = user.game_relationships.map((relationship) => {
    //     game = relationship.game
    //     return(
    //         <li className='game-list-item'>
    //                 <img className="games-list-img" src={game.image_url} alt={game.title} height="100px" width="auto"/>
    //                 <p>Title: <strong>{game.title}</strong></p>
    //                 {/* short description? */}
    //                 {/* {ReactHtmlParser(game.description)} */}
    //                 <button onClick={() => toggleGameDetail(game)}>View Details</button>
    //         </li>
    //     )
    // })
    return (
        <div className="user-page">
            <Header/>
            <h2>User Page....</h2>
            <p>User: {user.username }</p>
            {gameDisplay}
        </div>
    )
}

export default UserPage
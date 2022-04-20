


function addToGamesForm({currentGame}) {

    function addToMyGames(e) {

        e.preventDefault()
        console.log("added", currentGame)
    }

    return (
        <div>
            <form onSubmit={addToMyGames}>
                
                    <label for="isOwned">Do you own this game?</label>
                    <input type="checkbox" name="isOwned"></input>
                    <br/>
                    <label for="havePlayed">Have you played it?</label>
                    <input type="checkbox" name="havePlayed"></input>
                    <br/>
                    <label for="hoursPlayed">If yes, for how many total hours?</label>
                    <input type="number" name="hoursPlayed"></input>
                    <br/>
                    <label for="didEnjoy">Did you like it?</label>
                    <input type="checkbox" name="didEnjoy"></input>
                    <br/>
                    <input type="text" name="comment" placeholder="Any thoughts?"></input>

                    <input type="submit"/>
            </form>
        </div>
    )
}

export default addToGamesForm
import {UserContext} from "./context/user"
import {useContext} from 'react'
import Header from "./Header"

function UserPage() {
    const user = useContext(UserContext)

    return (
        <div className="user-page">
            <Header/>
            <h2>User Page....</h2>
            <p>User: {user.username }</p>
        </div>
    )
}

export default UserPage
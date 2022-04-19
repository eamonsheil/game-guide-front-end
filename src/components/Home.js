import {useState, useContext} from 'react'
import{useNavigate} from 'react-router-dom'
import NewUserForm from './NewUserForm'
import {UserContext} from "./context/user"


const defaultobj = {username: "", password: ""}
function Home() {
    const [user, setUser] = useContext(UserContext)

    const [userInfo, setUserInfo] = useState(defaultobj)
    const [testUser, setTestUser] = useState({
        username: "",
        password: ""
    })
    const [isNewUser, setIsNewUser] = useState(false)
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()

        fetch(`http://localhost:9292/users/by-username/${userInfo.username}`)
        .then( res => res.json())
        .then( data => setTestUser(data))

        if (userInfo.username === testUser.username && userInfo.password === testUser.username){
            setUser(testUser)
            navigate("/games")
        }
        else{
            alert("Invalid user!")
            setUserInfo(defaultobj)
            setIsNewUser(()=>!isNewUser)}
    }   

    function handleChange({target: {value, name}}) {
        // const {target: {value, name}} = e
        setUserInfo({...userInfo, [name]: value})
    }

    return (
        <div>
            <h1>Homepage</h1>

            <form type="submit" onSubmit={handleSubmit}>
                <label for="username">Enter your username:</label>
                <input type="text" name="username" onChange={handleChange} value={userInfo.username}/>
                <label for="password" >Enter your password:</label>
                <input type="text" name="password" onChange={handleChange} value={userInfo.password}/>
                <input type="submit"/>
            </form>

            {isNewUser ? <NewUserForm setIsNewUser={setIsNewUser} isNewUser={isNewUser}/> : null}

        </div>
        


    )
}

export default Home
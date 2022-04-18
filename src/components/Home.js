import {useState} from 'react'
import{useNavigate} from 'react-router-dom'
import NewUserForm from './NewUserForm'


const defaultobj = {username: "", password: ""}
function Home() {
    const [userInfo, setUserInfo] = useState(defaultobj)
    const [isNewUser, setIsNewUser] = useState(false)
    const navigate = useNavigate()

    function handleSubmit(e){
        e.preventDefault()

        if (userInfo.username === "eamon" && userInfo.password === "password")
            navigate("/welcome")
        else{
            alert("Invalid user!")
            setUserInfo(defaultobj)
            setIsNewUser(()=>!isNewUser)}
    }   

    function handleChange({target: {value, name}}){
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
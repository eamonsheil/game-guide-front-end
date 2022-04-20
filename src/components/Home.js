import {useState, useContext} from 'react'
import{useNavigate} from 'react-router-dom'
import NewUserForm from './NewUserForm'
import {UserContext} from "./context/user"


const defaultobj = {username: "", password: ""}
function Home() {
    const [user, setUser] = useContext(UserContext)

    const [userInfo, setUserInfo] = useState(defaultobj)
    const [isNewUser, setIsNewUser] = useState(false)
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        console.log("whats in the form: ", userInfo)
        if(userInfo.username ===""){
            alert("please enter username!")
        }

        fetch(`http://localhost:9292/users/by-username/${userInfo.username}`)
        .then( res => res.json())
        .then( data => {
            console.log(data)
            if (data){
                // console.log(data.username === userInfo.username && data.password===userInfo.password)
                if(userInfo.username === data.username && userInfo.password === data.password){
                    setUser(data)
                    navigate("/games")
                }
                else{
                    alert("Invalid login!")
                    setUserInfo(defaultobj)
                    setIsNewUser(()=>!isNewUser)}
                }
            else{
                alert("Invalid login!")
                setUserInfo(defaultobj)
                setIsNewUser(()=>true)}

            }
        )
    }   

    function handleChange({target: {value, name}}) {
        setUserInfo({...userInfo, [name]: value})
    }

    function beGuest(){
        setUser(null)
        navigate('/games')
    }

    return (
        <div>
            <h1>Homepage</h1>

            <form type="submit" onSubmit={handleSubmit}>
                <div>
                    <label for="username">Enter your username:</label>
                    <input type="text" name="username" onChange={handleChange} value={userInfo.username}/>
                </div>
                <label for="password" >Enter your password:</label>
                <input type="text" name="password" onChange={handleChange} value={userInfo.password}/>
                <input type="submit"/>
            </form>

            <button onClick={beGuest}>continue as guest</button>

            {isNewUser ? <NewUserForm setIsNewUser={setIsNewUser} isNewUser={isNewUser}/> : null}

        </div>
        


    )
}

export default Home
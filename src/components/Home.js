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
        if(userInfo.username ===""){
            alert("please enter username!")
        }

        fetch(`http://localhost:9292/users/by-username/${userInfo.username}`)
        .then( res => res.json())
        .then( data => {
            if (data){
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
        <div className='login'>
            <h1>Game Guide</h1>

            <form type="submit" onSubmit={handleSubmit}>
                <div>
                    <label >Enter your username:</label>
                    <input type="text" name="username" onChange={handleChange} value={userInfo.username}/>
                </div>

                <label >Enter your password:</label>
                <input type="password" name="password" onChange={handleChange} value={userInfo.password}/>
                <div></div>
                <input className='login-submit' type="submit"/>
            </form>

            <button onClick={beGuest}>Continue as Guest</button>
            {/* <br/> */}
            <button onClick={() => setIsNewUser(!isNewUser)}>Create an Account</button>

            {isNewUser ? <NewUserForm setIsNewUser={setIsNewUser} isNewUser={isNewUser}/> : null}

        </div>
    )
}

export default Home
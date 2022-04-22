import {useState, useContext, useEffect} from 'react'
import{useNavigate} from 'react-router-dom'
import {UserContext} from "./context/user"

const newUserObj = {
    username: '',
    password: '',
    profile_pic: ''
}
function NewUserForm({setIsNewUser, isNewUser}){
    const [user, setUser] = useContext(UserContext)
    const [profilePics, setProfilePics] = useState([])
    const navigate = useNavigate()
    const [newUserInfo, setNewUserInfo] = useState(newUserObj)

    useEffect(() => {
        fetch(`http://localhost:9292/profile_pics`)
        .then( res => res.json())
        .then( data => setProfilePics(data))
    },[])


    function handleFormChange(event){
        setNewUserInfo({
            ...newUserInfo,
            [event.target.name] : event.target.value
        })
    }

    function handleOptionChange(e) {
            console.log(e.target.value)
            setNewUserInfo({
                ...newUserInfo, profile_pic: e.target.value
            })
    }

    function handleSubmit(e){
        e.preventDefault()
        
        if (newUserInfo.password === "" || newUserInfo.username === "" || newUserInfo.profile_pic === ""){
            alert("You must have a username AND a password!")
        }
        
        else {
        fetch(`http://localhost:9292/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                password: newUserInfo.password,
                username: newUserInfo.username,
                profile_pic_id: newUserInfo.profile_pic
            })
        })
        .then( res => res.json())
        .then( data => {
            setUser(data)
            navigate('/games')
        })
        .catch( error => console.log(error.message));

    }}

    return (
        <div>
            <h4>New user? Create an account here</h4>
            <form onSubmit={handleSubmit}>
                <label>Name: </label>
                    <input name="username" onChange={handleFormChange} type="text" />
                <br/>
                <label>Password:</label>
                    <input name="password" onChange={handleFormChange} type="password" />
            
                <h6>Choose a Profile Picture:</h6>
                <div className='avatar-select' >
                    {profilePics.map((pic) => (
                            <label for="profile_pic">
                                <img id={pic.id} src={pic.picture_src} alt={pic.alt_text} style={{height: 50}}/>
                                <input id={pic.id} type="radio" name="profile_pic" value={pic.id} onChange={handleOptionChange}/>
                            </label>
                            )
                        )}
                </div>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default NewUserForm
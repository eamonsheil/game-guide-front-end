import {useState, useContext} from 'react'
import{useNavigate} from 'react-router-dom'
import {UserContext} from "./context/user"


function NewUserForm({setIsNewUser, isNewUser}){
    const [user, setUser] = useContext(UserContext)
    const navigate = useNavigate()


    const [newUserInfo, setNewUserInfo] = useState({
        username: '',
        password: ''
    })

    function handleFormChange(event){
        setNewUserInfo({
            ...newUserInfo,
            [event.target.name] : event.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        //setIsNewUser(()=>!isNewUser)
        console.log(newUserInfo)

        fetch(`http://localhost:9292/users/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                password: newUserInfo.password,
                username: newUserInfo.username
            })
        })
        .then( res => res.json())
        .then( data => {
            console.log(data)
            setUser(data)
            navigate('/games')
        })
        .catch( error => console.log(error.message));

    }



    return (
        <div>
            <h4>New user? Create an account here</h4>
        <form onSubmit={handleSubmit}>
            <table>
            <tr>
                <td> <label>Name: </label></td>
                <td><input name="username" onChange={handleFormChange} type="text" /></td>
            </tr>
            <tr>
                <td>
                    <label>Password:</label>
                </td>
                <td>
                    <input name="password" onChange={handleFormChange} type="text" />
                </td>
            </tr>
            <tr>
                <input type="submit"/>
            </tr>
            </table>
        </form>
        </div>
    )
}

export default NewUserForm
import {useState} from 'react'

function NewUserForm({setIsNewUser, isNewUser}){
    const [newUserInfo, setNewUserInfo] = useState({
        newUsername: '',
        newUserPassword: ''
    })

    function handleFormChange(event){
        setNewUserInfo({
            ...FormData,
            [event.target.name] : event.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        setIsNewUser(()=>!isNewUser)
        fetch(`http://localhost:9292/users/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                newUserInfo
            })
        })
        .then( res => res.json())
        .then( data => setNewUserInfo(data))
        .catch( error => console.log(error.message));
    }



    return (
        <div>
            <h4>New user? Create an account here</h4>
        <form onSubmit={handleSubmit}>
            <table>
            <tr>
                <td> <label for="name">Name: </label></td>
                <td><input onChange={handleFormChange} type="text" name="name"/></td>
            </tr>
            <tr>
                <td>
                    <label for="password">Pasword:</label>
                </td>
                <td>
                    <input  onChange={handleFormChange} type="text" name="password"/>
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
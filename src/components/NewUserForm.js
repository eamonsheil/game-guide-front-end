
function NewUserForm({setIsNewUser, isNewUser}){

    function handleSubmit(e){
        e.preventDefault()
        setIsNewUser(()=>!isNewUser)
    }

    return (
        <div>
            <h4>New user? Create an account here</h4>
        <form onSubmit={handleSubmit}>
            <table>
            <tr>
                <td> <label for="name">Name: </label></td>
                <td><input type="text" name="name"/></td>
            </tr>
            <tr>
                <td>
                    <label for="password">Pasword:</label>
                </td>
                <td>
                    <input type="text" name="password"/>
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
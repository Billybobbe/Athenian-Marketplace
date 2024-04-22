import {useState} from 'react'
var userName;
var password;

export default function LoginPage(){
    const [error, setError] = useState(null);

    return(
        <div id="loginPage" style={styles.loginPage}>
            <div id="loginBox" style={styles.loginBox}>
                <text style={{fontWeight: "bold", marginBottom: 30, padding: "00px 20px 00px 20px", border: "3px dotted black"}}>Login</text>
                <text>Name</text>
                <input placeholder="Enter School Email" on/>
                <text style={{marginTop: 30}}>Password</text>
                <input type="password" value={password} placeholder="Enter Account Password"/>
                <button style={{marginTop: 30}}>Login</button>
                <div id="additionalOptions" style={{marginTop: 30}}>
                    <button onMouseDown={createAccount()}>Create Account</button>
                    <button onMouseDown={resetPassword()}>Forgot Password?</button>
                </div>
                <text>{error}</text>
            </div>
        </div>
    )
}

function login(){
    //do some login thing here with username and password
}
function createAccount(){
    //navigate to account creation page
}
function resetPassword(){
    //navigate to password reset page
}

const styles = {
    loginPage: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: 400,
    },
    loginBox: {
        marginTop: 30,
        padding: "30px 30px 30px 30px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        border: "3px solid black",
        gap: 5,
    },
}
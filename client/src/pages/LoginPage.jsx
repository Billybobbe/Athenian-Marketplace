import {useState} from 'react'
import { API } from '../App';

export default function LoginPage(){
    const [error, setError] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    return(
        <div id="loginPage" style={styles.loginPage}>
            <div id="loginBox" style={styles.loginBox}>
                <text style={{fontWeight: "bold", marginBottom: 30, padding: "00px 20px 00px 20px", border: "3px dotted black"}}>Login</text>
                <text>Name</text>
                <input placeholder="Enter School Email" value={email} onChange={(value)=>setEmail(value.target.value)} on/>
                <text style={{marginTop: 30}}>Password</text>
                <input type="password" placeholder="Enter Account Password" value={password} onChange={(value)=>setPassword(value.target.value)}/>
                <button style={{marginTop: 30}} onClick={()=>login(email, password, setError)}>Login</button>
                <div id="additionalOptions" style={{marginTop: 30}}>
                    <button onMouseDown={createAccount}>Create Account</button>
                    <button onMouseDown={resetPassword}>Forgot Password?</button>
                </div>
                <text>{error}</text>
            </div>
        </div>
    )   
}

function login(email, password, setError){
    var data = {"email" : email, "password" : password};
    fetch(API + "/login/getAuthKey", {
        method: "POST",
        headers: {
            "Content-type" : "application/json",
        },
        body: JSON.stringify(data),
    }).then(response=>response.json()).then(data=>{
        if(data.error == "0"){
            localStorage.setItem("AUTH_TOKEN", data.data);
            window.location.replace("/browse");
        }
        else{
            setError(data.data);
        }
    })
}
function createAccount(){
    window.location.href = "/create-account";
}
function resetPassword(){
    window.location.href = "/forgot-account";
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
import {useState} from 'react'
var userName;
var password;
var verifyCode;

export default function CreateAccountPage(){
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null);

    const authBox = <div id="twoFactorAuth" style={styles.twoFactorAuth}>
            <text>Enter verification code</text>
            <input value={verifyCode}></input>
        </div>

    return(
        <div id="loginPage" style={styles.loginPage}>
            <div id="loginBox" style={styles.loginBox}>
                <text style={{fontWeight: "bold", marginBottom: 30, padding: "00px 20px 00px 20px", border: "3px dotted black"}}>Create Account</text>
                <text>Name</text>
                <input placeholder="Enter School Email" on/>
                <text style={{marginTop: 30}}>Password</text>
                <input type="password" value={password} placeholder="Enter Account Password"/>
                {status=="authentication" &&
                    <div id="twoFactorAuth" style={styles.twoFactorAuth}>
                        <text>Enter verification code</text>
                        <input value={verifyCode}></input>
                    </div>}
                <button style={{marginTop: 30}} onMouseDown={()=>{createAccount(status, setStatus)}}>Create Account</button>
                <text>{error}</text>
            </div>
        </div>
    )
}

function createAccount(status, setStatus){
    if(status==null){
        setStatus("authentication");
        //do request for authentication
        return;
    }
    if(status=="authentication"){
        //do finishing stuff here
    }
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
    twoFactorAuth: {
        marginTop: 30,
        display: "flex",
        flexDirection: "column",
        gap: 5,
    },
}
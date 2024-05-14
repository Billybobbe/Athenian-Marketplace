import {useState} from 'react'

export default function CreateAccountPage(){
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null);
    const [userName, setUserName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [verifyCode, setVerifyCode] = useState(null);

    const authBox = <div id="twoFactorAuth" style={styles.twoFactorAuth}>
            <text>Enter verification code</text>
            <input value={verifyCode}></input>
        </div>

    return(
        <div id="loginPage" style={styles.loginPage}>
            <div id="loginBox" style={styles.loginBox}>
                <text style={{fontWeight: "bold", marginBottom: 30, padding: "00px 20px 00px 20px", border: "3px dotted black"}}>Create Account</text>
                <text>Email</text>
                <input placeholder="Enter School Email" value={email} onChange={(value)=>{setEmail(value.target.value)}} on/>
                <text style={{marginTop: 30}}>Password</text>
                <input type="password" value={password} placeholder="Enter Account Password"/>
                <text style={{marginTop:30}}>Name</text>
                <input value={userName} onChange={(value)=>{setUserName(value.target.value)}} placeholder="Enter first and last name"/>
                <text style={{marginTop: 30}}>Account Photo</text>
                <input type="file"/>
                {status=="authentication" &&
                    <div id="twoFactorAuth" style={styles.twoFactorAuth}>
                        <text>Enter verification code</text>
                        <input value={verifyCode} placeholder="6 digit code sent to email"></input>
                    </div>}
                <button style={{marginTop: 30}} onMouseDown={()=>{createAccount(status, setStatus, setError, email, password, userName, verifyCode)}}>Create Account</button>
                <text>{error}</text>
            </div>
        </div>
    )
}

function createAccount(status, setStatus, setError, email, password, userName, verifyCode){
    if(status==null){
        var data = {"email" : email};
        fetch("/create-account/registerAccountForVerification", {
            method: "POST",
            headers: {
                "Content-type" : "application/json",
            },
            body: JSON.stringify(data),
        }).then(response=>response.json()).then(data=>{
            if(data.error == "0"){
                setStatus("authentication");
                setError(null);
            }
            else{
                setError(data.data);
            }
        })
        return;
    }
    if(status=="authentication"){
        var data = {"email" : email, "password" : password, "name" : userName, "verifyCode" : verifyCode}
        fetch("/create-account/registerAccount", {
            method: "POST",
            headers: {
                "Content-type" : "application/json",
            },
            body: JSON.stringify(data),
        }).then(response=>response.json()).then(data=>{
            if(data.error == "0"){
                localStorage.setItem("AUTH_TOKEN", data.data);
                setError(null);
                window.location.replace("/browse");
            }
            else{
                setError(data.data);
            }
        });
    }
}

const styles = {
    loginPage: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
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
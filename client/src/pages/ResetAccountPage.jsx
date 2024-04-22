import {useState} from 'react'
var userName;
var password;
var verifyCode;

export default function ResetAccountPage(){
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null);

    const authBox = <div id="twoFactorAuth" style={styles.twoFactorAuth}>
            <text>Enter verification code</text>
            <input value={verifyCode}></input>
        </div>

    return(
        <div id="loginPage" style={styles.loginPage}>
            <div id="loginBox" style={styles.loginBox}>
                <text style={{fontWeight: "bold", marginBottom: 30, padding: "00px 20px 00px 20px", border: "3px dotted black"}}>Reset Account</text>
                <text>Name</text>
                <input placeholder="Enter School Email" on/>
                <text style={{marginTop: 30}}>Authentication Code</text>
                <input value={verifyCode} placeholder="Enter Authentication Code"/>
                {status=="newPassword" &&
                    <div id="twoFactorAuth" style={styles.twoFactorAuth}>
                        <text>New Password</text>
                        <input value={password} placeholder="Enter new password"></input>
                    </div>}
                <button style={{marginTop: 30}} onMouseDown={()=>{resetAccount(status, setStatus)}}>Reset Account</button>
                <text>{error}</text>
            </div>
        </div>
    )
}

function resetAccount(status, setStatus){
    if(status==null){
        setStatus("newPassword");
        //do request for authentication
        return;
    }
    if(status=="newPassword"){
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
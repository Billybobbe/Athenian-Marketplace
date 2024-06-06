import {useEffect, useState} from "react"
import { API } from "../App";
export default function AccountTray(){
    const authToken = localStorage.getItem("AUTH_TOKEN");
    const [trayOpened, setTrayOpened] = useState(false);
    const [profileImage, setProfileImage] = useState("/users/getPhoto?imageID=undefined")
    const [userName, setUserName] = useState("");

    useEffect(()=>loadInfo(authToken, setProfileImage, setUserName), []);

    return(
        <div id="accountTray" style={styles.accountTray}>
            <text style={styles.accountText}>{userName}</text>
            <button style={{background: "transparent", border: "transparent"}} onMouseDown={toggleTray}>
                <img style={styles.profilePhoto} src={profileImage}/>
            </button>
            {trayOpened &&
                <TrayPart logoutFunction={()=>logout(authToken)}/>
            }
        </div>
    );
    function toggleTray(){
        trayOpened ? setTrayOpened(false) : setTrayOpened(true);
    }
}
function TrayPart({logoutFunction}){
    return(
        <div id="accountPanel" style={styles.accountPanel}>
            <button onMouseDown={logoutFunction}>Logout</button>
            <button onMouseDown={()=>{window.location.href = "/settings"}}>Settings</button>
        </div>
    )
}
function logout(authKey){
    var params = {"authKey" : authKey}
    fetch(API + "/logout/destroyAuthKey", {
        method: "POST",
        headers: {
            "Content-type" : "application/json",
        },
        body: JSON.stringify(params),
    });
    localStorage.removeItem("AUTH_TOKEN");
    window.location.href = "/login";
}
function loadInfo(authKey, setProfileImage, setUserName){
    var params = {"authKey" : authKey};
    fetch(API + "/users/authKeyUser", {
        method: "POST",
        headers: {
            "Content-type" : "application/json",
        },
        body: JSON.stringify(params),
    }).then(response=>response.json()).then(data=>{
        if(data.error == "0"){
            setProfileImage(API + "/users/getPhoto?imageID=" + data.photoURL);
            setUserName(data.userName);
        }
        if(data.error == "1"){
            window.location.href = "/login";
        }
    })
}

const styles = {
    accountTray: {
        display: "flex",
        flexDirection: "row",
      
    },
    accountPanel: {
        display: "flex",
        flexDirection: "column",
    },
    profilePhoto: {
        height: 45,
        width: 45,
        borderRadius: 100,
    },
    accountText: {
        alignSelf: "center",
    },
};
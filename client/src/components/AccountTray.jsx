import {useState} from "react"
export default function AccountTray(){
    const [trayOpened, setTrayOpened] = useState(false);
    return(
        <div id="accountTray" style={styles.accountTray}>
            <button style={{background: "transparent", border: "transparent"}} onMouseDown={toggleTray}>
                <img style={styles.profilePhoto} src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"/>
            </button>
            {trayOpened &&
                <TrayPart/>
            }
        </div>
    );
    function toggleTray(){
        trayOpened ? setTrayOpened(false) : setTrayOpened(true);
    }
}
function TrayPart(){
    return(
        <div id="accountPanel" style={styles.accountPanel}>
            <button onMouseDown={logout}>Logout</button>
            <button onMouseDown={()=>{window.location.href = "/settings"}}>Settings</button>
        </div>
    )
}
function logout(){
    //Send thing to server saying we are logging out.
    localStorage.removeItem("AUTH_TOKEN");
    window.location.href = "/login";
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
        borderRadius: 100,
    },
};
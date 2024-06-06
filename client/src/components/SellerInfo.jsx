
import {useState} from 'react'
import { API } from '../App';

export default function SellerInfo({authKey, sellerID, listingName}){
    const [imageSrc, setImageSrc] = useState(API + "/listing/getPhoto?imageID=undefined");
    const [sellerName, setSellerName] = useState("");
    const [joinDate, setJoinDate] = useState(null);
    const [gradDate, setGradDate] = useState(null);
    const [email, setEmail] = useState(null);

    loadInfo(authKey, sellerID, setSellerName, setJoinDate, setGradDate, setEmail, setImageSrc);

    return(
        <div id="SellerInfo" style={styles.accountMainBox}>
            <div id="nameAndPhoto" style={styles.nameAndPhoto}>
                <img style={styles.accountPhoto} src={imageSrc}/>
                <text>{sellerName}</text>
            </div>
            <text>Joined {joinDate}</text>
            <text>Graduating in {gradDate}</text>
            <button style={{marginTop: 40}} onMouseDown={()=>messageSeller(email, listingName)}>Message</button>
        </div>
    );
}
function messageSeller(email, listingName){
    window.open("https://mail.google.com/mail/?view=cm&fs=1&to="+email+"&su=" + listingName);
}
function loadInfo(authKey, sellerID, setSellerName, setJoinDate, setGradDate, setEmail, setImageSrc){
    var params = {"authKey" : authKey, "userId" : sellerID};
    fetch(API + "/users/" + sellerID, {
        method: "POST",
        headers: {
            "Content-type" : "application/json",
        },
        body: JSON.stringify(params),
    }).then(response=>response.json()).then(data=>{
        console.log(data.error);
        if(data.error == "0"){
            setSellerName(data.userName);
            setJoinDate(data.joinDate);
            var gradDate = data.email.substring(0, 2);
            setGradDate("20"+gradDate);
            setImageSrc(API + "/users/getPhoto?imageID=" + data.photoURL);
            setEmail(data.email);
        }
    })
}

const styles = {
accountMainBox: {
    padding: "40px 0px 0px 0px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
},
nameAndPhoto: {
    marginBottom: 20,
    display: "flex",
    flexDirection: "row",
    gap: 10,
},
accountPhoto: {
    width: 45,
    height: 45,
    borderRadius: 100,
    verticalAlign: "middle",
},
};
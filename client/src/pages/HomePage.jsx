import { useState, useEffect} from "react";
import { API } from "../App";
import ListingTile from "../components/ListingTile";
import HeaderBox from "../components/HeaderBox";

export default function HomePage(){
    const [userName, setUserName] = useState("John Doe");
    const authToken = localStorage.getItem("AUTH_TOKEN");
    const [userListings, setUserListings] = useState(null);

    useEffect(()=>{
        loadListings(authToken, setUserListings);
    }, []);

    return(
        <div id="main">
            <HeaderBox/>
            <div id="page" style={styles.page}>
            <   text style={styles.heading}>{"Hello " + userName + "!"}</text>
                <div id="userActions" style={styles.actions}>
                    <text style={styles.heading}>Actions</text>
                </div>
                <div id="userListings">
                    <text style={styles.heading}>Your listings</text>
                    <div id="listings" style={{display: "flex", flexWrap: "wrap"}}>
                         {userListings}
                    </div>
                </div>
            </div>
        </div>
    );
}

function loadListings(authToken, setListings){
    var requestData = {"authKey" : authToken};
    fetch(API + "/listing/getAllFromAuthKey", {
        method: "POST",
        headers: {
            "Content-type" : "application/json",
        },
        body: JSON.stringify(requestData),
    }).then(response=>response.json()).then(async function(data){
        console.log(data);

        if(data.error == "1"){
            //we do nothing here for now
        }
        if(data.error == "0"){
            setListings(await buildListings(authToken, data.listings));
        }
    })
}
async function buildListings(authToken, listingIds){

    var listingList = [];
    for(var i = 0; i < listingIds.length; i++){
        const listing = await getListing(authToken, listingIds[i]);
        if(listing==null){continue}; // any bad listings we skip displaying
        var frontImage = "undefined";
        if(listing.imageIds != null){
            frontImage = listing.imageIds[0];
        }
        listingList.push(<ListingTile key={i} title={listing.title} price={listing.price} location={listing.location} image={API + "/listing/getPhoto?imageID="+frontImage} id={listingIds[i]}/>)
    }
    return listingList;
}
async function getListing(authToken, listingId){
    var listing;
    await fetch(API + "/listing/"+listingId, {
        method: "POST",
        headers: {
            "Content-type" : "application/json",
        },
        body: JSON.stringify({"authKey" : authToken}),
    }).then(response=>response.json()).then(data=>{
        if(data.error == "0"){
            listing = data.listing;
        }
        else{
            console.log(data.message);
            return null;
        }
    })
    return listing;
}


const styles = {
    page: {
        display: "flex",
        flexDirection: "column",
        gap: 40,
    },
    actions: {
        display: "flex",
        flexDirection: "column",
        gap: 40,
    },
    heading: {
        fontSize: 40,
    },
}
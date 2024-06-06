import BrowseSideBar from "../components/BrowseSidebar";
import ListingTile from "../components/ListingTile";
import HeaderBox from "../components/HeaderBox"
import ListingPage from "./ListingPage";
import {useEffect, useState} from "react";
import { API } from "../App";

export default function BrowsePage(){
    const authToken = localStorage.getItem("AUTH_TOKEN");
    const [minPrice, setMinPrice] = useState(0);
    const [price, setPrice] = useState([0, 10000]);
    const [searchFilter, setSearchFilter] = useState("");
    const [listingID, setListingID] = useState(null);
    const [listings, setListings] = useState([]);

    useEffect(()=>{
        loadListings(authToken, price, searchFilter, setListings);
    }, []);

    return(
        <div id="main">
        <HeaderBox/>
        <div id="page" >
            {listingID==null &&
                <div id="listingsOverview" style={styles.listingPage}>
                    <BrowseSideBar price={price} setPrice={setPrice} filter={searchFilter} setFilter={setSearchFilter} listingsNearby={listings.length} startSearch={()=>{loadListings(authToken, price, searchFilter, setListings)}}/>
                    <div id="listings" style={styles.listings}>
                        {listings}
                    </div>
                </div>
            }
            {listingID != null &&
                <ListingPage authKey={authToken} listingID={listingID}/>
            }
        </div>
    </div>
    );
}
function loadListings(authToken, price, searchFilter, setListings){
    var requestData = {"authkey" : authToken, "minPrice" : price[0], "maxPrice" : price[1], "keywords" : [searchFilter], "condition" : []};
    fetch(API + "/listing/getAllWithAttrib", {
        method: "POST",
        headers: {
            "Content-type" : "application/json",
        },
        body: JSON.stringify(requestData),
    }).then(response=>response.json()).then(async function(data){
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
    listingPage: {
        display: "flex",
        flexDirection: "row",
    },
    listings: {
        display: 'flex',
        flexDirection: "row",
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        width: '80%',
    },
};
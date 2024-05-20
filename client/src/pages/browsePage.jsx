import BrowseSideBar from "../components/BrowseSidebar";
import ListingTile from "../components/ListingTile";
import HeaderBox from "../components/HeaderBox"
import ListingPage from "./ListingPage";
import {useState} from "react";

export default function BrowsePage(){
    const authToken = localStorage.getItem("AUTH_TOKEN");
    const [minPrice, setMinPrice] = useState(0);
    const [price, setPrice] = useState([0, 10000]);
    const [searchFilter, setSearchFilter] = useState("");
    const [listingID, setListingID] = useState(null);

    var listings = loadListings(authToken, price, searchFilter);

    return(
        <div id="main">
        <HeaderBox/>
        <div id="page" >
            {listingID==null &&
                <div id="listingsOverview" style={styles.listingPage}>
                    <BrowseSideBar price={price} setPrice={setPrice} filter={searchFilter} setFilter={setSearchFilter}/>
                    <div id="listings" style={styles.listings}>
                        
        
                    </div>
                </div>
            }
            {listingID != null &&
                <ListingPage listingID={listingID}/>
            }
        </div>
    </div>
    );
}
function loadListings(authToken, price, searchFilter){
    var requestData = {"authkey" : authToken, "minPrice" : price[0], "maxPrice" : price[1], "keywords" : searchFilter};
    fetch("/getAllWithAttrib", {
        method: "POST",
        headers: {
            "Content-type" : "application/json",
        },
        body: JSON.stringify(requestData),
    }).then(response=>response.json()).then(data=>{
        if(data.error == "1"){
            window.location.href = "/login";
        }
        if(data.error == "0"){
            buildListings(authToken, data.listings);
        }
    })
}
function buildListings(authToken, listingIds){
    var listingList = {};
    for(var i = 0; i < listingIds.length(); i++){
        var listing = <ListingTile image={}/>
    }
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
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

    return(
        <div id="main">
        <HeaderBox/>
        <div id="page" >
            {listingID==null &&
                <div id="listingsOverview" style={styles.listingPage}>
                    <BrowseSideBar minPrice={minPrice} price={price} setPrice={setPrice} filter={searchFilter} setFilter={setSearchFilter}/>
                    <div id="listings" style={styles.listings}>
                        <ListingTile image={"https://cdn.britannica.com/22/187222-050-07B17FB6/apples-on-a-tree-branch.jpg"} title={"Apple"} price={500} location={"tree"}/>
                        <ListingTile image={"https://cdn.britannica.com/22/187222-050-07B17FB6/apples-on-a-tree-branch.jpg"} title={"Apple"} price={500} location={"tree"}/>
                        <ListingTile image={"https://cdn.britannica.com/22/187222-050-07B17FB6/apples-on-a-tree-branch.jpg"} title={"Apple"} price={500} location={"tree"}/>
                        <ListingTile image={"https://cdn.britannica.com/22/187222-050-07B17FB6/apples-on-a-tree-branch.jpg"} title={"Apple"} price={500} location={"tree"}/>
                        <ListingTile image={"https://cdn.britannica.com/22/187222-050-07B17FB6/apples-on-a-tree-branch.jpg"} title={"Apple"} price={500} location={"tree"}/>
                        <ListingTile image={"https://cdn.britannica.com/22/187222-050-07B17FB6/apples-on-a-tree-branch.jpg"} title={"Apple"} price={500} location={"tree"}/>
                        <ListingTile image={"https://cdn.britannica.com/22/187222-050-07B17FB6/apples-on-a-tree-branch.jpg"} title={"Apple"} price={500} location={"tree"}/>
                        <ListingTile image={"https://cdn.britannica.com/22/187222-050-07B17FB6/apples-on-a-tree-branch.jpg"} title={"Apple"} price={500} location={"tree"}/>
                        <ListingTile image={"https://cdn.britannica.com/22/187222-050-07B17FB6/apples-on-a-tree-branch.jpg"} title={"Apple"} price={500} location={"tree"}/>
                        <ListingTile image={"https://cdn.britannica.com/22/187222-050-07B17FB6/apples-on-a-tree-branch.jpg"} title={"Apple"} price={500} location={"tree"}/>
                        <ListingTile image={"https://cdn.britannica.com/22/187222-050-07B17FB6/apples-on-a-tree-branch.jpg"} title={"Apple"} price={500} location={"tree"}/>
                        <ListingTile image={"https://cdn.britannica.com/22/187222-050-07B17FB6/apples-on-a-tree-branch.jpg"} title={"Apple"} price={500} location={"tree"}/>
                        <ListingTile image={"https://cdn.britannica.com/22/187222-050-07B17FB6/apples-on-a-tree-branch.jpg"} title={"Apple"} price={500} location={"tree"}/>
                        <ListingTile image={"https://cdn.britannica.com/22/187222-050-07B17FB6/apples-on-a-tree-branch.jpg"} title={"Apple"} price={500} location={"tree"}/>
                        <ListingTile image={"https://cdn.britannica.com/22/187222-050-07B17FB6/apples-on-a-tree-branch.jpg"} title={"Apple"} price={500} location={"tree"}/>
                        <ListingTile image={"https://cdn.britannica.com/22/187222-050-07B17FB6/apples-on-a-tree-branch.jpg"} title={"Apple"} price={500} location={"tree"}/>
                        <ListingTile image={"https://cdn.britannica.com/22/187222-050-07B17FB6/apples-on-a-tree-branch.jpg"} title={"Apple"} price={500} location={"tree"}/>
                        <ListingTile image={"https://cdn.britannica.com/22/187222-050-07B17FB6/apples-on-a-tree-branch.jpg"} title={"Apple"} price={500} location={"tree"}/>
                        <ListingTile image={"https://cdn.britannica.com/22/187222-050-07B17FB6/apples-on-a-tree-branch.jpg"} title={"Apple"} price={500} location={"tree"}/>
                        <ListingTile image={"https://cdn.britannica.com/22/187222-050-07B17FB6/apples-on-a-tree-branch.jpg"} title={"Apple"} price={500} location={"tree"}/>
                        <ListingTile image={"https://cdn.britannica.com/22/187222-050-07B17FB6/apples-on-a-tree-branch.jpg"} title={"Apple"} price={500} location={"tree"}/>
                        <ListingTile image={"https://cdn.britannica.com/22/187222-050-07B17FB6/apples-on-a-tree-branch.jpg"} title={"Apple"} price={500} location={"tree"}/>
                        <ListingTile image={"https://cdn.britannica.com/22/187222-050-07B17FB6/apples-on-a-tree-branch.jpg"} title={"Apple"} price={500} location={"tree"}/>
                        <ListingTile image={"https://cdn.britannica.com/22/187222-050-07B17FB6/apples-on-a-tree-branch.jpg"} title={"Apple"} price={500} location={"tree"}/>
                        <ListingTile image={"https://cdn.britannica.com/22/187222-050-07B17FB6/apples-on-a-tree-branch.jpg"} title={"Apple"} price={500} location={"tree"}/>
                        <ListingTile image={"https://cdn.britannica.com/22/187222-050-07B17FB6/apples-on-a-tree-branch.jpg"} title={"Apple"} price={500} location={"tree"}/>
        
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
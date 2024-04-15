import BrowseSideBar from "../components/BrowseSidebar";
import ListingTile from "../components/ListingTile";
import HeaderBox from "../components/HeaderBox"
import {useState} from "react";

export default function BrowsePage(){
    const [minPrice, setMinPrice] = useState(0);
    const [price, setPrice] = useState([0, 10000]);
    const [searchFilter, setSearchFilter] = useState("");

    return(
        <div id="main">
        <HeaderBox/>
        <div id="page" style={styles.page}>
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
    </div>
    );
}

const styles = {
    page: {
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
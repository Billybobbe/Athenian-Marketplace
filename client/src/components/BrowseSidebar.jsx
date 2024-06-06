import { useState } from "react";
import RangeSlider from "react-range-slider-input"
import 'react-range-slider-input/dist/style.css'
export default function BrowseSideBar({startSearch, price, setPrice, listingsNearby, setFilter}){
    return(
        <div id="browseSidebar" style={styles.browseSideBar}>
            <div id="searchSegment">
                <text>{listingsNearby} Listings Nearby</text>
                <div id="searchBox">
                    <input type="text" placeholder="Enter filters here" style={styles.searchField.searchBox} onChange={(value)=>{setFilter(value.target.value)}}/>
                    <button style={styles.searchField.searchButton}><img style={styles.searchField.searchButton.buttonImage} src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Search_Icon.svg/2048px-Search_Icon.svg.png" onMouseDown={startSearch}/></button>
                </div>  
            </div>
            <div id="priceSegment">
                <text>Price Filter</text>
                <RangeSlider style={styles.slider} max={10000} value={price} onInput={setPrice}/>
                <div style={styles.pricingSpace} id="priceTexts">
                    <text style={styles.pricingSpace.price}>${price[0]}</text>
                    <text style={styles.pricingSpace.price}>${price[1]}</text>
                </div>
            </div>
        </div>
    )
}


const styles = {
    browseSideBar: {
        display: "flex",
        flexDirection: "column",
        height: 1000,
        width: '20%',
        border: '3px solid blue',
        padding: '0px 10px 0px 10px',
    },
    searchField: {
        searchButton: {
            background: "#0095ff",
            border: "1px solid transparent",
            borderRadius: 3,
            boxShadow: "rgba(255, 255, 255, .4) 0 1px 0 0 inset",
            boxSizing: "border-box",
            color: "#fff",
            cursor: "pointer",
            display: "inline-block",
            fontFamily: '-apple-system,system-ui,"Segoe UI","Liberation Sans",sans-serif',
            fontSize: 13,
            fontWeight: 400,
            lineHeight: 1.15385,
            margin: 0,
            outline: "none",
            //padding: "8px .8em",
            position: "relative",
            textAlign: "center",
            textDecoration: "none",
            userSelect: "none",
            webkitUserSelect: "none",
            touchAction: "manipulation",
            verticalAlign: "middle",
            whiteSpace: "nowrap",
            buttonImage: {
                width: 20,
                height: 20,
            },
       },
       searchBox: {
            margin: "0px 0px 10px 0px",
            border: "2px solid rgba(15, 15, 15, 1)",
            borderRadius: 3,
            boxShadow: "rgba(255, 255, 255, .4) 0 1px 0 0 inset",
            width: "70%",
            height: 20,
            
       },
       slider: {
             padding: "10px 10px 10px 0px",
             flex: 1,
       },
    },
    pricingSpace: {
        flex: 1,
        flexDirection: "row",
        price: {
            margin: "0px 0px 0px 20px",
        },
   },
}
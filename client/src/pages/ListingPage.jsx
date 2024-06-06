import {Carousel} from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SellerInfo from '../components/SellerInfo';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import HeaderBox from '../components/HeaderBox';
import { API } from '../App';
import "react-image-gallery/styles/css/image-gallery.css";
import ReactImageGallery from 'react-image-gallery';

export default function ListingPage(){
    const authToken = localStorage.getItem("AUTH_TOKEN");
    const {listingId} = useParams();

    const [imageArray, setImageArray] = useState([]);
    const [title, setTitle] = useState(null);
    const [price, setPrice] = useState(null);
    const [description, setDescription] = useState(null);
    const [condition, setCondition] = useState("unknown");
    const [location, setLocation] = useState(null);
    const [sellerId, setSellerId] = useState(null);
    var itemInfoArray = [["Condition", condition],]
    
    var imageCauroselData = buildImageCarouselComponent(imageArray);
    var itemInfoData = buildItemInfo(itemInfoArray);

    useEffect(()=>{loadListing(authToken, listingId, setImageArray, setTitle, setPrice, setDescription, setLocation, setSellerId, setCondition)}, []);

    if(window.innerWidth<700){
        styles.centerRow = {...styles.centerRow, flexDirection: "column", alignItems: "center"};
        console.log(styles.centerRow);
    }
    else{
        styles.centerRow = {...styles.centerRow, flexDirection: "row", alignItems: "left"};
    }

    return(
        <div id="main">
            <HeaderBox/>
            <div id="listingPage" style={styles.listing}>
                <div id="titleAndPriceBox" style={styles.titleAndPriceBox}>
                    <text style={styles.title}>{title}</text>
                    <text style={{...styles.title,...styles.price}}>${price}</text>
                </div>
                <div id="centerRow" style={styles.centerRow}>
                    <div id="itemInfo" style={styles.itemInfo}>
                        <text style={{...styles.title,...{border: '3px black dotted', textAlign: "center"}}}>Item Info</text>
                        <div id="itemInfoValues" style={styles.itemInfo.upperDiv}>
                            {itemInfoData}
                        </div>
                    </div>
                    <div id="carousel" style={styles.carousel}>
                        <ReactImageGallery items={imageCauroselData}></ReactImageGallery>
                    </div>
                    <div id="sellerInfo" style={styles.sellerInfo}>
                        <text style={{...styles.title,...{border: '3px black dotted', textAlign: "center"}}}>Seller Info</text>
                        <SellerInfo sellerID={sellerId} authKey={authToken} listingName={title}/>
                    </div>
                </div>
                <text style={styles.title}>Description</text>
                <text>{description}</text>
                <div id="descriptionBox"/>
            </div>
        </div>
    );
}
function buildImageCarouselComponent(imageArray){
    var resultingCarousel = [];
    for(var i = 0; i<imageArray.length; i++){
        resultingCarousel.push({original: imageArray[i]});
    }
    return(resultingCarousel);
}
function buildItemInfo(itemInfoArray){
    var resultingInfo = [];
    var titleRow = [];
    var keyRow = [];
    for(var i = 0; i < itemInfoArray.length; i++){
        titleRow.push(<text key={i} style={styles.itemInfo.entry.title}>{itemInfoArray[i][0]}:</text>)
        keyRow.push(<text key={i+itemInfoArray.length} style={styles.itemInfo.entry.value}>{itemInfoArray[i][1]}</text>)
    }
    return(<div id="upperDiv" style={styles.itemInfo.upperDiv}>
            <div id="titleRow" style={styles.itemInfo.titleDiv}>{titleRow}</div>
            <div id="keyRow" style={styles.itemInfo.valueDiv}>{keyRow}</div>
        </div>);
}
function loadListing(authToken, listingId, setImageArray, setTitle, setPrice, setDescription, setLocation, setSellerId, setCondition){
    var params = {"authKey" : authToken}
    fetch(API + "/listing/"+listingId,{
        method: "POST",
        headers: {
            "Content-type" : "application/json",
        },
        body: JSON.stringify(params),
    }).then(response=>response.json()).then(async (data)=>{
        if(data.error == "0"){
            setTitle(data.listing.title);
            setDescription(data.listing.description);
            setPrice(data.listing.price);
            setLocation(data.listing.location);
            setSellerId(data.listing.userId);
            switch(data.listing.itemCondition){
                case 0:
                    setCondition("New");
                    break;
                case 1:
                    setCondition("Used");
                    break;
                case 2:
                    setCondition("Poor");
                    break;
                case 3:
                    setCondition("Broken");
            }
            var images = data.listing.imageIds;
            if(images!=null){
                for(var i = 0; i<images.length; i++){
                    images[i] = API + "/listing/getPhoto?imageID="+images[i]; //adding url header to images so they can be requested
                setImageArray(images);
                }
            }
            else{
                setImageArray([API + "/listing/getPhoto?imageID=undefined"])
            }
        }
        else{
            setTitle("ERROR!");
            setDescription("ERROR!")
        }
    })
}

const styles = {
    itemInfo: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        upperDiv: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            margin: "0px 0px 0px 0px",
            gap: 50,
        },
        titleDiv: {
            display: "flex",
            flexDirection: "column",
        },
        valueDiv: {
            display: "flex",
            flexDirection: "column",
        },
        entry: {
           
            title: {
                fontWeight: "bold",
            },
            value: {

            },
        },
    },
    sellerInfo: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
    },
    listing: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "0px 30px 30px 30px",
    },
    titleAndPriceBox: {
        display: "flex",
        gap: 100,

    },
    centerRow: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        width: "100%",
        justifyContent: "center",
    },
    title: {
        fontSize: 30,
    },
    price: {
        color: "red",
    },
    image: {
        height: 300,
        width: 400,
    },
    carousel: {
        border: "5px red solid",
        width: "100%",
    },
}
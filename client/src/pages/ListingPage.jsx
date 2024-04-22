import {Carousel} from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SellerInfo from '../components/SellerInfo';

export default function ListingPage({listingID}){
    var imageArray = ['https://www.applesfromny.com/wp-content/uploads/2020/05/20Ounce_NYAS-Apples2.png', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1R5Z_LNbqS9Jhkwz9UO3VYH47WEamb_CT_Ffl9MzMgA&s', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/HLR-FOAM-PARTY-02.JPG/640px-HLR-FOAM-PARTY-02.JPG'];
    var title = "Apple Macbook Air";
    var price = 1245;
    var description = "It is really good and not broken. I did not eat it for breakfast or dinner.";
    var itemInfoArray = [["apple", "pear"],["bannana", "orange"],["plum", ""]]
    var location = "Sacremento";
    var sellerID;

    var imageCauroselData = buildImageCarouselComponent(imageArray);
    var itemInfoData = buildItemInfo(itemInfoArray);

    return(
        <div id="listing" style={styles.listing}>
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
                    <Carousel width={document.documentElement.clientWidth/3} dynamicHeight={false}>{imageCauroselData}</Carousel>
                </div>
                <div id="sellerInfo" style={styles.sellerInfo}>
                    <text style={{...styles.title,...{border: '3px black dotted', textAlign: "center"}}}>Seller Info</text>
                    <SellerInfo/>
                </div>
            </div>
            <text style={styles.title}>Description</text>
            <text>{description}</text>
            <div id="descriptionBox"/>
        </div>
    );
}
function buildImageCarouselComponent(imageArray){
    var resultingCarousel = [];
    for(var i = 0; i<imageArray.length; i++){
        resultingCarousel.push(<div key={i}><img src={imageArray[i]}/></div>);
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

const styles = {
    itemInfo: {
        width: "33%",
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
        width: "33%",
        display: "flex",
        flexDirection: "column",
    },
    listing: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    titleAndPriceBox: {
        display: "flex",
        gap: 100,

    },
    centerRow: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
    },
    title: {
        fontSize: 30,
    },
    price: {
        color: "red",
    },
    image: {
        height: 500,
        width: 700,
    },
    carousel: {
        border: "5px red solid",
    },
}
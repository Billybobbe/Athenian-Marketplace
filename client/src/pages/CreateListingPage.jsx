import {useState} from "react"

var itemCategoryValues = [];
var price;
var title;
var location;
var description;
var condition;

export default function CreateListingPage(){
    const [categoryConfig, setCategoryConfig] = useState([["Model year", "int"], ["Milage", "string"], ["Model Name", "string"]]);

    return(
        <div id="createListingPage" style={styles.createListingPage}>
            <div id="pageHalf1" style={styles.pageHalf}>
                <div id="titlePrice" style={styles.titlePrice}>
                    <div>
                        <text style={styles.titlePrice.text}>Item Name</text>
                        <input style={{width: "300"}} value={title}/>
                    </div>
                    <div>
                        <text style={styles.titlePrice.text}>Item Price</text>
                        $<input type="number" value={price}/>
                    </div>
                </div>
                <div id="descriptionBox" style={styles.descriptionBox}>
                    <text style={styles.text}>Item Description</text>
                    <textarea style={{height: 300, resize: "none"}} value={description}></textarea>
                </div>
            </div>
            <div id="pageHalf2" style={styles.pageHalf}>
                <text>Photo Upload</text>
                <img style={{width: 300, height: 300}} src="https://m.media-amazon.com/images/I/71YXpUzfKDL._AC_UF894,1000_QL80_.jpg"/>
                <div>
                    <text style={styles.titlePrice.text}>Location</text>
                    <input value={location}></input>
                </div>
                <div>
                    <text style={styles.titlePrice.text}>Condition</text>
                    <select name="Condition" value={condition}>
                        <option value={0}>new</option>
                        <option value={1}>used</option>
                        <option value={2}>poor</option>
                        <option value={3}>For parts/nonfunctional</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
function constructOptions(categoryConfig){
    const options = [];
    for(var i=0; i<categoryConfig.length; i++){
        if(categoryConfig[i][1] == "string"){
            options.push(<div><text>{categoryConfig[i][0]}</text><input/></div>);
        }
        if(categoryConfig[i][1] == "int"){
            options.push(<div><text>{categoryConfig[i][0]}</text><input type="number"/></div>);
        }
    }
    return(options);
}

const styles={
    createListingPage: {
        display: "flex",
        flexDirection: "row",
        padding: "20px 100px 0px 100px",
        gap: 0,
    },
    pageHalf: {
        display: "flex",
        flexDirection: "column",
        gap: 50,
        border: "3px black dotted",
        padding: "20px 100px 20px 100px", 
    },
    titlePrice: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        gap: 50,
        text: {
            marginRight: 10,
        },
    },
    descriptionBox: {
        display: "flex",
        flexDirection: "column",
    },
}
import {useState, useEffect} from "react"
import HeaderBox from "../components/HeaderBox";
import { API } from "../App";


export default function CreateListingPage(){
    const [categoryConfig, setCategoryConfig] = useState(null);
    const [categoryResults, setCategoryResults] = useState([]);
    const[itemType, setItemType] = useState("generic");
    const authToken = localStorage.getItem("AUTH_TOKEN");
    const [itemOptions, setItemOptions] = useState(null);
    const [price, setPrice] = useState(null);
    const[condition, setCondition] = useState(null);
    const[location, setLocation] = useState(null);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [images, setImages] = useState([]);

    useEffect(()=>{
        getItemTypes(authToken, setItemOptions);
        setCategoryConfig(constructOptions([["Model year", "int"], ["Milage", "string"], ["Model Name", "bool"]], categoryResults))}, []);
    return(
        <div id="main">
            <HeaderBox/>
            <div id="createListingPage" style={styles.createListingPage}>
                <div id="pageHalf1" style={styles.pageHalf}>
                    <div id="titlePrice" style={styles.titlePrice}>
                        <div>
                            <text style={styles.titlePrice.text}>Item Name</text>
                            <input style={{width: "300"}} value={title} onChange={value=>setTitle(value.target.value)}/>
                        </div>
                        <div>
                            <text style={styles.titlePrice.text}>Item Price</text>
                            $<input type="number" value={price} onChange={value=>setPrice(value.target.value)}/>
                        </div>
                    </div>
                    <div id="descriptionBox" style={styles.descriptionBox}>
                        <text style={styles.text}>Item Description</text>
                        <textarea style={{height: 300, width: "100%", resize: "none"}} value={description} onChange={value=>setDescription(value.target.value)}></textarea>
                    </div>
                    <div>
                        <button onMouseDown={()=>submitListing(authToken, price, title, location, description, condition, images)}>Submit listing</button>
                    </div>
                </div>
                <div id="pageHalf2" style={styles.pageHalf}>
                    <div>
                        <text style={styles.titlePrice.text}>Photo Upload</text>
                        <input type="file" multiple="multiple" onChange={value=>toBase64Image(value.target, images)}></input>
                    </div>
                    <div>
                        <text style={styles.titlePrice.text}>Location</text>
                        <input value={location} onChange={value=>setLocation(value.target.value)}></input>
                    </div>
                    <div>
                        <text style={styles.titlePrice.text}>Condition</text>
                        <select name="Condition" value={condition} onChange={value=>setCondition(value.target.value)}>
                            <option value={0}>new</option>
                            <option value={1}>used</option>
                            <option value={2}>poor</option>
                            <option value={3}>For parts/nonfunctional</option>
                        </select>
                    </div>
                    <div>
                        <text>Item Options</text>
                        <div id="optionsBox" style={styles.optionsBox}>
                            <div style={styles.optionsEntry}><text>Item type</text><select onChange={(value)=>{changeItemType(authToken, value.target.value, setItemType, setCategoryConfig)}}>{itemOptions}</select></div>
                            {categoryConfig}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
function submitListing(authKey, price, title, location, description, condition, images){
    var requestData = {"authKey" : authKey, "price" : price, "title" : title, "location" : location, "description" : description, "itemCondition" : condition, "photos" : images};
    fetch(API + "/listing/create/submit", {
        method: "POST",
        headers: {
            "Content-type" : "application/json",
        },
        body: JSON.stringify(requestData),
    }).then(response=>response.json()).then((data)=>{
        if(data.error == "1"){
            
        }
        if(data.error == "0"){
            window.location.href = "/browse";
        }
    });
}
function toBase64Image(imageFile, images){
    images.splice(0, images.length);
    var reader = new FileReader();
    recursiveBase64(imageFile, 0, images, reader);
       
}
function recursiveBase64(imageFile, index, images, reader){
    if(index==imageFile.files.length){
        return;
    }
    reader.readAsDataURL(imageFile.files[index]);
    reader.onloadend = function() {
        images.push(reader.result);
        recursiveBase64(imageFile, index+1, images, reader);
    }
}

function changeItemType(authKey, itemType, setItemType, setCategoryConfig){
    setItemType(itemType);
    if(itemType=="Generic"){
        setCategoryConfig(null);
        return;
    }
    var requestData = {"authKey" : authKey, "categoryName" : itemType};
    fetch(API + "/listing/getCategoryAttributes", {
        method: "POST",
        headers: {
            "Content-type" : "application/json",
        },
        body: JSON.stringify(requestData),
    }).then(response=>response.json()).then((data)=>{
        if(data.error == "1"){
            //we do nothing here for now
        }
        if(data.error == "0"){
            setCategoryConfig(constructOptions(data.jsonValues))
        }
    });
}
function getItemTypes(authToken, setItemOptions){
    var requestData = {"authKey" : authToken};
    fetch(API + "/listing/getCategories", {
        method: "POST",
        headers: {
            "Content-type" : "application/json",
        },
        body: JSON.stringify(requestData),
    }).then(response=>response.json()).then((data)=>{
        if(data.error == "1"){
            //we do nothing here for now
        }
        if(data.error == "0"){
            var itemOptionArray = [<option value={"Generic"}>Generic</option>];
            for(var i = 0; i<data.categories.length; i++){
                itemOptionArray.push(<option value={data.categories[i]}>{data.categories[i]}</option>)
            }
            setItemOptions(itemOptionArray);
        }
    });
}

function constructOptions(categoryConfig, categoryResults){
    const options = [];
    var i = 0;
    for(const [key, value] of Object.entries(categoryConfig)){
        if(value == "string"){
            options.push(<div style={styles.optionsEntry}><text>{key}</text><input/></div>);
        }
        if(value == "int"){
            options.push(<div style={styles.optionsEntry}><text>{key}</text><input type="number"/></div>);
        }
        if(value == "bool"){
            options.push(<div style={styles.optionsEntry}><text>{key}</text><input type="checkbox"/></div>);
        }
        i++;
    }
    return(options);
}

const styles={
    createListingPage: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        padding: "2% 5% 20px 5%",
        gap: 0,
    },
    pageHalf: {
        display: "flex",
        flexDirection: "column",
        gap: 50,
        border: "3px black dotted",
        padding: "2% 5% 2% 5%", 
    },
    titlePrice: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
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
    optionsEntry: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
    },
    optionsBox: {
        margin: "10px 0px 0px 0px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
    }
}
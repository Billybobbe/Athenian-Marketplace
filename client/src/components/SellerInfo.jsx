export default function SellerInfo({sellerID}){
    const imageSrc = "https://assets.vogue.com/photos/6327939f06377e01c5304296/master/pass/Fc9-RcUXgAEgljY.jpeg"
    const sellerName = "Mary Jane"
    const joinDate = 2006;
    const gradDate = 2024;
    return(
        <div id="SellerInfo" style={styles.accountMainBox}>
            <div id="nameAndPhoto" style={styles.nameAndPhoto}>
                <img style={styles.accountPhoto} src={imageSrc}/>
                <text>{sellerName}</text>
            </div>
            <text>Joined {joinDate}</text>
            <text>Graduating in {gradDate}</text>
            <button style={{marginTop: 40}}>Message</button>
        </div>
    );
}
function messageSeller(){
    console.log("messaging seller or something.");
}

const styles = {
accountMainBox: {
    padding: "40px 0px 0px 0px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
},
nameAndPhoto: {
    marginBottom: 20,
    display: "flex",
    flexDirection: "row",
    gap: 10,
},
accountPhoto: {
    width: 45,
    height: 45,
    borderRadius: 100,
    verticalAlign: "middle",
},
};
import AccountTray from "./AccountTray";
export default function HeaderBox(){
    return(
        <div style={styles.headerBox}>
            <div id="linkSection" style={styles.linkSection}>
                <a href="/home">Home</a>
                <a href="/browse">Browse Listings</a>
                <a href="/create">Create Listing</a>
            </div>
            <div id="AccountSection" style={styles.account}>
                <AccountTray/>
            </div>
        </div>
        
    );
}
const styles = {
    linkSection: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: 30,
    },
    account: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "right",
    },
    headerBox: {
        display: "flex",
        justifyContent: "space-between",
        padding: "0px 20px 0px 0px",
        background: "rgba(0, 255, 255, 0.2)",
        borderBottom: "3px black solid",
        height: "50px",
    },
}
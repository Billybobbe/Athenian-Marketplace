import AccountTray from "./AccountTray";
export default function HeaderBox(){
    return(
        <div id="headerBox" style={styles.headerBox}>
            <AccountTray/>
        </div>
    );
}
const styles = {
    headerBox: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "right",
        padding: "0px 20px 0px 0px",
        background: "rgba(0, 255, 255, 0.2)",
        borderBottom: "3px black solid",
        height: "50px",
    },
}
export default function ListingTile({image, title, location, price}){
    return(
        <div id="listingTile" style={styles.listingTile}>
            <text style={styles.title}>{title}</text>
            <img style={styles.image} src={image}/>
            <text style={styles.price}>${price}</text>
            <text style={styles.locaion}>{location}</text>
        </div>
    );
}
const styles = {
    listingTile: {
        height: '300px',
        width: '230px',
        border: '3px solid black',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: '70%',
        width: '100%',
    },
    title: {
        fontSize: '20px',
    },
    price: {

    },
    locaion: {

    },
};
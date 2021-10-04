export default function Cards({ card:{ name, image } }) {
    return (
        <div style={{ backgroundColor: "white", width: "225px", height: "auto", margin: "0px 15px 25px 0px", borderRadius: "10px" }}>
            <img src={image} alt={`${name}`} style={{width: "200px", height: "300px", display: "block", marginLeft: "auto", marginRight: "auto" }} />
        </div>
    )
}
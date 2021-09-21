import { CardsImages } from './helpers/CardsImage'

export default function Cards({ card:{ name } }) {
    return (
        <div style={{ backgroundColor: "white", width: "225px", height: "auto", margin: "0px 15px 25px 0px", borderRadius: "10px" }}>
            <img src={CardsImages(name)} style={{width: "200px", height: "300px", display: "block", marginLeft: "auto", marginRight: "auto" }} />
        </div>
    )
}
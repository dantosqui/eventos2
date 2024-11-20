import { Link } from "react-router-dom"
import "./EventCard.css"


function EventCard ({redirectTo,title,subtitle,subsubtitle}) {
    return(
    <Link to={redirectTo}>
    <div className="card">
        <h2>{title}</h2>
        <p>{subtitle}</p>
        <p>{subsubtitle}</p>
    </div>
    </Link>)
}

export default EventCard
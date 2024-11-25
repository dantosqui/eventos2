import { Link } from "react-router-dom";
import "./EventCard.css";

function EventCard({ redirectTo, title, subtitle, subsubtitle }) {
  return (
    <Link to={redirectTo} className="card">
      
        <h2 className="card-title">{title}</h2>
        <p className="card-subtitle">{subtitle}</p>
        <p className="card-subsubtitle">${subsubtitle}</p>
      
    </Link>
  );
}

export default EventCard;

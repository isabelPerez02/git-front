import { Link } from "react-router-dom";
import "./Card.css";

export const Card = ({ id, name, synopsis, description, image, staffList }) => {
  return (
    <div className="card cl-sm-6 col-md-4 cl-lg-4 col-xl-3">
      <img src={image} className="card-img-top" alt="imagen no encontrada" />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>

        <Link className="btn btn-primary" to={`/movie/${id}`}>
          Ver
        </Link>
      </div>
    </div>
  );
};

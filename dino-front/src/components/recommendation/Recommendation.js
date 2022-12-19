import { Link } from "react-router-dom";
import "./Recommendation.css";
import { useNavigate } from 'react-router-dom';



export const Recommendation = ({ id, name, synopsis, backgroundURL }) => {
    const navigate = useNavigate();
    const handleClick = () => navigate(`/movie/${id}`);


    return (
    <div id="recomendaciones-container" className="recomendaciones-container">
      <h1 className="home-title">Recomendaciones </h1>

      <div
        className={["recomendacion "]}
        style={{ backgroundImage: `linear-gradient(to right, #0000009d, #54545400),url(${backgroundURL})` }}
        onClick={handleClick}
      >
        <div className="recomendacion-info">
          <h1>{name}</h1>
          <p> {synopsis} </p>
          <Link className="btn btn-primary" to={`/movie/${id}`}>
            Ver
          </Link>
        </div>
      </div>
    </div>
  );
};

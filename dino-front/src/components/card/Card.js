import { Link } from "react-router-dom";
import "./Card.css";
import { useNavigate } from 'react-router-dom';




export const Card = ({ id, name, synopsis, description, image, staffList,backgroundURL }) => {
  
  const navigate = useNavigate();
    const handleClick = () => navigate(`/movie/${id}`);


  return (
    <div className="card" onClick={handleClick}
    style={{ backgroundImage: `linear-gradient(to top, #0000009d, #54545400),url(${image})` }}>

     {/*  <img src={image} className="card-img-top" alt="imagen no encontrada" /> */}
      <div className="card-body">
        <div className="description">{synopsis}</div>
        <h5 className="card-title">{name}</h5>
        
        {/* <Link className="btn btn-primary" to={`/movie/${id}`}>
          Ver
        </Link> */}
      </div>
    </div>
  );
};

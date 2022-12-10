import { Link } from 'react-router-dom';
import avatar from '../../assets/img/card.png'
import "./Card.css"



export const  Card = ({id, name, synopsis, description, image, staffList}) => {
    const viewMovie = () => {
        console.log("El nombre de la pelicula es ", name);
    }
   
    return (
        <div className="card">
        <img src={image} alt="imagen no encontrada"/>
        <div className="container">
            <h4><b>{name}</b></h4> 
            {/*<button className='btn' onClick={viewMovie}>Ver</button> */}
            <Link className='btn' to={`/movie/${id}`}> Ver </Link>
        </div>
    </div>
    )
}
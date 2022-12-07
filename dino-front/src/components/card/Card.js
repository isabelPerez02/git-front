import avatar from '../../assets/img/card.png'
import "./Card.css"



export const  Card = ({name, synopsis, description, image, staffList}) => {
    const viewMovie = () => {
        console.log("El nombre de la pelicula es ", name);
    }
   
    return (
        <div className="card">
        <img src={image} alt="imagen no encontrada"/>
        <div className="container">
            <h4><b>{name}</b></h4> 
            <p>{synopsis}</p> 
            <p>{description}</p> 
            {staffList && staffList.length >0?(
                staffList.map((staff, idx) =>(
                    <p key = {idx}>{staff.name} {staff.lastName} ({staff.rol})</p>
                ))

            ): "No hay elenco definido"}
            <button className='btn' onClick={viewMovie}>Ver</button>
        </div>
    </div>
    )
}
import "./MoviesList.css";

import { Card } from "../card/Card";

export const MoviesList = ({movies,title}) => {

 
  

    return (

        <div id="movies-container">
              <h1 className="title">{title} </h1>


            <div className="cards-container">
            {movies.map((movie, idx) => (
            <Card
            
              key={idx}
              name={movie.name}
              synopsis={movie.synopsis}
              description={
                !movie.description ? "No hay descripción" : movie.description
              }
              staff={movie.staffList}
              image={
                !movie.imageLink
                  ? "https://picsum.photos/seed/picsum/200/300"
                  : movie.imageLink
              }
              id={movie.id}
            />
          ))}
            </div>
        </div>
    );
  };
  
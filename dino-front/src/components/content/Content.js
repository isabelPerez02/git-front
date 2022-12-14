import "./Content.css";
import { Card } from "../card/Card";
import { useEffect, useState } from "react";

export const Content = () => {

  const [movies, setMovies] = useState([])

  useEffect(()=>{
    console.log("Hola");
    getMovies();
   //getMoviesAsync();
  }, [])

  const getMovies=()=> {
    fetch("http://localhost:8080/api/movie")
    .then(response => response.json())
    .then(response =>{
      console.log(response);
      setMovies(response);
    })
  }

  //otra forma, PENDIENTE
  const getMoviesAsync = async() => {
    let response = await fetch("http://localhost:8080/api/movie");
    response = await response.json();
    setMovies(response);

  }

  return (
    <div className="row">
      {movies.map((movie, idx) => (
        <Card
          key={idx}
          name={movie.name}
          synopsis={movie.synopsis}
          description={!movie.description?"No hay descripción": movie.description}
          staff = {movie.staffList}
          image={
              !movie.imageLink
                ?"https://picsum.photos/seed/picsum/200/300"
                :movie.imageLink
          }
          id={movie.id}
        />
      ))}
    </div>
  );
};

const moviesx = [
  {
    name: "titanic",
    description: "Una pelicula de amor",
    image: "https://picsum.photos/seed/picsum/200/300",
  },
  {
    name: "terminator",
    description: "una pelicula de acción",
    image: "https://picsum.photos/seed/picsum/200/300",
  },
  {
    name: "Avatara",
    description: "Una pelicula de amor y acción",
    image: "https://picsum.photos/seed/picsum/200/300",
  },
  {
    name: "El silencio de los inocentes",
    description: "Una pelicula de crimen",
    image: "https://picsum.photos/seed/picsum/200/300",
  },
];

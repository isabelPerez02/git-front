import "./Content.css";
import { Card } from "../card/Card";
import { Recommendation } from '../recommendation/Recommendation'
import { useEffect, useState } from "react";
import { API_URL } from "../../util/Util";
import { HomeGenre } from "../home-genre/Home-genre";
import { MoviesList } from "../moviesList/MoviesList";
import { MyList } from '../myList/MyList';


export const Content = () => {
  const [movies, setMovies] = useState([]);
  const [movie,setMovie] = useState("");
  const [recBackground,setRecBackground] = useState("");

  useEffect(() => {
   
    getMovies();

  }, []);

  const getMovies = () => {
    fetch(API_URL + "movie")
      .then((response) => response.json())
      .then((response) => {
     
        setMovies(response);
        const recIndex = Math.floor(Math.random() * (response.length)); 
        setMovie(response[recIndex])
        setRecBackground(response[recIndex].imageLink)
      });
  };

  //otra forma, PENDIENTE
  const getMoviesAsync = async () => {
    let response = await fetch(API_URL + "movie");
    response = await response.json();
    setMovies(response);
  };


  return (
    <div className="row movies-container">

    <Recommendation id={movie.id} name={movie.name} synopsis={movie.synopsis} backgroundURL={recBackground} />

    <HomeGenre/>
    
    <MoviesList movies={movies} title={"Peliculas"} />


    <MyList/>
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

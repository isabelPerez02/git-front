import "./Home-genre.css";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../../util/Util";

export const HomeGenre = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    //console.log("Hola");
    getGenres();
    //getMoviesAsync();
  }, []);

  const getGenres = () => {
    fetch(API_URL + "category")
      .then((response) => response.json())
      .then((response) => {
        setGenres(response);
      });
  };
  //    const navigate = useNavigate();
  //    const handleClick = () => navigate(`/movie/${genreList.id}`);

  return (
    <div id="home-genre-cotainer">
      <h1 className="home-title">Categorias </h1>
      <div className="genres">
      {genres.map((genre, idx) => (
        //Temp
        <Link key={idx} className="btn btn-primary" to={genre.id}>
            {genre.name}
        </Link>
      )) }
     
      </div>
    </div>
  );
};

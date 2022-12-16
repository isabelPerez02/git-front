import { API_URL, getToken } from "../../util/Util";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Movie.css";
import Swal from "sweetalert2";

export const Movie = () => {
  const params = useParams();
  const [movieId, setMovieId] = useState("");
  const [movie, setMovie] = useState([]);
  const [score, setScore] = useState([]);
  const [scoreSelected, setScoreSelected] = useState("");
  const [scoreId, setScoreId] = useState("");

  useEffect(() => {
    setMovieId(params.id);
    getMovie();
    setScoreData();
    checkScore();
  }, []);

  const getMovie = async () => {
    let response = await fetch(API_URL + "movie/" + params.id);
    response = await response.json();
    setMovie(response);
  };

  const checkScore = async () => {
    const requestData = {
      method: "GET", //1:21:08
      headers: {
        "Content-type": "application/json",
        Authorization: getToken(),
      },
    };
    let response = await fetch(
      API_URL + "score/check/" + params.id,
      requestData
    );
    response = await response.json();
    //const response = { id: "638c118bd2e10e3954c66239", score: 9 };
    if (response.id != null && response.score != null) {
      setScoreSelected(response.score);
      setScoreId(response.id);
    }
  };

  const sendScoreApi = async (score) => {
    let method = "post";
    if (scoreSelected != "") {
      method = "put";
    }

    const scoreDTO = {
      score: score,
      movieId: movieId,
    };

    const requestData = {
      method,
      body: JSON.stringify(scoreDTO),
      headers: {
        "Content-type": "application/json",
        Authorization: getToken(),
      },
    };
    let response = await fetch(API_URL + "score/" + scoreId, requestData);
    response = await response.json();
    if (response.status == true) {
      Swal.fire({
        title: "¡Se actualizó!",
        text: response.message,
        icon: "success",
        confirmButtonText: "Reintentar",
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: response.message,
        icon: "warning",
        confirmButtonText: "Reintentar",
      });
    }
  };

  const setScoreData = () => {
    const scores = [];
    for (let index = 1; index <= 10; index++) {
      scores.push(index);
    }
    setScore(scores);
  };

  const sendScore = async (event) => {
    const { value } = event.target;
    await sendScoreApi(value);
    //console.log(`value`, value);
  };

  return (
    <div className="movie-container">
      <iframe
        id="myVideo"
        width="560"
        height="315"
        src={
          !movie.link ? "https://www.youtube.com/embed/4Lp-Vc4i2QI" : movie.link
        }
        title={movie.name}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      <div className="main-container">
        <div className="content">
          <h1>{movie.name}</h1>
          <p>{movie.synopsis}</p>
          <div className="staff-list">
            {movie.staffList && movie.staffList.length > 0
              ? movie.staffList.map((staff, idx) => (
                  <p key={idx}>
                    {staff.name} {staff.lastName} ({staff.rol})
                  </p>
                ))
              : "No hay elenco definido"}
          </div>

          <div className="category-list">
            {movie.categoryList && movie.categoryList.length > 0
              ? movie.categoryList.map((category, idx) => (
                  <p key={idx}>
                    {category.name} {category.lastName}
                  </p>
                ))
              : "No hay categorias definidas"}
          </div>
          <div className="rate">
            <p>Calificar pelicula</p>
            <select value={scoreSelected} onChange={sendScore}>
              <option>Sin calificar</option>
              {score.map((element, idx) => (
                <option key={idx}>{element}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

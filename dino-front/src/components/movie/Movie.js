import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Movie.css"

export const Movie = () => {
    const params = useParams();
    const [movieId, setMovieId] = useState('')
    const [movie, setMovie] = useState([])
    const [score, setScore] = useState([])

    useEffect(()=>{
        setMovieId(params.id)
        getMovie();
        setScoreData();
    }, [])
    
    const getMovie = async() => {
        let response = await fetch("http://localhost:8080/api/movie/"+params.id);
        response = await response.json();
        setMovie(response);
    };

    const sendScoreApi=async(score)=>{
        const scoreDTO = {
            score: score,
            clientId: '638414bf5054d55c317413f2',
            movieId: movieId
        }

        const requestData = {
            method:'POST',
            body: JSON.stringify(scoreDTO),
            headers:{
              "Content-type":"application/json"
            }
        }
        let response = await fetch("http://localhost:8080/api/score",requestData);
        response = await response.json();
        console.log(response);
    }

    const setScoreData=()=> {
        const scores = []
        for (let index = 1; index <= 10; index++) {
            scores.push(index);
        }
        setScore(scores);
    }

    const sendScore=async(event)=>{
        const {value} = event.target;
        await sendScoreApi(value);
        //console.log(`value`, value);
    }

  return (
    <div className="movie-container">
      <iframe
        id="myVideo"
        width="560"
        height="315"
        src={!movie.link?'https://www.youtube.com/embed/4Lp-Vc4i2QI':movie.link}
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
            {movie.staffList && movie.staffList.length >0
             ? movie.staffList.map((staff, idx) =>(
                    <p key = {idx}>
                        {staff.name} {staff.lastName} ({staff.rol})
                    </p>
                ))

            : "No hay elenco definido"} 
            </div>

            <div className="category-list">
            {movie.categoryList && movie.categoryList.length >0?
                movie.categoryList.map((category, idx) =>(
                    <p key = {idx}>{category.name} {category.lastName}</p>
                ))

            : "No hay categorias definidas"} 
            </div>
            <div className="rate">
                <p>Calificar pelicula</p>
                <select onChange={sendScore}>
                    <option defaultValue={'Sin calificar'} selected disabled>Sin calificar</option>
                    {score.map((element,idx)=>(
                        <option key={idx}>{element}</option>
                    ))}
                </select>
          </div>
        </div>
      </div>
    </div>
  );
};

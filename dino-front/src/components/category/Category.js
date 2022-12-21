
import './Category.css';
import { Route, Link, Routes, useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import { API_URL } from "../../util/Util";
import { useParams } from "react-router-dom";

import { MoviesList } from '../moviesList/MoviesList';

export const Category = () => {

  

  const params = useParams();

  const location = useLocation();


  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([])
  const [currentRoute, setCurrentRoute] = useState("");

 
  useEffect(() => {
    setCurrentRoute(decodeURI(location.pathname.split('/category/').pop())); 

 
    getMovies();
  
  }, [params.name,location.pathname]);


  
 const filterMovies = (response,search) =>{
    let filteredArray = [];

    for (let i = 0; i < response.length; i++) {

      let temp = response[i].categoryList


      if (temp != null) {
        for (let j = 0; j < temp.length; j++) {

         
          if (temp[j].name === search ) {
            filteredArray.push(response[i])
           
          }

        }
      }

    }
    setFilteredMovies(filteredArray)
  }

  const getMovies = async () => {
    await fetch(API_URL + "movie")
      .then((response) => response.json())
      .then((response) => {
        setMovies(response);    
        filterMovies(response,decodeURI(location.pathname.split('/category/').pop()));
      })
  };





  


  return (
    <div id="category-container" className="container">
      
        <MoviesList  movies={filteredMovies} title={currentRoute} />
    
   
    </div>


  )
}


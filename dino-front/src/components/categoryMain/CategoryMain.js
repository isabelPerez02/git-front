import './CategoryMain.css';
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

import { CategoryAll } from '../categoryAll/CategoryAll';

import { HomeGenre } from '../home-genre/Home-genre'
import { API_URL } from "../../util/Util";
import { MoviesList } from '../moviesList/MoviesList';

export const CategoryMain = () => {
    const [movies, setMovies] = useState([]);
    const [categories, setCategories] = useState([]);


    useEffect(() => {
        getMovies();
        getCategories()
  
        
    }, []);



    const getMovies =   () => {
          fetch(API_URL + "movie")
            .then((response) => response.json())
            .then((response) => {
                setMovies(response);
            
            })
    };


    const getCategories =  () => {

           fetch(API_URL + "category")
            .then((response) => response.json())
            .then((response) => {
                setCategories(response);
               
            })

    };




    return (
        <div id="category-main-container" className="container" >

            <HomeGenre />

            <CategoryAll movies={movies} categories={categories} />

        </div>
    )

}


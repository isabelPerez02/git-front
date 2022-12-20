
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

import { HomeGenre } from '../home-genre/Home-genre'
import { API_URL } from "../../util/Util";
import { MoviesList } from '../moviesList/MoviesList';

export const CategoryAll = (movies, categories) => {
    const [filteredMovies, setFilteredMovies] = useState([])



    useEffect(() => {

        filterMovies(movies.movies, movies.categories);
        
    }, [movies, categories]);




    function filterMovies(moviesArray, genresArray) {

        let returnArr = []

        if (genresArray && moviesArray) {
            for (let k = 0; k < genresArray.length; k++) {
                let search = genresArray[k].name

                let filteredArray = [];


                for (let i = 0; i < moviesArray.length; i++) {

                    let temp = moviesArray[i].categoryList


                    if (temp != null) {
                        for (let j = 0; j < temp.length; j++) {


                            if (temp[j].name === search) {
                                filteredArray.push(moviesArray[i])

                            }

                        }
                    }

                }
                returnArr.push({
                    name: search,
                    arr: filteredArray
                });

            }

        }


        setFilteredMovies(returnArr)

    }


    return (
        <div  >



            {filteredMovies.map((category, idx) => (

                <MoviesList key={idx} movies={category.arr} title={category.name} />
            ))}
        </div>
    )

}


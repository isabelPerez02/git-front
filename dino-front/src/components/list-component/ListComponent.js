
import { useEffect, useState } from "react";

import { MoviesList } from '../moviesList/MoviesList';

export const ListComponent = (movies) => {
    const [filteredMovies, setFilteredMovies] = useState([])


    let authData = JSON.parse(localStorage.getItem("authData"))
 



    useEffect(() => {

        filterMovies(movies.movies,authData.id);
        
    }, [movies]);




    function filterMovies(moviesArray,uID) {


       let returnArr = []


        if(moviesArray!=null){

       for (let i = 0; i < moviesArray.length; i++) {
        if (moviesArray[i].client.id===uID) {
         if(moviesArray[i].movies!=null){
          returnArr.push( moviesArray[i].movies[0]);
         }
        }
      
     }
        }
       
        
        setFilteredMovies(returnArr)

    }


    return (
        <div  >



 
                 <MoviesList movies={filteredMovies} title={"Mi Lista"} />
              
        
        </div>
    )

}


import { useParams } from "react-router";
import React, { useEffect, useState, useCallback } from "react";


function Detail() {
    const { id } = useParams(); // Changed this line
    console.log(id); // This will now log the actual ID string
    const [movie, setMovie] = useState([]);
    
    const getMovices = useCallback(async() => {
        const json = await(
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        ).json();

        console.log(json);
        setMovie(json.data.movie);
    
    }, [id]);
    useEffect(() => {
        getMovices();
    }, [getMovices]);
   
  return <div>
    <h1>Detail</h1>
    <h1>{movie.title}</h1>
    <img src={movie.medium_cover_image} alt={movie.title} />
    <p>{movie.year}</p>
    <p>{movie.description_intro}</p>
    
    
    </div>;
}

export default Detail;


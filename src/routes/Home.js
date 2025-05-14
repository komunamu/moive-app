import React from 'react';
import {useState} from'react';
import {useEffect} from'react';
import Movie from '../components/Movie';
import PropTypes from 'prop-types';

function Home() {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const getMovices = async() => {
    const response = await fetch('https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year');
    const json = await response.json();
    setMovies(json.data.movies);
    console.log(json.data.movies);
    setLoading(false);
    
  }
  Movie.propTypes = {
    id: PropTypes.number.isRequired,
    coverImg: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired
  }

  useEffect(() => {
    getMovices();
  }, []);
  return (
    <div>
      {loading ? <h1>Loading...</h1> : 
        <div>{movies.map(movie =>
            <Movie
              key={movie.id}
              id ={movie.id}
              coverImg = {movie.medium_cover_image}
              title={movie.title}
              year={movie.year}
              genres={movie.genres}
            />
            )}
          </div>
      }

    </div>
  );
  
}
  

export default Home;


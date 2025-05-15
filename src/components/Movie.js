// import { Link } from "react-router-dom"; // 이전 제안
import { Link } from "react-router"; // App.js와 일치시키려면

function Movie({id, coverImg, title, year, genres}) {
  return (<div>
    <h1><Link to={`/movie/${id}`}>{title}</Link></h1>
    <img src={coverImg} alt={title} />
    <p>{year}</p>
    <ul>
      {genres.map(genre =>
        <li key={genre}>{genre}</li>
      )}
    </ul>
    </div>);
}

export default Movie;


import { Link } from "react-router";

function Movie({coverImg, title, year, summary, genres}) {
  return (<div>
    <h1><Link to="/movie">{title}</Link></h1>
    <img src={coverImg} alt={title} />
    <p>{year}</p>
    <p>{summary}</p>
    <ul>
      {genres.map(genre =>
        <li key={genre}>{genre}</li>
      )}
    </ul>
    </div>);
}

export default Movie;


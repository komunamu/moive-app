import React, { useState, useEffect } from 'react'; // React import 방식 통일
import Movie from '../components/Movie';
import PropTypes from 'prop-types';
import "./Home.css"; // Home.css 임포트

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const getMovies = async () => { // 함수 이름 getMovies로 변경 (일관성)
    try {
      const response = await fetch('https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year&limit=20'); // minimum_rating, limit 조정 가능
      const json = await response.json();
      setMovies(json.data.movies);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
      // 사용자에게 에러 메시지를 보여주는 로직 추가 가능
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  // Movie.propTypes는 Movie 컴포넌트 파일 내부로 옮기는 것이 더 일반적입니다.
  // 여기서는 일단 유지합니다.
  Movie.propTypes = {
    id: PropTypes.number.isRequired,
    coverImg: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    summary: PropTypes.string.isRequired, // summary prop 추가 (Movie 컴포넌트가 사용한다면)
    genres: PropTypes.arrayOf(PropTypes.string).isRequired
  };

  return (
    <div className="home-container">
      <h1 className="page-title">Recommend Movie List</h1>
      {loading ? (
        <div className="loading-message">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map(movie => (
            <Movie
              key={movie.id}
              id={movie.id}
              coverImg={movie.medium_cover_image}
              title={movie.title_long} // 긴 제목 사용 고려
              year={movie.year}
              summary={movie.summary} // summary 전달
              genres={movie.genres}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;


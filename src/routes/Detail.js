import { useParams } from "react-router";
import React, { useEffect, useState, useCallback } from "react";
import "./Detail.css"; // Detail.css 임포트

function Detail() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null); // null로 초기화 권장
    const [loading, setLoading] = useState(true); // 로딩 상태 추가 권장

    const getMovieDetail = useCallback(async () => { // 함수 이름 변경 (일관성 및 명확성)
        if (!id) {
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            const response = await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`);
            if (!response.ok) throw new Error("Network response was not ok");
            const json = await response.json();
            setMovie(json.data.movie);
        } catch (error) {
            console.error("Failed to fetch movie details:", error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        getMovieDetail();
    }, [getMovieDetail]);
   
    if (loading) {
        return <div className="loading-message-detail">Loading movie details...</div>;
    }

    if (!movie) {
        return <div className="loading-message-detail">Movie details not found.</div>;
    }

    return (
        <div className="detail-container">
            <img className="detail-cover-img" src={movie.medium_cover_image} alt={movie.title} />
            <div className="detail-info">
                <h1>{movie.title_long || movie.title}</h1>
                <p className="year">Year: {movie.year}</p>
                <div className="rating-runtime">
                    <span>rating: ⭐ {movie.rating} / 10</span>
                    <span>Runtime: ⌛ {movie.runtime} minutes</span>
                </div>
                
                {movie.genres && movie.genres.length > 0 && (
                    <>
                        <h3 className="summary-title">Genres</h3>
                        <ul className="genres-list">
                            {movie.genres.map(genre => (
                                <li key={genre}>{genre}</li>
                            ))}
                        </ul>
                    </>
                )}

                <h3 className="summary-title">Story</h3>
                {/* API 응답에 description_full 또는 description_intro가 줄거리를 포함합니다. */}
                <p className="summary-text">{movie.description_full || movie.description_intro || "Sorry, No story information."}</p>
            </div>
        </div>
    );
}

export default Detail;


import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchAsyncDetails,
  getDetails,
  removeSelectedMovie,
} from "../../features/movies/movieSlice";
import "./MovieDetail.scss";

const MovieDetail = () => {
  const { imdbID } = useParams();
  const dispatch = useDispatch();
  // const selectedMovie = useSelector(getDetails);
  const selectedMovie = useSelector((state) => state.movies.selectedMovie);

  useEffect(() => {
    dispatch(fetchAsyncDetails(imdbID));

    return () => {
      dispatch(removeSelectedMovie());
    };
  }, [dispatch, imdbID]);

  console.log(selectedMovie, "details");

  return (
    <div className="movie-section">
      <div className="section-left">
        <div className="movie-title">{selectedMovie.Title}</div>
        <div className="movie-rating">
          <span>
            IMDB Rating: <i className="fa fa-star"></i>
            {selectedMovie.imdbRating}
          </span>
          <span>
            Votes: <i className="fa fa-thubs-up"></i> {selectedMovie.imdbVotes}
          </span>
          <span>
            Runtime: <i className="fa fa-film"></i> {selectedMovie.Runtime}
          </span>
          <span>
            Year: <i className="fa fa-calender"></i> {selectedMovie.Year}
          </span>
        </div>
        <div className="movie-plot">{selectedMovie.Plot}</div>
        <div className="movie-info">
          <div>
            <span>Director</span>
            <span>{selectedMovie.Director}</span>
          </div>
          <div>
            <span>Actors</span>
            <span>{selectedMovie.Actors}</span>
          </div>
          <div>
            <span>Generes</span>
            <span>{selectedMovie.Genre}</span>
          </div>
          <div>
            <span>Language</span>
            <span>{selectedMovie.Language}</span>
          </div>
          <div>
            <span>Awards</span>
            <span>{selectedMovie.Awards}</span>
          </div>
        </div>
      </div>

      <div className="section-right">
        <img src={selectedMovie.Poster} alt={selectedMovie.Title} />
      </div>
    </div>
  );
};

export default MovieDetail;

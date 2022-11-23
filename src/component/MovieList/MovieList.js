import React from "react";
import { useSelector } from "react-redux";
import { getAllMovies, getAllSeries } from "../../features/movies/movieSlice";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieList.scss";
import Slider from "react-slick";

const MovieList = () => {
  const movies = useSelector(getAllMovies);
  const series = useSelector(getAllSeries);
  const store = useSelector((state) => state.movies);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  let renderMovies = "";
  let renderSeries = "";
  renderMovies =
    movies.Response === "True" ? (
      movies.Search.map((movie, index) => (
        <MovieCard key={index} data={movie} />
      ))
    ) : (
      <div className="movies-error">
        <h3>{movies.error}</h3>
      </div>
    );

  renderSeries = store.isShowLoading ? (
    <div className="loading">Loading...</div>
  ) : series?.Response === "True" ? (
    series?.Search?.map((show, index) => <MovieCard key={index} data={show} />)
  ) : (
    <div className="movies-error">
      <h3>{series?.error}</h3>
    </div>
  );

  return (
    <div className="movie-wrapper">
      <div className="movies-list">
        <h2>Movies</h2>
        <div className="movie-container">
          <Slider {...settings}>{renderMovies}</Slider>
        </div>
      </div>
      <div className="series-list">
        <h2>Series</h2>
        <div className="movie-container">
          <Slider {...settings}>{renderSeries}</Slider>
        </div>
      </div>
    </div>
  );
};

export default MovieList;

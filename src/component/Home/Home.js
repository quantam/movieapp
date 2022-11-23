import React, { useEffect } from "react";
import MovieList from "../MovieList/MovieList";
import { useDispatch } from "react-redux";
import {
  fetchAsyncMovies,
  fetchAsyncSeries,
} from "../../features/movies/movieSlice";

const Home = () => {
  const dispatch = useDispatch();
  const movie = "Lord";
  const show = "Game";
  useEffect(() => {
    dispatch(fetchAsyncMovies(movie));
    dispatch(fetchAsyncSeries(show));
  }, [dispatch]);

  return (
    <div>
      <div className="banner-img">
        <MovieList />
      </div>
    </div>
  );
};

export default Home;

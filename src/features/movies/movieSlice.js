import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIKEY } from "../../apis/MovieApiKey";
import movieApi from "../../apis/movieApi";

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async (term) => {
    const response = await movieApi
      .get(`?apiKey=${APIKEY}&s=${term}&type=movie`)
      .catch((err) => {
        console.log(err);
      });
    return response.data;
  }
);

export const fetchAsyncSeries = createAsyncThunk(
  "movies/fetchAsyncSeries",
  async (term) => {
    const response = await movieApi
      .get(`?apiKey=${APIKEY}&s=${term}&type=series`)
      .catch((err) => {
        console.log(err);
      });
    return response.data;
  }
);

export const fetchAsyncDetails = createAsyncThunk(
  "movies/fetchAsyncDetails",
  async (id) => {
    const response = await movieApi
      .get(`?apiKey=${APIKEY}&i=${id}&Plot=full`)
      .catch((err) => {
        console.log(err);
      });
    return response.data;
  }
);

const initialState = {
  movies: [],
  selectedMovie: {},
  isLoading: false,
  isShowLoading: false,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeSelectedMovie: (state) => {
      state.selectedMovie = {};
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAsyncMovies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAsyncMovies.fulfilled, (state, { payload }) => {
        // console.log("Fetched", payload);
        state.isLoading = false;
        state.movies = payload;
      })
      .addCase(fetchAsyncMovies.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAsyncSeries.pending, (state) => {
        state.isShowLoading = true;
      })
      .addCase(fetchAsyncSeries.fulfilled, (state, { payload }) => {
        // console.log("Fetched", payload);
        state.isShowLoading = false;
        state.series = payload;
        //return { ...state, series: payload };
      })
      .addCase(fetchAsyncDetails.fulfilled, (state, { payload }) => {
        // console.log(payload, "payload");
        // state.selectedMovie = payload;
        return { ...state, selectedMovie: payload };
      });
  },
});

export const { removeSelectedMovie } = movieSlice.actions;

export const getAllMovies = (state) => state.movies.movies;
export const getAllSeries = (state) => state.movies.series;
export const getDetails = (state) => state.selectedMovie;

export default movieSlice.reducer;

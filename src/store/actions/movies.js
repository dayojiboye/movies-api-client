import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchMoviesStart = () => {
  return {
    type: actionTypes.FETCH_MOVIES_START,
  };
};

export const fetchMoviesSuccess = (movies) => {
  return {
    type: actionTypes.FETCH_MOVIES_SUCCESS,
    movies: movies,
  };
};

export const fetchMoviesFail = () => {
  return {
    type: actionTypes.FETCH_MOVIES_FAIL,
  };
};

export const fetchMovies = (genre) => {
  let url =
    'https://dummy-movies-api.netlify.app/.netlify/functions/app/movies/';
  if (genre) {
    url += genre;
  }
  return (dispatch) => {
    dispatch(fetchMoviesStart());
    axios
      .get(url)
      .then((response) => {
        dispatch(fetchMoviesSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchMoviesFail());
        console.log(error.response.data);
      });
  };
};

// add a new movie to the data base

export const addMovieStart = () => {
  return {
    type: actionTypes.ADD_MOVIE_START,
  };
};

export const addMovieSuccess = () => {
  return {
    type: actionTypes.ADD_MOVIE,
  };
};

export const addMovieInit = () => {
  return {
    type: actionTypes.ADD_MOVIE_INIT,
  };
};

export const addMovie = (movie) => {
  return (dispatch) => {
    dispatch(addMovieStart());
    axios
      .post(
        'https://dummy-movies-api.netlify.app/.netlify/functions/app/movies/',
        movie
      )
      .then((response) => {
        dispatch(addMovieSuccess());
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
};

// delete a movie from the data base

export const deleteMovieInit = () => {
  return {
    type: actionTypes.DELETE_MOVIE_INIT,
  };
};

export const deleteMovieSuccess = () => {
  return {
    type: actionTypes.DELETE_MOVIE,
  };
};

export const deleteMovie = (movie) => {
  return (dispatch) => {
    axios
      .delete(
        'https://dummy-movies-api.netlify.app/.netlify/functions/app/movies/' +
          movie
      )
      .then((response) => {
        dispatch(deleteMovieSuccess());
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
};

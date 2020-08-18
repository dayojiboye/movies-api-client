import * as actionTypes from '../actions/actionTypes';

const initialState = {
  movies: [],
  added: false,
  loading: false,
  error: false,
  deleted: false,
};

const reducer = (state = initialState, action) => {
  if (action.type === actionTypes.FETCH_MOVIES_SUCCESS) {
    let movies = Object.values(action.movies).reduce((prev, cur) => {
      return prev.concat(cur);
    }, []);

    // Remove duplicates
    movies = Array.from(
      new Set(
        movies.map((movie) => {
          return movie.name; // returns an array with unique names
        })
      )
    ).map((name) => {
      // loops thru the array with the unique names
      return movies.find((movie) => {
        return movie.name === name; // returns the actual object's address from the original object array
      });
    });

    return {
      ...state,
      loading: false,
      movies: movies,
      error: false,
    };
  }
  if (action.type === actionTypes.FETCH_MOVIES_START) {
    return {
      ...state,
      loading: true,
    };
  }
  if (action.type === actionTypes.FETCH_MOVIES_FAIL) {
    return {
      ...state,
      loading: false,
      error: true,
    };
  }
  if (action.type === actionTypes.ADD_MOVIE) {
    return {
      ...state,
      loading: false,
      added: true,
    };
  }
  if (action.type === actionTypes.ADD_MOVIE_INIT) {
    return {
      ...state,
      added: false,
    };
  }
  if (action.type === actionTypes.ADD_MOVIE_START) {
    return {
      ...state,
      loading: true,
    };
  }
  if (action.type === actionTypes.DELETE_MOVIE) {
    return {
      ...state,
      deleted: true,
    };
  }
  if (action.type === actionTypes.DELETE_MOVIE_INIT) {
    return {
      ...state,
      deleted: false,
    };
  }
  return state;
};

export default reducer;

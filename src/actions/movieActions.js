import axios from 'axios';

export const GET_MOVIES = '@movie/get-movies';
export const ADD_MOVIE = '@movie/add-movie';
export const ADD_MOVIE_SUCCESS = '@movie/add-movie-success';
export const ADD_MOVIE_FAILURE = '@movie/add-movie-failure';

export function getMovies() {
  const request = axios.get(process.env.REACT_APP_API_URL);

  return dispatch => {
    request.then(response => {
      return dispatch({
        type: GET_MOVIES,
        payload: response.data
      });
    });
  };
}

export function addMovie(movie) {
  const request = axios.post(process.env.REACT_APP_API_URL, movie);

  return dispatch => {
    dispatch({
      type: ADD_MOVIE
    });

    request
      .then(response => {
        return dispatch({
          type: ADD_MOVIE_SUCCESS,
          payload: {
            ...response.data
          }
        });
      })
      .catch(err => {
        return dispatch({
          type: ADD_MOVIE_FAILURE,
          payload: err.response.statusText
        });
      });
  };
}

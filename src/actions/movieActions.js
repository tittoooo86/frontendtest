import axios from 'axios';

export const GET_MOVIES = '@movie/get-movies';
export const ADD_MOVIE = '@movie/add-movie';
export const ADD_MOVIE_SUCCESS = '@movie/add-movie-success';
export const ADD_MOVIE_FAILURE = '@movie/add-movie-failure';

export function getMovies() {
  const request = axios.get(
    'https://5f48ccf78e271c001650c261.mockapi.io/filmek'
  );

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
  const request = axios.post(
    'https://5f48ccf78e271c001650c261.mockapi.io/filmek',
    movie
  );

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
          payload: {
            err
          }
        });
      });
  };
}

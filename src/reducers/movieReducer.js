/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  GET_MOVIES,
  ADD_MOVIE,
  ADD_MOVIE_SUCCESS
} from 'src/actions/movieActions';

const initialState = {
  movies: [],
  loading: false,
  success: false
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIES: {
      const movies = action.payload;

      return produce(state, draft => {
        draft.movies = movies;
      });
    }

    case ADD_MOVIE: {
      return produce(state, draft => {
        draft.loading = true;
        draft.success = false;
      });
    }

    case ADD_MOVIE_SUCCESS: {
      const movie = action.payload;

      return produce(state, draft => {
        draft.movies = [...state.movies, movie];
        draft.loading = false;
        draft.success = true;
      });
    }

    default: {
      return state;
    }
  }
};

export default movieReducer;

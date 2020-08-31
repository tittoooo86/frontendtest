/* eslint-disable no-param-reassign */
import produce from 'immer';
import { GET_MOVIES, ADD_MOVIE } from 'src/actions/movieActions';

const initialState = {
  movies: []
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
      return state;
    }

    default: {
      return state;
    }
  }
};

export default movieReducer;

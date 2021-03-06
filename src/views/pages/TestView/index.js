import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Container,
  Paper,
  TextField,
  makeStyles
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FilterIcon from '@material-ui/icons/FilterList';
import Autocomplete, {
  createFilterOptions
} from '@material-ui/lab/Autocomplete';
import { useSnackbar } from 'notistack';

import { getMovies, addMovie } from 'src/actions/movieActions';

import Page from 'src/components/Page';
import ListModal from './ListModal/ListModal';
import AddModal from './AddModal';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  wrapper: {
    padding: theme.spacing(3)
  },
  inner: {
    display: 'inline-block',
    position: 'relative'
  },
  filter: {
    position: 'absolute',
    right: 9,
    top: 4,
    zIndex: 10
  }
}));

const filter = createFilterOptions();

function TestView() {
  const dispatch = useDispatch();
  const { movies, success, error } = useSelector(state => state.movies);
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [value, setValue] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openList, setOpenList] = useState(false);

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  const showToast = () => {
    enqueueSnackbar(error || 'Film hozzáadva', {
      variant: error ? 'error' : 'success'
    });
  };

  useEffect(() => {
    if (success !== null) {
      showToast();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  return (
    <>
      <Page className={classes.root} title="Titus's test">
        <Container maxWidth="lg">
          <Box mt={3}>
            <Paper elevation={3}>
              <Box className={classes.wrapper}>
                <div className={classes.inner}>
                  <IconButton
                    aria-label="a filmlista megnyitása"
                    onClick={() => setOpenList(true)}
                    className={classes.filter}
                    style={{ right: value ? 30 : 9 }}
                  >
                    <FilterIcon />
                  </IconButton>
                  <Autocomplete
                    value={value}
                    onChange={(event, newValue) => {
                      if (typeof newValue === 'string') {
                        setValue({
                          name: newValue
                        });
                      } else if (newValue && newValue.inputValue) {
                        setOpenModal(true);
                        setValue({
                          name: newValue.inputValue
                        });
                      } else {
                        setValue(newValue);
                      }
                    }}
                    filterOptions={(options, params) => {
                      const filtered = filter(options, params);

                      if (params.inputValue !== '') {
                        filtered.push({
                          inputValue: params.inputValue,
                          name: `Hozzáadás "${params.inputValue}"`
                        });
                      }

                      return filtered;
                    }}
                    selectOnFocus
                    id="add-movie"
                    options={movies}
                    getOptionLabel={option => {
                      if (typeof option === 'string') {
                        return option;
                      }
                      if (option.inputValue) {
                        return option.inputValue;
                      }
                      return option.name;
                    }}
                    renderOption={option => option.name}
                    style={{ width: 300 }}
                    freeSolo
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Film kiválasztása"
                        variant="outlined"
                      />
                    )}
                  />
                </div>
              </Box>
            </Paper>
          </Box>
        </Container>
      </Page>
      <ListModal
        movies={movies}
        open={openList}
        onClose={() => setOpenList(false)}
        onCreate={() => setOpenModal(true)}
        onSelect={movie => {
          setValue(movie);
          setOpenList(false);
        }}
      />
      <AddModal
        initialValue={value}
        open={openModal}
        onClose={() => setOpenModal(false)}
        onAdd={movie => {
          dispatch(addMovie(movie));
          setValue(movie);
          setOpenModal(false);
          setOpenList(false);
        }}
        openList={() => setOpenList(true)}
      />
    </>
  );
}

export default TestView;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Container,
  Paper,
  TextField,
  makeStyles
} from '@material-ui/core';
import Autocomplete, {
  createFilterOptions
} from '@material-ui/lab/Autocomplete';

import Page from 'src/components/Page';
import { getMovies } from 'src/actions/movieActions';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  wrapper: {
    padding: theme.spacing(3)
  }
}));

const filter = createFilterOptions();

function TestView() {
  const dispatch = useDispatch();
  const { movies } = useSelector(state => state.movies);

  const classes = useStyles();
  const [value, setValue] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openList, setOpenList] = useState(false);

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  return (
    <Page className={classes.root} title="Titus's test">
      <Container maxWidth="lg">
        <Box mt={3}>
          <Paper elevation={3}>
            <Box className={classes.wrapper}>
              <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                  if (typeof newValue === 'string') {
                    setValue({
                      title: newValue
                    });
                  } else if (newValue && newValue.inputValue) {
                    setValue({
                      title: newValue.inputValue
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
                      title: `Hozzáadás "${params.inputValue}"`
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
            </Box>
          </Paper>
        </Box>
      </Container>
    </Page>
  );
}

export default TestView;

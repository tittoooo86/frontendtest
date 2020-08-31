import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Box, Dialog, Grid, TextField, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { v4 as uuidv4 } from 'uuid';

import DialogTitle from './DialogTitle';
import ColorButton from './ColorButton';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  button: {
    marginRight: theme.spacing(1)
  },
  buttonRight: {
    marginLeft: theme.spacing(1)
  }
}));

function AddModal({
  initialValue,
  onAdd,
  open,
  onClose,
  openList,
  className,
  ...rest
}) {
  const [value, setValue] = useState();
  const classes = useStyles();

  useEffect(() => {
    if (initialValue) {
      setValue(initialValue.name);
    }
  }, [initialValue]);

  const handleChange = event => {
    event.persist();
    setValue(event.target.value);
  };

  const addMovie = () => {
    const movie = {
      id: uuidv4(),
      createdAt: new Date(),
      name: value,
      year: 98734
    };

    onAdd(movie);
    setValue();
  };

  return (
    <Dialog maxWidth="md" fullWidth onClose={onClose} open={open}>
      <DialogTitle id="add-title" onClose={onClose}>
        Új film hozzáadása
      </DialogTitle>
      <div className={clsx(classes.root, className)} {...rest}>
        <TextField
          autoFocus
          fullWidth
          label="Cím"
          multiline
          onChange={handleChange}
          placeholder="Add meg a film címét"
          value={value}
          variant="outlined"
        />

        <Box mt={3}>
          <Grid
            container
            spacing={3}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <ColorButton
              onClick={() => {
                addMovie();
              }}
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              className={classes.button}
            >
              Új film létrehozása és kiválsztása
            </ColorButton>

            <ColorButton
              onClick={() => {
                addMovie();
                openList();
              }}
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              className={classes.buttonRight}
            >
              Új film létrehozása
            </ColorButton>
          </Grid>
        </Box>
      </div>
    </Dialog>
  );
}

AddModal.propTypes = {
  initialValue: PropTypes.object,
  className: PropTypes.string,
  onAdd: PropTypes.func,
  onClose: PropTypes.func,
  openList: PropTypes.func,
  open: PropTypes.bool.isRequired
};

AddModal.defaultProps = {
  onAdd: () => {},
  onClose: () => {},
  openList: () => {}
};

export default AddModal;

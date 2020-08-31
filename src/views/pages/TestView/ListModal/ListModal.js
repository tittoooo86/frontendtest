import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Box, Dialog, Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Radio from '@material-ui/core/Radio';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';

import ColorButton from '../ColorButton';
import DialogTitle from '../DialogTitle';
import EnhancedTableHead from './EnhancedTableHead';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  table: {
    minWidth: 750
  }
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function ListModal({
  movies,
  onCreate,
  onSelect,
  open,
  onClose,
  className,
  ...rest
}) {
  const classes = useStyles();
  const [value, setValue] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    setFiltered(movies);
  }, [movies]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, name) => {
    const movie = filtered.filter(movie => movie.name === name);
    onClose();
    onSelect(movie[0]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChange = event => {
    event.persist();
    setValue(event.target.value);

    const items = movies.filter(m =>
      m.name.toLowerCase().includes(event.target.value.toLowerCase())
    );

    setFiltered(items);

    if (event.target.value === '') {
      setFiltered(movies);
    }
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, filtered.length - page * rowsPerPage);

  return (
    <Dialog maxWidth="lg" fullWidth onClose={onClose} open={open}>
      <DialogTitle id="customized-dialog-title" onClose={onClose}>
        Film kiválasztása
      </DialogTitle>
      <div className={clsx(classes.root, className)} {...rest}>
        <Box mt={3} display="flex" justifyContent="space-between">
          <TextField
            multiline
            onChange={handleChange}
            placeholder="Keresés"
            value={value}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />

          <ColorButton
            onClick={onCreate}
            variant="contained"
            startIcon={<AddIcon />}
          >
            Új film létrehozása
          </ColorButton>
        </Box>

        <Box mt={3}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <EnhancedTableHead
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {stableSort(filtered, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow
                        key={row.id}
                        onClick={event => handleClick(event, row.name)}
                        role="radio"
                        tabIndex={-1}
                        hover
                      >
                        <TableCell padding="checkbox">
                          <Radio inputProps={{ 'aria-labelledby': labelId }} />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.year}</TableCell>
                        <TableCell align="right">{row.createdAt}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filtered.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Box>
      </div>
    </Dialog>
  );
}

ListModal.propTypes = {
  movies: PropTypes.array,
  className: PropTypes.string,
  onCreate: PropTypes.func,
  onClose: PropTypes.func,
  onSelect: PropTypes.func,
  open: PropTypes.bool.isRequired
};

ListModal.defaultProps = {
  onClose: () => {},
  onCreate: () => {},
  onSelect: () => {}
};

export default ListModal;

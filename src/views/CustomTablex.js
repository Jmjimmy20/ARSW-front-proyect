import { Checkbox, lighten, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Toolbar, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React, { Component } from 'react';

class CustomTablex extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      numSelected: 0,
      rowCount: this.props.rows.length,
      orderBy: '',
      order: 'asc',
      selected: []
    }
  }
  
  descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  getComparator(order, orderBy) {
    return order === 'desc'
    ? (a, b) => this.descendingComparator(a, b, orderBy)
    : (a, b) => -this.descendingComparator(a, b, orderBy);
  }
  
  stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  
  handleRequestSort = (event, property) => {
    const isAsc = this.state.orderBy === property && this.state.order === 'asc';
    this.setState({
      order: isAsc ? 'desc': 'asc',
      orderBy: property
    });
  };
  
  createSortHandler = (property) => (event) => {
    this.handleRequestSort(event, property);
  };
  
  handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = this.props.rows.map((n) => n.name);
      this.setState({
        selected: newSelecteds,
        numSelected: newSelecteds.length
      });
      return;
    }
    this.setState({
      selected: [],
      numSelected: 0
    })
  };

  handleClick = (event, name) => {
    const selectedIndex = this.state.selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(this.state.selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(this.state.selected.slice(1));
    } else if (selectedIndex === this.state.selected.length - 1) {
      newSelected = newSelected.concat(this.state.selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        this.state.selected.slice(0, selectedIndex),
        this.state.selected.slice(selectedIndex + 1),
      );
    } 
    this.setState({
      selected: newSelected,
      numSelected: newSelected.length
    });
  };

  isSelected = (name) => this.state.selected.indexOf(name) !== -1;
  
  render() {
    return (
      <div>
        <TableToolbar numSelected={this.state.selected.length} title={this.props.title} />
        <TableContainer>
          <Table
          aria-labelledby="tableTitle"
          aria-label="enhanced table"
          >
          <TableHead>
            <TableRow>
              {this.props.headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={'center'}
                  sortDirection={this.state.orderBy === headCell.id ? this.state.order : false}
                >
                  <TableSortLabel
                    active={this.state.orderBy === headCell.id}
                    direction={this.state.orderBy === headCell.id ? this.state.order : 'asc'}
                    onClick={this.createSortHandler(headCell.id)}
                  >
                    {headCell.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.stableSort(this.props.rows, this.getComparator(this.state.order, this.state.orderBy))
                .map((row, index) => {
                  const isItemSelected = this.isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => this.handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      {this.props.headCells.map((col, i) => {
                        if (i === 0) {
                          return (
                            <TableCell component="th" id={labelId} key={i} scope="row" align="center">
                              {row[col.id]}
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell align="center" key={i}>{row[col.id]}</TableCell>
                          );
                        }
                      })}
                    </TableRow>
                    );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

const TableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, title } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            {title}
          </Typography>
        )}
    </Toolbar>
  );
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
}));

export default CustomTablex;
            
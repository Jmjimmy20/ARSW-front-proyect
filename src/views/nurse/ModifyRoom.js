import React, { Component } from 'react';
import { Grid, Typography, TextField, Button } from '@material-ui/core';

class ModifyRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomNumber: '',
      bedNumber: ''
    }
  }

  roomChange = (event) => {
    this.setState({
      roomNumber: event.target.value
    });
  }

  bedChange = (event) => {
    this.setState({
      bedNumber: event.target.value
    });
  }

  modify = (event) => {
    event.preventDefault();
  }
  
  render() {
    return (
      <div>
        <Grid container>
          <Grid item xs={12} >

            <Typography variant={"subtitle1"} >
              Especificar el número de Cuarto y cama
            </Typography>

            <TextField fullWidth
              value={this.state.roomNumber}
              onChange={(e) => this.roomChange(e)}
              id="numCuarto"
              label={"Numero de Cuarto"}
              type="search"
            />

            <TextField fullWidth style={{ marginTop: '3%' }}
              value={this.state.bedNumber}
              onChange={(e) => this.bedChange(e)}
              id="numCuarto"
              label={"Numero de Cama"}
              type="search"
            />

          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="submit"
            onClick={this.modify}
          >
            Modificar
          </Button>
        </Grid>
      </div>
    );
  }
}

export default ModifyRoom;

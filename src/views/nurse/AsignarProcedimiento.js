import MomentUtils from '@date-io/moment';
import { FormControl, InputLabel, NativeSelect, Grid, TextField, Button, Typography } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import React, { Component } from 'react';

class AsignarProcedimiento extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date(),
      selectedTime: new Date(),
      procedure: '',
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sem velit, rhoncus at augue nec, aliquam mattis sapien. Donec eu libero ut magna vehicula vehicula in sit amet nisl. Ut tincidunt ante sed pharetra consequat. Integer quis nisl neque. Suspendisse accumsan nisi vitae nisl tempor, scelerisque tempor justo commodo. Mauris volutpat mi a facilisis dapibus. Praesent non sagittis quam. Vestibulum molestie ex eu est eleifend, eget egestas est sodales. Duis vitae ligula vitae ligula blandit tincidunt a et sapien. Maecenas eu leo sit amet magna blandit elementum eu non velit. Nam cursus nisi ac orci bibendum, sed varius nisl rhoncus. Suspendisse ac blandit mi. Sed ultrices consectetur tortor vel porttitor. Vestibulum non augue lobortis, mollis nunc ut, ullamcorper nisl. Integer magna sapien, commodo ut suscipit eu, sodales eu lacus."
    }
  }
  
  handleChangeProcedure = (event) => {
    //console.log(event);
    this.setState({ procedure: event.target.value });
  }

  handleDateChange = (event) => {
    // console.log(event);
    this.setState({ selectedDate: event});
  }

  handleTimeChange = (event) => {
    // console.log(event);
    this.setState({ selectedTime: event });
  }

  render() {
    return (
      <div>
        <Grid container>
          <Grid item xs={12} > 
            <Typography>
              Escoja el procedimient
            </Typography>
            
            <FormControl fullWidth>
              <InputLabel id="typeNurseInput">Procedimiento</InputLabel>
              <NativeSelect
                fullWidth
                value={this.state.procedure}
                onChange={this.handleChangeProcedure}
              >
                <option value=""> </option>
                <option value={'private room'}>private room</option>
                <option value={'semi-private'}>semi-private</option>
                <option value={'shared room'}>shared room</option>
              </NativeSelect>
            </FormControl>
          </Grid>

          <Grid item xs={12} >
            <Grid container>
              <Grid item xs={12}>
                <div style={{marginTop: "3%"}}>
                  <Typography>
                    Agregar mediante código
                  </Typography>
                </div>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6} style={{paddingTop: "2%"}}>
                <TextField fullWidth
                  value={this.state.numCuarto}
                  onChange={(e) => this.roomChange(e)}
                  id="numCuarto"
                  label={"Numero de Cuarto"}
                  type="search"
                />
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={5} >
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="submit"
                  onClick={this.addRoom}
                >
                  Agregar
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} >
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <Grid container>
                <Grid item xs={5} >
                  <DatePicker
                    label="Selecciona una fecha"
                    value={this.state.selectedDate}
                    onChange={this.handleDateChange}
                    format="DD/MM/yyyy"
                    //variant="static"
                    //orientation="landscape"
                    views={["year", "month", "date"]}
                    cancelLabel={"Cancelar"}
                    okLabel={"Aceptar"}
                  //todayLabel={"Hoy"}
                  //showTodayButton
                  />
                </Grid>
                <Grid item xs={1} ></Grid>
                <Grid item xs={5} >
                  <TimePicker
                    showTodayButton
                    todayLabel="Ahora"
                    label="Selecciona una hora"
                    value={this.state.selectedTime}
                    minutesStep={5}
                    onChange={this.handleTimeChange}
                  />
                </Grid>
              </Grid>
            </MuiPickersUtilsProvider>
          </Grid>

          <Grid item xs={12} >
            <Typography variant={"h4"} style={{ marginTop: 16, marginBottom: 16 }}>
              {"Descripción"}
            </Typography>
            <Typography variant={"body1"} paragraph>
              {this.state.description}
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default AsignarProcedimiento;

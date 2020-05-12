import React, { Component } from 'react'
import { Typography, Grid, FormControl, InputLabel, NativeSelect, Button } from '@material-ui/core'
import { MuiPickersUtilsProvider, DatePicker, TimePicker } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'

export default class AsignarTurno extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            selectedDate: new Date(),
            selectedTime: new Date()

        }
    }

    handleDateChange = (event) => {
        // console.log(event);
        this.setState({ selectedDate: event});
    }

    handleTimeChange = (event) => {
        // console.log(event);
        this.setState({ selectedTime: event });
    }

    getPiso =(event) =>{

    }

    addTurno=(event) =>{

    }

    render() {
        return (
            <div>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <Grid item xs ={12}>
                        <Typography variant="h4" gutterBottom align="center" color='textSecondary'>
                            Adicionar Turno
                        </Typography>
                    </Grid>
                    <Grid item xs ={12}>
                            <DatePicker
                                label="Selecciona una fecha"
                                value={this.state.selectedDate}
                                onChange={this.handleDateChange}
                                format="DD/MM/yyyy"
                                variant="static"
                                orientation="landscape"
                                views={["year", "month", "date"]}
                                cancelLabel={"Cancelar"}
                                okLabel={"Aceptar"}
                                todayLabel={"Hoy"}
                                showTodayButton
                            />
                    </Grid>

                    <Grid>
                        <Typography variant="h5" gutterBottom align="center" color='textSecondary'>
                            Horario: 
                        </Typography>
                    </Grid>

                    <Grid item xs ={12}>
                        <Grid container style={{marginTop:16}}>
                            
                            <Grid item xs={6}>
                                <TimePicker 
                                showTodayButton
                                todayLabel="Ahora"
                                label="Selecciona una hora"
                                value={this.state.selectedTime}
                                minutesStep={5}
                                onChange={this.handleTimeChange}
                                />
                            </Grid>

                            <Grid item xs ={1}>
                            </Grid>

                            <Grid item xs={5}>
                                <FormControl fullWidth error={this.state.errorType}>
                                    <InputLabel id="typeNurseInput">Piso</InputLabel>
                                        <NativeSelect 
                                            fullWidth
                                            value={this.state.P_id}
                                            onChange={this.getPiso}
                                            >
                                            <option value=""> </option>
                                            <option value={'1'}>1</option>
                                            <option value={'2'}>2</option>
                                            <option value={'3'}>3</option>
                                            
                                        </NativeSelect>
                                </FormControl>
                            </Grid>

                            <Grid item xs={5}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className="submit"
                                    onClick={(e)=>this.addTurno}
                                    >
                                    Aceptar
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </MuiPickersUtilsProvider>
            </div>
        )
    }
}

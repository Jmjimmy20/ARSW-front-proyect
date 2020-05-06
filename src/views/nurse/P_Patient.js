import React, { Component } from 'react'
import { Grid, FormControl, InputLabel, NativeSelect, Paper, Typography, Button } from '@material-ui/core'
import Axios from 'axios'
import ModifyRoom from './ModifyRoom';
import ModifyProcedure from './ModifyProcedure';

export default class P_Patient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            id: '',
            typeId: '',
            email: '',
            rh: '',
            room: '',
            patient: '',
            patients:[]

        }
    }

    componentDidMount() {
        Axios.get("/nurse/patients")
        .then(res => {
            this.setState({
                patients: res.data
            })
        });
    }

    handlePatientChange = (event) => {
        let value = event.target.value
        this.setState((state) => {
            for (const patient of state.patients) {
                if (patient.patientId === parseInt(value)) {
                    return {
                        patient: value,
                        name: patient.name,
                        id: patient.govId,
                        typeId: patient.govType,
                        email: '',
                        rh: patient.rh,
                        room: ''
                    }
                }
            }
        });
    }

    selectButton = (event, value) => {
        event.preventDefault();
        this.setState({
            vistaSelect: value
        })
    }

    vistaRender = () => {
        if (this.state.vistaSelect === "cuarto")
            return <ModifyRoom />
        else if (this.state.vistaSelect === "procedimiento")
            return <ModifyProcedure />
        else
            return ""
    }

    render() {
        return (
            <div>
                <Grid item xs={12}>
                    <Typography variant="h2" gutterBottom align="center" color='textSecondary'>
                        Modificar Paciente
                    </Typography>
                </Grid>
                <Grid container style={{paddingTop:'2%'}}>
                    <Grid item xs={11} component={Paper} style={{ padding: "2%", marginBottom: "2%" }}>
                        <FormControl fullWidth error={this.state.errorType}>
                            <InputLabel id="typeNurseInput">Paciente</InputLabel>
                            <NativeSelect 
                                fullWidth
                                value={this.state.patient}
                                onChange={this.handlePatientChange}
                                >
                                <option value=""> </option>
                                {this.state.patients.map((patient, index) => {
                                    return(
                                        <option key={index} value={patient.patientId}> {patient.govId} - {patient.name} </option>
                                    );
                                })}
                            </NativeSelect>
                        </FormControl>
                    </Grid>

                    <Grid item xs={11} component={Paper} style={{ padding: "2%", marginBottom: "2%" }}>
                        <Grid item xs={12}>
                            <Typography>
                                Nombre:  { this.state.name }
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                                Tipo de documento:  { this.state.typeId }
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                                Cedula:  { this.state.id }
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                                RH:  { this.state.rh }
                            </Typography>
                        </Grid>    
                        <Grid item xs={12}>
                            <Typography>
                                Correo:  { this.state.email }
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                                Cuarto:  {this.state.room}
                            </Typography>
                        </Grid> 
                    </Grid>

                    <Grid item xs={11} component={Paper} style={{ padding: "2%", marginBottom: "2%" }}>
                        <Grid container >
                            <Grid item xs={5}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className="submit"
                                    onClick={(e) => this.selectButton(e, "cuarto")}
                                >
                                    Modificar Cuarto
                                </Button>
                            </Grid>
                            <Grid item xs={2}></Grid>
                            <Grid item xs={5}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className="submit"
                                    onClick={(e) => this.selectButton(e, "procedimiento")}
                                >
                                    Modificar Procedimiento
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={11} component={Paper} style={{ padding: "2%", marginBottom: "2%" }}>
                        {this.vistaRender()}
                    </Grid>
                </Grid>
            </div>
        )
    }
}

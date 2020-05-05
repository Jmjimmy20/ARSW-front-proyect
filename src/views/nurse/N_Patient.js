import React, { Component } from 'react'
import { Grid, Button } from '@material-ui/core'
import { Route, Switch } from 'react-router-dom';
import CPatient from './C_Patient';
import APatient from './A_Patient';
import PPatient from './P_Patient';

export default class N_Patient extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            nurseName:'',
            cedulaNurse:'',
            RHNurse:'',
            typeNurse: '',
            mailNurse:'',
            errorNurseName:false,
            errorCedula:false,
            errorRH:false,
            errorType:false,
            errorMail:false,
            typeDocument:'',
            errorTypeD:false
        }
    }

    render() {
        return (
            <div>                
                <Grid container>
                    <Grid item xs={4}>
                        <Grid container>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={3}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className="submit"
                                    href = {"/Nurse/Patient/Consultar"}
                                    >
                                    Consultar Paciente
                                </Button>
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={3}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className="submit"
                                    href={"/Nurse/Patient/Asignar"}
                                >
                                    Asignar Proceso
                                </Button>
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={3}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className="submit"
                                    href={"/Nurse/Patient/Modify"}
                                >
                                    Modificar Paciente
                                </Button>
                            </Grid>
                        </Grid>  
                    </Grid>


                    <Grid item xs={8}>
                        <Switch>
                            <Route path="/Nurse/Patient/Consultar">
                                <CPatient/>
                            </Route>
                        </Switch>
                        <Switch>
                            <Route path="/Nurse/Patient/Asignar">
                                <APatient/>
                            </Route>
                        </Switch>
                        <Switch>
                            <Route path="/Nurse/Patient/Modify">
                                <PPatient/>
                            </Route>
                        </Switch>
                    </Grid>
                </Grid>

            </div>
        )
    }
}

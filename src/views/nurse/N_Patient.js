import React, { Component } from 'react'
import { Grid, Button } from '@material-ui/core'
import { Route, Switch } from 'react-router-dom';
import C_Patient from './C_Patient';
import A_Patient from './A_Patient';
import P_Patient from './P_Patient';

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
                    <Grid item xs={6} style={{paddingLeft:"2%"}}>
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

                        <Grid item xs={3}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className="submit"
                                href = {"/Nurse/Patient/Asignar"}
                                >
                                Asignar Proceso
                            </Button>
                        </Grid>
                        
                        <Grid item xs={3}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className="submit"
                                href = {"/Nurse/Patient/Piso"}
                                >
                                Cambio de piso 
                            </Button>
                        </Grid>
                    </Grid>


                    <Grid item xs={6}>
                        <Switch>
                            <Route path="/Nurse/Patient/Consultar">
                                <C_Patient/>
                            </Route>
                        </Switch>
                        <Switch>
                            <Route path="/Nurse/Patient/Asignar">
                                <A_Patient/>
                            </Route>
                        </Switch>
                        <Switch>
                            <Route path="/Nurse/Patient/Piso">
                                <P_Patient/>
                            </Route>
                        </Switch>
                    </Grid>
                </Grid>

            </div>
        )
    }
}

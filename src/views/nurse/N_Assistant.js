import React, { Component } from 'react'
import { Grid, Button } from '@material-ui/core'
import { Route, Switch } from 'react-router-dom';
import EAssistant from './E_Assistant';
import A_Assistant from './A_Assistant';
import C_Assistant from './C_Assistant';
import E_Assistant from './E_Assistant';

export default class N_Assistant extends Component {

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
                    <Grid item xs={6}>
                        <Grid item xs={3}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className="submit"
                                href = {"/Nurse/Assistant/Agregar"}
                                >
                                Agregar
                            </Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className="submit"
                                href = {"/Nurse/Assistant/Modificar"}
                                >
                                Modificar
                            </Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className="submit"
                                href = {"/Nurse/Assistant/Consultar"}
                                >
                                Consultar
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid item xs={6}>
                        <Switch>
                            <Route path="/Nurse/Assistant/Agregar">
                                <A_Assistant/>
                            </Route>
                        </Switch>
                        <Switch>
                            <Route path="/Nurse/Assistant/Modificar">
                                <EAssistant/>
                            </Route>
                        </Switch>
                        <Switch>
                            <Route path="/Nurse/Assistant/Consultar">
                                <C_Assistant/>
                            </Route>
                        </Switch>
                    </Grid>
                </Grid>

            </div>
        )
    }
}

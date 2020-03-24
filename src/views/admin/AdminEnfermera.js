import React, { Component } from 'react'
import { Grid, Button } from '@material-ui/core'
import { Route, Switch } from 'react-router-dom';
import AddEfermera from './AddEfermera';
import EditEnfermera from './EditEnfermera';
import ConsEnfermera from './ConsEnfermera';

export default class AdminEnfermera extends Component {

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
                                href = {"/Admin/Nurse/add"}
                                >
                                Agregar Enfermera
                            </Button>
                        </Grid>

                        <Grid item xs={3}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className="submit"
                                href = {"/Admin/Nurse/modify"}
                                >
                                Modificar Enfermera 
                            </Button>
                        </Grid>
                        
                        <Grid item xs={3}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className="submit"
                                href = {"/Admin/Nurse/consult"}
                                >
                                Consultar Enfermera 
                            </Button>
                        </Grid>
                    </Grid>


                    <Grid item xs={6}>
                        <Switch>
                            <Route path="/Admin/Nurse/add">
                                <AddEfermera/>
                            </Route>
                            <Route path="/Admin/Nurse/modify">
                                <EditEnfermera/>
                            </Route>
                            <Route path="/Admin/Nurse/consult">
                                <ConsEnfermera/>
                            </Route>
                        </Switch>
                    </Grid>
                </Grid>

            </div>
        )
    }
}

import React, { Component } from 'react'
import { Grid, Button } from '@material-ui/core'
import { Route, Switch } from 'react-router-dom';
import AddEfermera from '../admin/AddEfermera';
import EditEnfermera from '../admin/EditEnfermera';
import ConsEnfermera from '../admin/ConsEnfermera';

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
                                Asignar Enfermera
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
                                Asignar Paciente 
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
                                ---- 
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

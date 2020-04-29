import React, { Component } from 'react'
import { Grid, Button } from '@material-ui/core'
import { Route, Switch } from 'react-router-dom';
import AddPiso from '../admin/AddPiso';
import EditPiso from '../admin/EditPiso';
import ConsPiso from '../admin/ConsPiso';

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
                                href = {"/Admin/Piso/add"}
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
                                href = {"/Admin/Piso/modify"}
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
                                href = {"/Admin/Piso/consult"}
                                >
                                ---- 
                            </Button>
                        </Grid>
                    </Grid>


                    <Grid item xs={6}>
                        <Switch>
                            <Route path="/Admin/Piso/add">
                                <AddPiso/>
                            </Route>
                            <Route path="/Admin/Piso/modify">
                                <EditPiso/>
                            </Route>
                            <Route path="/Admin/Piso/consult">
                                <ConsPiso/>
                            </Route>
                        </Switch>
                    </Grid>
                </Grid>

            </div>
        )
    }
}

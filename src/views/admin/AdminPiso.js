import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, FormControl, InputLabel, NativeSelect, FormHelperText, Paper, Button, Typography, FormGroup, FormControlLabel, Select, MenuItem } from '@material-ui/core'
import { Route, Switch } from 'react-router-dom';
import AddPiso from './AddPiso';
import EditPiso from './EditPiso';
import ConsPiso from './ConsPiso';

export default class AdminPiso extends Component {

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
                                Agregar Piso
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
                                Modificar Piso 
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
                                Consultar Piso 
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

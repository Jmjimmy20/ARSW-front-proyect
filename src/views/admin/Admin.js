import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, FormControl, InputLabel, NativeSelect, FormHelperText, Paper, Button, Typography, FormGroup, FormControlLabel, Select, MenuItem } from '@material-ui/core'
import Axios from 'axios'
import { Route, Switch } from 'react-router-dom';
import AdminEnfermera from './AdminEnfermera';
import AdminPiso from './AdminPiso';


export default class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            
        }
    }

    
    render() {
        return (
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={6} style={{ padding: 3 }}>
                        <Grid container spacing={3} style={{marginLeft: "3%"}}>
                            <Grid item xs={3}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className="submit"
                                    href = {"/Login"}
                                    >
                                    Log Out
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={6} style={{ padding: 3 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className="submit"
                                    href = {"/Admin/Nurse"}
                                    >
                                    Enfermera
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className="submit"
                                    href = {"/Admin/Piso"}
                                    >
                                    Piso
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} style={{ padding: 3 }}>
                        <Switch>
                            <Route path="/Admin/Nurse">
                                <AdminEnfermera/>
                            </Route>
                            <Route path="/Admin/Piso">
                                <AdminPiso/>
                            </Route>
                        </Switch>
                    </Grid>

                    <Grid item xs={6} style={{ padding: 3 }}>   
                        <Grid container spacing={3} style={{marginTop: "3%"}} style={{marginLeft: "3%"}}>
                            <Grid item xs={3}>
                                
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={6} style={{ padding: 3 }}>
                         
                    </Grid>
                </Grid>
            </div>
        )
    }

}
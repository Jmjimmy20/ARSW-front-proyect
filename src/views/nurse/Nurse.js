import React, { Component } from 'react'
import { Grid, FormControl, InputLabel, NativeSelect, FormHelperText, Paper, Button, Typography } from '@material-ui/core'
import Axios from 'axios'
import cookie from 'react-cookies';
import { Route, Switch } from 'react-router-dom';
import N_Assistant from './N_Assistant';
import N_Patient from './N_Patient';

export default class Nurses extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            
        }
        this.logout = this.logout.bind(this)
    }

    logout(){
        cookie.remove('userToken',{path:'/'})
        console.log(cookie.load('userToken'))
        this.props.history.push("/")
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
                                    onClick={this.logout}
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
                                    href = {"/Nurse/Assistant"}
                                    >
                                    Auxiliar
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className="submit"
                                    href = {"/Nurse/Patient"}
                                    >
                                    Paciente
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} style={{ padding: 3 }}>
                        <Switch>
                            <Route path="/Nurse/Assistant">
                                <N_Assistant/>
                            </Route>
                            <Route path="/Nurse/Patient">
                                <N_Patient/>
                            </Route>
                        </Switch>
                    </Grid>

                    <Grid item xs={6} style={{ padding: 3 }}>   
                        <Grid container spacing={3} style={{ marginTop: "3%", marginLeft: "3%"}}>
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

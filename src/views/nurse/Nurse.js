import React, { Component } from 'react'
import { Grid, Button, Typography, Paper } from '@material-ui/core'
import cookie from 'react-cookies';
import { Route, Switch } from 'react-router-dom';
import NAssistant from './N_Assistant';
import NPatient from './N_Patient';
import CustomTable from '../CustomTablex';

export default class Nurses extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            rows:[]
        }
        this.logout = this.logout.bind(this)
    }

    logout(){
        cookie.remove('userToken',{path:'/'})
        console.log(cookie.load('userToken'))
        this.props.history.push("/")
    }

    headCells = [
        { id: 'IdNurse', label: 'ID Enfermera' },
        { id: 'nNurse', label: 'Nombre Enfermera' },
        { id: 'IdTask', label: 'Id Tarea' },
        { id: 'nTask', label: 'Tarea' }
      ];
    
    
    render() {
        return (
            <div>
                <Grid container style={{paddingLeft: 5, paddingRight: 5}}>
                    <Grid item xs={4}>
                        <Grid container >
                            <Grid item xs={1}></Grid>
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

                    <Grid item xs={8}>
                        <Grid container>
                            <Grid item xs={1}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className="submit"
                                    href={"/Nurse"}
                                >
                                    Home
                                </Button>
                            </Grid>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={4}>
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
                            <Grid item xs={1}></Grid>
                            <Grid item xs={4}>
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

                    <Grid item xs={12} >
                        <Switch>
                            <Route path="/Nurse/Assistant">
                                <NAssistant />
                            </Route>
                            <Route path="/Nurse/Patient">
                                <NPatient />
                            </Route>
                            <Route path="/Nurse">
                                <Grid item xs={12} component={Paper} style={{ paddingLeft: '20%', paddingRight: '20%', paddingBottom: '5%' }}>
                                    <Typography variant="h2" gutterBottom align="center" color='textSecondary'>
                                        Dashboard
                                    </Typography>
                                    <Grid item xs={12}>
                                        <CustomTable rows={this.state.rows} headCells={this.headCells} title={"Información"} />
                                    </Grid>
                                </Grid>
                            </Route>
                        </Switch>
                    </Grid>
                </Grid>
                
            </div>
        )
    }
}

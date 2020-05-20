import React, { Component } from 'react'
import { Grid, Button, Typography, Paper } from '@material-ui/core'
import cookie from 'react-cookies';
import { Route, Switch } from 'react-router-dom';
import NAssistant from './N_Assistant';
import NPatient from './N_Patient';
import CustomTable from '../CustomTablex';
import SockJsClient from 'react-stomp';
import Axios from 'axios';

export default class Nurses extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            rows:[],
            messages: [],
            typedMessage: "",
            name: "",
            user:""
        }
        this.logout = this.logout.bind(this)
    }

    componentDidMount() {
        
        var jwtDecode = require('jwt-decode');
        var token = cookie.load('userToken');
        let deco = jwtDecode(token);
        if(deco.jti != "MANAGER" ){
            window.location="/";
        }
        console.log(deco)
        this.setState({
            name:deco.sub 
        }) 

        this.updateDashboard()
    }

    logout(){
        cookie.remove('userToken',{path:'/'})
        console.log(cookie.load('userToken'))
        this.props.history.push("/")
    }

    headCells = [
        
        { id: 'nNurse', label: 'Enfermera' },
        { id: 'totalTask', label: 'Tareas totales' },
        { id: 'pTask', label: 'Tareas pendientes' },
        { id: 'perc', label: '% Completado' }
      ];

      displayMessages = () => {
        return (
            <div>
                {this.state.messages.map(msg => {
                    console.log("nombre mensajes");
                    console.log(msg.name);
                    console.log(msg);

                    return (
                        <div>
                            {this.state.name == msg.name ?
                                <div>
                                    <p className="title1">Alerta: </p><br/>
                                    <p>{msg.message}</p>
                                </div> :
                                <div>
                                    <p className="title2">No hay alertas. </p><br/>
                                    
                                </div>
                            }
                        </div>)
                })}
            </div>
        );
    };

    sendMessage = () => {
        this.clientRef.sendMessage('/app/user-all', JSON.stringify({
            name: this.state.name,
            message: this.state.typedMessage
        }));
    };

    updateDashboard = () =>{
        var jwtDecode = require('jwt-decode');
        var token = cookie.load('userToken');
        let deco = jwtDecode(token);
        let auxRow = []
        Axios.get("/nurse/nurses-assistant/block/nurseGovId/" + deco.sub)
        .then(res =>{
            for(const nur of res.data){
                
                var tasks = asyncTask(nur.nurseId)
                console.log(tasks)
                tasks.then(resTotal =>{
                    let row = {name: nur.nurseId, nNurse: nur.name, totalTask: resTotal.total, pTask: resTotal.pendientes, perc: resTotal.total !== 0? (((resTotal.total-resTotal.pendientes)/resTotal.total)*100) + "%" : "0%"}
                    console.log(resTotal)
                    auxRow.push(row)
                    this.setState({
                        rows:auxRow
                    })
                })
            }
            
        })
    }
    
    
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
                <div>
                    <div className="align-center">
                        <h1>Sus Alertas</h1>
                        <br/><br/>
                    </div>
                    
                    <div className="align-center">
                        {this.displayMessages()}
                    </div>
                    <SockJsClient url='https://happ2020.herokuapp.com/websocket-chat/'
                                topics={['/topic/user']}
                                onConnect={() => {
                                    console.log("connected");
                                }}
                                onDisconnect={() => {
                                    console.log("Disconnected");
                                }}
                                onMessage={(msg) => {
                                    var jobs = this.state.messages;
                                    if(msg.message==='update'){
                                        this.updateDashboard()
                                    }else{
                                        jobs.push(msg);
                                        this.setState({messages: jobs});
                                        console.log(this.state);
                                    }
                                }}
                                ref={(client) => {
                                    this.clientRef = client
                                }}/>
                </div>
                
            </div>

            
        )
    }
}

async function asyncTask(nursei){
    const auxAll = await  Axios.get("/nurse/undergoes/today/nurse/" + nursei)
    .then(resTask =>{
        return resTask.data.length
    })
    const auxNotDone = await Axios.get("/nurse/undergoes/notdone/today/nurse/" + nursei)
    .then(resTasknotDone =>{
        return resTasknotDone.data.length
    })

    let obj = {
        total:auxAll,
        pendientes:auxNotDone
    }

    return obj
}

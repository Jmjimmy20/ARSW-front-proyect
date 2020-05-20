import { Button, FormControl, FormHelperText, Grid, InputLabel, NativeSelect, Paper, Typography } from '@material-ui/core';
import Axios from 'axios';
import React, { Component, createRef } from 'react';
import cookie from 'react-cookies';
import CustomTable from '../CustomTable';
import moment from 'moment';

import TextField from '@material-ui/core/TextField';

import SockJsClient from 'react-stomp';


export default class Nassistant extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            nombre: '', 
            cedula: '',
            docType:'',
            genero:'',
            rh: '', 
            nHabitacion:'', 
            nPaciente:'',
            habitaciones:[],
            pacientes: [],
            numSelected: '',
            rowCount: '',
            rows: [],
            headCells: [],
            orderBy:'',
            order:'',
            nurseId:'',
            enfermeras:[],
            rooms:[],
            procedimientos:[],
            undergoes:[],
            selectedData:[],
            tDeco:'',
            alerta: false,
            text:"",
            messages: [],
            typedMessage: "",
            name: "",
            usersend:"",
            user:""
        }
        this.logout = this.logout.bind(this)
        
        this.sendData = this.sendData.bind(this)
    }

    headCells = [
        { id: 'nPaci', label: 'Paciente' },
        { id: 'nCuarto', label: 'Cuarto' },
        { id: 'nProcedure', label: 'Procedure' },
        { id: 'hora', label: 'Hora' }
      ];

    componentDidMount() {
        var token = cookie.load('userToken');
        console.log(token);
        var jwtDecode = require('jwt-decode');
        let deco = jwtDecode(token);
        if(deco.jti != "ASSISTANT" ){
            
            window.location="/";

        }
        this.setState({
            tDeco:deco
        })
        //deco.sub
        let prom = asyncFunc(deco)
        prom.then(res =>{
            this.setState({
                rows:res
            })
        })

        //-----------
        Axios.get("/assistant-nurse/boss/nurse/user/" + deco.sub) //cambiar patriciaM" por "+this.state.usersend
        .then(res =>{
            console.log(res.data.loginUser)
            this.setState({
                user:res.data.loginUser
            })
            
            
        });



    }

    logout(){
        cookie.remove('userToken',{path:'/'})
        console.log(cookie.load('userToken'))
        this.props.history.push("/")
    }

    sendMessage = () => {
        this.clientRef.sendMessage('/app/user-all', JSON.stringify({
            name: this.state.user,
            message: this.state.typedMessage
        }));
    };

    displayMessages = () => {
        return (
            <div>
                {this.state.messages.map(msg => {
                    return (
                        <div>
                            {this.state.name == msg.name ?
                                <div>
                                    <p className="title1">{msg.name} : </p><br/>
                                    <p>{msg.message}</p>
                                </div> :
                                <div>
                                    <p className="title2">{msg.name} : </p><br/>
                                    <p>{msg.message}</p>
                                </div>
                            }
                        </div>)
                })}
            </div>
        );
    };

    alert = (event) => {
        console.log("Alerta");
        this.setState({
            alert: true
        })
    }
    
    getNurse = (event) => {
        let idNurse = event.target.value;
        console.log(event.target.value);
        this.setState((state) => {
            for(const nurse of state.enfermeras){
                if(nurse.nurseId === parseInt(idNurse)){
                    console.log(nurse);
                    return({
                        nurseId: nurse.nurseId
                    })
                }
            }
        })
    }

    sendData = (event) => {
        console.log(this.state.selectedData)
        for(const selected of this.state.selectedData){
            Axios.get("/assistant-nurse/undergoes/" + selected)
            .then(res =>{
                res.data.done = new moment()
                console.log(res.data)
                Axios.put("/assistant-nurse/undergoes", res.data)
                .then(()=>{
                    let prom = asyncFunc(this.state.tDeco)
                    prom.then(resN =>{
                        this.setState({
                            rows:resN
                        })
                    })
                    this.clientRef.sendMessage('/app/user-all', JSON.stringify({
                        name: this.state.user,
                        message: 'update'
                    }));
                })
            })
        }
        
    }

    getData =(event) =>{
        console.log(event)
        this.setState({
            selectedData:event
        })
    }

    roomChange = (event) => {
        // console.log(event.target.value);
        this.setState({nHabitacion:event.target.value}, () => {
            this.load(this.state.nHabitacion);
        })
    }

    patientChange = (event) => {
        let idPacient = event.target.value;
        console.log(event.target.value);
        this.setState((state) => {
            for (const paciente of state.pacientes) {
                if (paciente.patientId === parseInt(idPacient)) {
                    console.log(paciente);
                    return ({
                        nombre: paciente.name,
                        docType: paciente.govType,
                        cedula: paciente.govId,
                        rh: paciente.rh,
                        genero: paciente.gender,
                        nPaciente: paciente.patientId
                    })
                }

            }
        })

    }

    onSelectAllClick = (event) => {
        if (event.target.checked) {
          const newSelecteds = this.state.rows.map((n) => n.name);
          this.setState(newSelecteds);
          return;
        }
        this.setState([]);
      }


    render() {
        return (
            <div>
                <Grid container>
                    <Grid item xs={6}>
                        <Grid container>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={3}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className="submit"
                                    onClick = {this.logout}
                                    >
                                    Log Out
                                </Button>
                            </Grid>
                            
                            <Grid item xs={1}></Grid>
                            <Grid item xs={3} >
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className="submit"
                                    onClick = {this.alert}
                                    >
                                    Alerta
                                </Button>
                            </Grid>
                            {//--------------------------------
                            this.state.alert == true ? 
                              <div className="align-center">
                              <br/><br/>
                              <table>
                                  <tr>
                                      <td>
                                          <TextField id="outlined-basic" label="Escriba su alerta una alerta:" variant="outlined"
                                                     onChange={(event) => {
                                                         this.setState({typedMessage: event.target.value});
                                                     }}/>
                                      </td>
                                      <td>
                                          <Button variant="contained" color="primary"
                                                  onClick={this.sendMessage}>Enviar</Button>
                                      </td>
                                  </tr>
                              </table>
                          </div>
                            :
                            ""
                        }
                        </Grid>
                    </Grid>
                    <Grid item xs={12} component={Paper} style={{marginTop: "5%", marginLeft:10, marginRight:10}}>
                        <CustomTable rows={this.state.rows} headCells={this.headCells} title={"Tareas"} data={this.getData} />
                    </Grid>
                    <Grid container>
                        <Grid item xs={5}></Grid>
                        <Grid item xs={2} >
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className="submit"
                                onClick = {this.sendData}
                                >
                                Enviar
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
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
                                  jobs.push(msg);
                                  this.setState({messages: jobs});
                                  console.log(this.state);
                              }}
                              ref={(client) => {
                                  this.clientRef = client
                              }}/>
            </div>

        )
    }

}

async function asyncFunc(deco){
    const response = await Promise.all([
        Axios.get("/assistant-nurse/procedures/today/nurseGov/" + deco.sub),
        Axios.get("/assistant-nurse/undergoes/today/nurseGov/" + deco.sub),
        Axios.get("/assistant-nurse/patients/nurse/" + deco.sub)
    ]);

    console.log(response[2].data)

    let tempRows = []
    for(const paci of response[2].data){
        let auxNombre = paci.name
        let auxCuarto
        let auxProcedure
        let auxHora
        
        const responseH = await
        Axios.get("/assistant-nurse/room/patient/" + paci.patientId)
        .then(resRoom =>{
            return resRoom.data.roomnumber
        })
        auxCuarto = responseH
        for(const under of paci.stays[0].undergoes){
            for(const underN of response[1].data){
                if(under.undergoesId == underN.undergoesId){
                    auxHora = moment(under.date) .format('LT')
                    let row = {name: under.undergoesId, nPaci:auxNombre, nCuarto: auxCuarto, hora: auxHora, idUnde:under.undergoesId}
                    tempRows.push(row)
                    //console.log(row)
                    console.log(under.undergoesId , underN.undergoesId)
                }
                

            }
            
        }
    }

    for(const underT of tempRows){
        for(const prc of response[0].data){
            for(const proc of prc.undergoes){
                if(underT.idUnde == proc.undergoesId){
                    underT.nProcedure = prc.name
                }
    
            }
        }
    }
    let finRows = []
    //console.log(_.uniq(tempRows))
    /*finRows.push(tempRows[0])
    for(const au of tempRows){
        for(const fr of finRows){
            if(au.idUnde !== fr.idUnde){
                finRows.push(au)
            }
        }
    }*/

    return tempRows;
}

import { Button, FormControl, FormHelperText, Grid, InputLabel, NativeSelect, Paper, Typography } from '@material-ui/core';
import Axios from 'axios';
import React, { Component } from 'react';
import cookie from 'react-cookies';
import CustomTable from '../CustomTable';
import moment from 'moment';


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
            undergoes:[]
        }
        this.logout = this.logout.bind(this)
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
        //deco.sub
        let prom = asyncFunc(deco)
        prom.then(res =>{
            this.setState({
                rows:res
            })
        })
        
        

    }

    

    logout(){
        cookie.remove('userToken',{path:'/'})
        console.log(cookie.load('userToken'))
        this.props.history.push("/")
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
                                    >
                                    Mis datos
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} component={Paper} style={{marginTop: "5%", marginLeft:10, marginRight:10}}>
                        <CustomTable rows={this.state.rows} headCells={this.headCells} title={"Tareas"} />
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
            </div>
        )
    }

}

async function asyncFunc(deco){
    const response = await Promise.all([
        Axios.get("/assistant-nurse/procedures/today/nurseGov/" + 5899459383),
        Axios.get("/assistant-nurse/undergoes/today/nurseGov/" + 5899459383),
        Axios.get("/assistant-nurse/patients/nurse/" + 5899459383)
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
                    let row = {name: auxNombre, nPaci:auxNombre, nCuarto: auxCuarto, hora: auxHora, idUnde:under.undergoesId}
                    tempRows.push(row)
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
    console.log(tempRows)

    return tempRows;
}

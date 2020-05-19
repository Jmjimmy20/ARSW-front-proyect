import { Button, FormControl, FormHelperText, Grid, InputLabel, NativeSelect, Paper, Typography } from '@material-ui/core';
import Axios from 'axios';
import React, { Component, createRef } from 'react';
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
            undergoes:[],
            selectedData:[],
            tDeco:''
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
                                    >
                                    Mis datos
                                </Button>
                            </Grid>
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

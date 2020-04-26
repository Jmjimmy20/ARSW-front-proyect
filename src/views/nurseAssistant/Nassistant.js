import { Button, FormControl, FormHelperText, Grid, InputLabel, NativeSelect, Paper, TableRow, Typography } from '@material-ui/core';
import Axios from 'axios';
import React, { Component } from 'react';
import cookie from 'react-cookies';
import CustomTable from '../CustomTable';


export default class Nassistant extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            nombre: 'Jimmy Moya', 
            cedula: '1.019.000.000',
            rh: 'O+', 
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
            headCells:[],
            rows:[]

        }
        this.logout = this.logout.bind(this)
    }

    headCells = [
        { id: 'IdProcedure', label: 'Id' },
        { id: 'nProcedure', label: 'Procedure' }
      ];

    componentDidMount() {
        var token = cookie.load('userToken');
        console.log(token);
        Axios.get("/admin/nurses")
        .then(res =>{
            console.log(res.data)
            this.setState({
                enfermeras:res.data
            })
        });
        console.log(this.state.enfermeras.length);
    }

    /*componentDidMount() {
        console.log(cookie.load('userToken'))
        Axios
            .get("https://raw.githubusercontent.com/Jmjimmy20/testAPI/master/nurseTest")
            .then( res => {
                console.log(res);
                this.setState({
                    habitaciones: res.data.floor.rooms
                })
            }) 
    }*/

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
                        nombre: nurse.name,
                        cedula: nurse.idDocument,
                        rh: nurse.rh
                    })
                }
            }
        })
    }

    /*componentDidMount() {
        console.log(cookie.load('userToken'))
        Axios
            .get("https://raw.githubusercontent.com/Jmjimmy20/testAPI/master/nurseTest")
            .then( res => {
                console.log(res);
                this.setState({
                    habitaciones: res.data.floor.rooms
                })
            }) 
    }*/

    /*load = (id) => {
        Axios
            .get("https://raw.githubusercontent.com/Jmjimmy20/testAPI/master/usuarioTestH" + id)
            .then(res => {
                console.log(res);
                this.setState({
                    pacientes: res.data.pacientes
                })
            })
    }*/

    

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
                if (paciente.idDocument === idPacient) {
                    console.log(paciente);
                    return ({
                        nPaciente: idPacient,
                        nombre: paciente.name,
                        cedula: paciente.idDocument,
                        fechaN: paciente.birthDay,
                        rh: paciente.rh
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
                <Grid container spacing={3}>
                    <Grid item xs={6} style={{ padding: 3 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
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
                            <Grid item xs={6} >
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className="submit"
                                    >
                                    Alerta
                                </Button>
                            </Grid>

                            <Grid container style={{marginBottom: "3%"}}>
                                <Grid item xs={2}></Grid>
                                <Grid item xs={6}  component={Paper} style={{ padding: 5 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="typeNurseInput">Enfermera</InputLabel>
                                        <NativeSelect 
                                            fullWidth
                                            value={this.state.nurseId}
                                            onChange={this.getNurse}
                                            >
                                            <option value=""> </option>
                                            {this.state.enfermeras.map((enfermera, index) => {
                                                return(
                                                <option key={index} value={enfermera.nurseId}> {enfermera.position} - {enfermera.name} </option>
                                                );
                                            })}
                                            
                                        </NativeSelect>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Grid container style={{marginBottom: "3%"}}>

                                <Grid item xs={2}></Grid>
                                    <Grid item xs={6} component={Paper} style={{ padding: 5 }}>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="habitacionSelect">Habitacón</InputLabel>
                                        <NativeSelect
                                            fullWidth
                                            value={this.state.nHabitacion}
                                            onChange={this.roomChange}
                                            inputProps={{
                                                name: 'Habitacion',
                                                id: 'habitacionSelect',
                                            }}
                                        >   <option value="" />
                                            {this.state.habitaciones.map((habitacion, index) => {
                                                return (
                                                    <option key={index} value={habitacion.idRoom}>Habitacion {habitacion.idRoom}</option>
                                                );
                                            })}
                                        </NativeSelect>
                                        <FormHelperText>Habitacion</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={2}></Grid>
                            </Grid>
                            
                            <Grid container>
                                <Grid item xs={2}></Grid>                                       
                                <Grid item xs={6} component={Paper} style={{padding: 5}}>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="pacienteSelect">Paciente</InputLabel>
                                        <NativeSelect
                                            fullWidth
                                            value={this.state.nPaciente}
                                            onChange={this.patientChange}
                                            inputProps={{
                                                name: 'Paciente',
                                                id: 'pacienteSelect',
                                            }}
                                        >   <option value="" />
                                            {this.state.pacientes.map((paciente, index) =>{
                                                return(
                                                    <option key={index} value={paciente.idDocument}>{paciente.idDocument} - {paciente.name}</option>
                                                );
                                            })}
                                        </NativeSelect>
                                        <FormHelperText>Paciente</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={2}></Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={6} style={{marginTop: "3%"}}>
                        <Grid container component={Paper}>
                            <Grid item xs={12}>
                                <Typography>
                                    Nombre:  { this.state.nombre }
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>
                                    Cedula:  { this.state.cedula }
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>
                                    Fecha de Nacimiento:  { this.state.fechaN }
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>
                                    RH:  { this.state.rh }
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid container component={Paper} style={{marginTop: "3%"}}>
                            <Grid item xs={12}>
                                <CustomTable rows={this.state.rows} headCells={this.headCells} title={"Procedures"} />
                            </Grid>
                        </Grid>
                    </Grid>

                    

                </Grid>
            </div>
        )
    }

}

import React, { Component } from 'react'
import { Grid, FormControl, InputLabel, NativeSelect, Button, TextField, Typography } from '@material-ui/core'
import Axios from 'axios';


export default class AsignarCuarto extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            roomsType:'',
            numCuarto: '',
            numCama:'',
            pacientes:[],
            P_name:'',
            P_id:'',
            P_direccion:'',
            P_genero:'',
            P_idDoc:'',
            P_idType:'',
            P_telefono:'',
            P_rh:''
        }
    }

    componentDidMount(){
        Axios.get("/nurse/patients")
        .then(res =>{
          console.log(res.data)
          this.setState({
              pacientes:res.data
          })
        });
    }

    typeRoomChange = (event, i) => {
        this.setState({
            roomsType: event.target.value
        });
    }

    roomChange = (event) => {
        this.setState({
            numCuarto: event.target.value
        });
    }

    bedChange = (event) => {
        this.setState({
            numCama: event.target.value
        });
    }

    assign = (event) => {
        event.preventDefault();
    }

    getPatient = (event) => {
        let auxPaciente = event.target.value;
        //console.log(event.target.value);
        
        for(const paci of this.state.pacientes){
            if(paci.patientId === parseInt(auxPaciente)){
                Axios.get("/nurse/patient/" + paci.patientId)
                .then(res => {
                    this.setState({
                        P_name: res.data.name,
                        P_id:res.data.patientId,
                        P_direccion:res.data.address,
                        P_genero:res.data.gender,
                        P_idDoc:res.data.govId,
                        P_idType:res.data.govType,
                        P_telefono:res.data.phone,
                        P_rh:res.data.rh
                    })
    
                })
                
            }
        }
    }


    render() {
        return (
            <div>
                <Grid container >
                    <Grid item xs={12}>
                        <Typography >
                            Escoja el paciente
                        </Typography>
                        <FormControl fullWidth error={this.state.errorType}>
                            <InputLabel id="typeNurseInput">Paciente</InputLabel>
                            <NativeSelect 
                                fullWidth
                                value={this.state.P_id}
                                onChange={this.getPatient}
                                >
                                <option value=""> </option>
                                {this.state.pacientes.map((paciente, index) => {
                                    return(
                                    <option key={index} value={paciente.patientId}> {paciente.patientId} - {paciente.name} </option>
                                    );
                                })}
                                
                            </NativeSelect>
                        </FormControl>
                        
                        <Typography style ={{marginTop:'2%'}}>
                            El sistema asigna
                        </Typography>
                        
                        <FormControl fullWidth>
                            <InputLabel id="typeNurseInput">Tipo de Cuarto</InputLabel>
                            <NativeSelect
                                fullWidth
                                value={this.state.roomsType}
                                onChange={(e) => this.typeRoomChange(e)}
                            >
                                <option value=""> </option>
                                <option value={'private room'}>private room</option>
                                <option value={'semi-private'}>semi-private</option>
                                <option value={'shared room'}>shared room</option>
                            </NativeSelect>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography style={{ paddingTop: '3%' }}>
                            Especificar el número de Cuarto y cama
                        </Typography>

                        <TextField fullWidth
                            value={this.state.numCuarto}
                            onChange={(e) => this.roomChange(e)}
                            id="numCuarto"
                            label={"Numero de Cuarto"}
                            type="search"
                        />

                        <TextField fullWidth style={{marginTop: '3%'}}
                            value={this.state.numCama}
                            onChange={(e) => this.bedChange(e)}
                            id="numCuarto"
                            label={"Numero de Cama"}
                            type="search"
                        />
                    </Grid>                 

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="submit"
                        onClick = {this.assign}
                        >
                        Asignar
                    </Button>
                </Grid>
            </div>
        )
    }
}

import React, { Component } from 'react'
import cookie from 'react-cookies'
import { Grid, FormControl, InputLabel, NativeSelect, Paper, Typography } from '@material-ui/core'
import Axios from 'axios'
import CustomTable from '../CustomTablex';

export default class C_Patient extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            pacientes: [],
            P_name:'',
            P_id:'',
            P_direccion:'',
            P_genero:'',
            P_idDoc:'',
            P_idType:'',
            P_telefono:'',
            P_rh:'',
            rows:[]
        }
    }

    componentDidMount() {
        var token = cookie.load('userToken');
        console.log(token);
        Axios.get("/nurse/patients")
        .then(res =>{
            console.log(res.data)
            this.setState({
                pacientes:res.data
            })
        });
        
    }
    
    headCells = [
        { id: 'IdRoom', label: 'Room' },
        { id: 'nCamas', label: 'Beds' }
      ];

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
                <Grid item xs={12}>
                    <Typography variant="h2" gutterBottom align="center" color='textSecondary'>
                        Consultar Paciente
                    </Typography>
                </Grid>
                <Grid container style={{paddingTop:'2%'}}>
                    <Grid item xs={11} component={Paper} style={{ padding: "2%", marginBottom: "2%" }}>
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
                    </Grid>

                    <Grid item xs={11} component={Paper} style={{ padding: "2%", marginBottom: "2%" }}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography>
                                    Nombre:  { this.state.P_name }
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>
                                    Tipo de documento:  { this.state.P_idType }
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>
                                Documento de Indentidad:  { this.state.P_idDoc }
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>
                                    RH:  { this.state.P_rh }
                                </Typography>
                            </Grid>    
                            <Grid item xs={12}>
                                <Typography>
                                    Dirección:  { this.state.P_direccion }
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>
                                    Genero:  { this.state.P_genero }
                                </Typography>
                            </Grid> 
                            <Grid item xs={12}>
                                <Typography>
                                    Telefono:  { this.state.P_telefono }
                                </Typography>
                            </Grid> 
                        </Grid>
                    </Grid>

                    <Grid item xs={11} component={Paper} style={{ padding: "2%", marginBottom: "2%" }}>
                        <CustomTable rows={this.state.rows} headCells={this.headCells} title={"Procedimientos"} />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

import React, { Component } from 'react'
import cookie from 'react-cookies'
import { Grid, FormControl, InputLabel, NativeSelect, Paper, Typography, Button } from '@material-ui/core'
import Axios from 'axios'
import AsignarCuarto from './AsignarCuarto';

export default class A_Patient extends Component {
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
            vistaSelect:''

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

    selectButton = (event, value) => {
        event.preventDefault();
        this.setState ({
            vistaSelect:value
        })
    }

    vistaRender = ()=>{
        if(this.state.vistaSelect === "cuarto")
            return <AsignarCuarto/>
        else if(this.state.vistaSelect === "procedimiento")
            return <AsignarCuarto/>
        else
            return ""
    }
    

    render() {
        return (
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={12}  component={Paper} style={{ paddingLeft:'10%', paddingRight:'10%', paddingBottom:'5%'}}>
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
                    <Grid item xs={12} style={{ paddingBottom:'10%'}}>
                    </Grid>

                    <Grid item xs={12}  component={Paper} style={{ paddingLeft:'10%', paddingRight:'10%', paddingBottom:'5%'}}>
                        <Grid item xs={12} style={{ padding: 3 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className="submit"
                                        onClick={(e)=>this.selectButton(e,"cuarto")}
                                        >
                                        Asignar Cuarto
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className="submit"
                                        onClick={(e)=>this.selectButton(e,"procedimiento")}
                                        >
                                        Asignar Procedimiento
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            {this.vistaRender()}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

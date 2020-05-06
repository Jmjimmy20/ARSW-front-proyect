import React, { Component } from 'react'
import cookie from 'react-cookies'
import { Grid, FormControl, InputLabel, NativeSelect, Paper, Typography } from '@material-ui/core'
import Axios from 'axios'

export default class ConsEnfermera extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            nurseId:'',
            nurseName:'',
            cedulaNurse:'',
            RHNurse:'',
            typeNurse: '',
            mailNurse:'',
            typeDocument:'',
            enfermera:'',
            enfermeras:[]

        }
    }

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
    
    getNurse = (event) => {
        let idNurse = event.target.value;
        //console.log(event.target.value);
        
        for(const nurse of this.state.enfermeras){
            if(nurse.nurseId === parseInt(idNurse)){
                Axios.get("/admin/users/nurse/" + nurse.nurseId)
                .then(res => {

                    this.setState({
                        cedulaNurse: res.data.govId,
                        nurseName: nurse.name,
                        typeDocument: res.data.govType,
                        RHNurse: nurse.rh,
                        typeNurse: nurse.position,
                        mailNurse: res.data.email,
                        nurseId: nurse.nurseId
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
                        Consultar Enfermera
                    </Typography>
                </Grid>
                <Grid container spacing={3} style={{paddingTop:'2%'}}>
                    <Grid item xs={12}  component={Paper} style={{ paddingLeft:'10%', paddingRight:'10%', paddingBottom:'5%'}}>
                        <FormControl fullWidth error={this.state.errorType}>
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
                    <Grid item xs={12} style={{ paddingBottom:'10%'}}>
                    </Grid>

                    <Grid item xs={12}  component={Paper} style={{ paddingLeft:'10%', paddingRight:'10%', paddingBottom:'5%'}}>
                        <Grid item xs={12}>
                            <Typography>
                                Nombre:  { this.state.nurseName }
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                                Tipo de documento:  { this.state.typeDocument }
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                                Cedula:  { this.state.cedulaNurse }
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                                RH:  { this.state.RHNurse }
                            </Typography>
                        </Grid>    
                        <Grid item xs={12}>
                            <Typography>
                                Tipo Enfermera:  { this.state.typeNurse }
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                                Correo:  { this.state.mailNurse }
                            </Typography>
                        </Grid> 
                    </Grid>
                </Grid>
            </div>
        )
    }
}

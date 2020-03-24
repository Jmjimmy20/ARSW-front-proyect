import React, { Component } from 'react'
import cookie from 'react-cookies'
import TextField from '@material-ui/core/TextField';
import { Grid, FormControl, InputLabel, NativeSelect, Paper, Button } from '@material-ui/core'
import Axios from 'axios'


export default class AddPiso extends Component {

    constructor(props){
        super(props);
        this.state = { 
            nurseName:'',
            cedulaNurse:'',
            RHNurse:'',
            typeNurse: '',
            mailNurse:'',
            errorNurseName:false,
            errorCedula:false,
            errorRH:false,
            errorType:false,
            errorMail:false,
            typeDocument:'',
            errorTypeD:false
        }
    }

    render() {
        return (
            <div>
                <Grid container spacing={3}>
                    <Grid container component={Paper}>
                        <Grid item xs={12} style={{ paddingLeft:'10%', paddingRight:'10%', paddingBottom:'5%'}}>
                            <TextField fullWidth
                                value={this.state.nurseName}
                                onChange={this.nameNurseChange}
                                error={this.state.errorNurseName}
                                id="NurseNameInput" 
                                label="Numero de Piso" 
                                type="search" 
                            />
                        </Grid>
                        <Grid item xs={12} style={{ paddingLeft:'10%', paddingRight:'10%', paddingBottom:'5%'}}>
                            <TextField fullWidth
                                value={this.state.cedulaNurse}
                                onChange={this.cedulaNurseChange}
                                error={this.state.errorCedula}
                                id="CedulaInput" 
                                label="Numero de Cuartos" 
                                type="number" 
                            />
                        </Grid>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className="submit"
                                onClick = {this.createNurse}
                                >
                                Agregar
                            </Button>
                        </Grid>                        
                    </Grid>
                </Grid>
                
            </div>
        )
    }
}

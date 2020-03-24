import React, { Component } from 'react'
import { Grid, FormControl, InputLabel, NativeSelect, Paper, Typography } from '@material-ui/core'
import Axios from 'axios'

export default class ConsEnfermera extends Component {
    constructor(props) {
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

    //expresiones regulares
    cedulaRegEx = /^([0-9])*$/;
    textRegEx = /^([a-zA-Z ])*$/;
    rhRegEx= /^(AB|O|A)(\+|-)$/;
    mailRegEx =/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;


    typeNurseChange = (event) => {
        this.setState({
            typeNurse: event.target.value, errorType:false
        })
    }
    nameNurseChange = (event) =>{
        this.setState({
            nurseName: event.target.value, errorNurseName:false
        })
    }
    cedulaNurseChange = (event) =>{
        this.setState({
            cedulaNurse: event.target.value, errorCedula:false
        })
    }
    RhNurseChange = (event) =>{
        this.setState({
            RHNurse: event.target.value, errorRH:false
        })
    }
    mailNurseChange = (event) =>{
        this.setState({
            mailNurse: event.target.value, errorMail:false
        })
    }

    createNurse = (event) =>{
        event.preventDefault();
        //nombre
        if(this.state.nurseName === '' || this.state.nurseName.length === 0){
            this.setState({
                errorNurseName:true
            })
        }else if(!this.textRegEx.test(this.state.nurseName)){
            this.setState({
                errorNurseName:true
            })
        }
        //cedula
        if(this.state.cedulaNurse === '' || this.state.cedulaNurse.length === 0){
            this.setState({
                errorCedula:true
            })
        }else if(!this.cedulaRegEx.test(this.state.cedulaNurse)){
            this.setState({
                errorCedula:true
            })
        }
        //RH
        if(this.state.RHNurse === '' || this.state.RHNurse.length === 0){
            this.setState({
                errorRH:true
            })
        }else if(!this.rhRegEx.test(this.state.RHNurse)){
            this.setState({
                errorRH:true
            })
        }
        //type
        if(this.state.typeNurse === '' || this.state.typeNurse.length === 0){
            this.setState({
                errorType:true
            })
        }

        //document type
        if(this.state.typeDocument === '' || this.state.typeDocument.length  === 0){
            this.setState({
                errorTypeD:true
            })
        }

        //mail
        if(this.state.mailNurse === '' || this.state.mailNurse.length === 0){
            this.setState({
                errorMail:true
            })
        }else if(!this.mailRegEx.test(this.state.mailNurse)){
            this.setState({
                errorMail:true
            })
        }

        if(!this.state.errorNurseName&&!this.state.errorCedula&&!this.state.errorRH&&!this.state.errorType&&!this.state.errorMail){
            let nurse = {
                NurseName: this.state.nurseName,
                typeDoc: 'c.c.',
                numDoc: this.state.cedulaNurse,
                RH: this.state.RHNurse,
                typeNurse: this.state.typeNurse,
                mail: this.state.mailNurse
            } 
            Axios 
                .post("http://localhost:8081/admin/nurse-and-user",nurse)
                .then(res=>{console.log(res)})          
        }

    }

    render() {
        return (
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={12}  component={Paper} style={{ paddingLeft:'10%', paddingRight:'10%', paddingBottom:'5%'}}>
                        <FormControl fullWidth error={this.state.errorType}>
                            <InputLabel id="typeNurseInput">Enfermera</InputLabel>
                            <NativeSelect 
                                fullWidth
                                value={this.state.typeNurse}
                                onChange={this.typeNurseChange}
                                >
                                <option value=""> </option>
                                <option value={10}>Asistente</option>
                                <option value={20}>Jefe</option>
                            </NativeSelect>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} style={{ paddingBottom:'10%'}}>
                    </Grid>

                    <Grid item xs={12}  component={Paper} style={{ paddingLeft:'10%', paddingRight:'10%', paddingBottom:'5%'}}>
                        <Grid item xs={12}>
                            <Typography>
                                Nombre:  { this.state.nombre }
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                                Tipo de documento:  { this.state.cedula }
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                                Cedula:  { this.state.fechaN }
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                                RH:  { this.state.rh }
                            </Typography>
                        </Grid>    
                        <Grid item xs={12}>
                            <Typography>
                                Tipo Enfermera:  { this.state.fechaN }
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                                Correo:  { this.state.rh }
                            </Typography>
                        </Grid> 
                    </Grid>
                </Grid>
            </div>
        )
    }
}

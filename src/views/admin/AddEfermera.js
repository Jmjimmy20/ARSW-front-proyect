import React, { Component } from 'react'
import cookie from 'react-cookies'
import TextField from '@material-ui/core/TextField';
import { Grid, FormControl, InputLabel, NativeSelect, Paper, Button, Typography } from '@material-ui/core'
import Axios from 'axios'

export default class AddEfermera extends Component {


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


    componentDidMount() {
        var token = cookie.load('userToken');
        console.log(token);
    }


    typeNurseChange = (event) => {
        this.setState({
            typeNurse: event.target.value, errorType:false
        })
    }

    typeDocumentChange = (event) =>{
        this.setState({
            typeDocument: event.target.value, errorTypeD: false
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
            let user = {
                active: true,
                email:this.state.mailNurse,
                govId: this.state.cedulaNurse,
                govType: this.state.typeDocument,
                loginUser: this.state.cedulaNurse,//revisar 
                password: this.state.cedulaNurse, // revisar
                rol: "USER"
            }
            Axios 
                .post("/admin/users",user)
                .then(res=>{console.log(res)
                    let nurse = {
                        name: this.state.nurseName,
                        position: this.state.typeNurse === "Asistente" ? "asst" : "mngr",
                        rh: this.state.RHNurse,
                        user: res.data
                    }
                   Axios.post("/admin/nurses",nurse) 
                   .then(respuesta => {
                       alert("La enfermera ha sido creada.")
                       this.setState({
                            nurseName:'',
                            cedulaNurse:'',
                            RHNurse:'',
                            mailNurse:'',
                            typeNurse: '',
                            typeDocument: ''
                       })
                   })
                })          
        }

    }

    render() {
        return (
            <div>
                <Grid item xs={12}>
                    <Typography variant="h2" gutterBottom align="center" color='textSecondary'>
                        Agregar Enfermera
                    </Typography>
                </Grid>
                <Grid container spacing={3} style={{paddingTop:'2%'}}>
                    <Grid container component={Paper}>
                        <Grid item xs={12} style={{ paddingLeft:'10%', paddingRight:'10%', paddingBottom:'5%'}}>
                            <TextField fullWidth
                                value={this.state.nurseName}
                                onChange={this.nameNurseChange}
                                error={this.state.errorNurseName}
                                id="NurseNameInput" 
                                label="Nombre Enfermera" 
                                type="search" 
                            />
                        </Grid>
                        <Grid item xs={12} style={{ paddingLeft:'10%', paddingRight:'10%', paddingBottom:'5%'}}>
                            <FormControl fullWidth error={this.state.errorType}>
                                <InputLabel id="typeNurseInput">Tipo de documento</InputLabel>
                                <NativeSelect 
                                    fullWidth
                                    value={this.state.typeDocument}
                                    onChange={this.typeDocumentChange}
                                    >
                                    <option value=""> </option>
                                    <option value={10}>cc</option>
                                    <option value={20}>ce</option>
                                    <option value={30}>ti</option>
                                    <option value={40}>pa</option>
                                    <option value={50}>rc</option>
                                </NativeSelect>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} style={{ paddingLeft:'10%', paddingRight:'10%', paddingBottom:'5%'}}>
                            <TextField fullWidth
                                value={this.state.cedulaNurse}
                                onChange={this.cedulaNurseChange}
                                error={this.state.errorCedula}
                                id="CedulaInput" 
                                label="Cedula" 
                                type="number" 
                            />
                        </Grid>
                        <Grid item xs={12} style={{ paddingLeft:'10%', paddingRight:'10%', paddingBottom:'5%'}}>
                            <TextField fullWidth
                                value={this.state.RHNurse}
                                onChange={this.RhNurseChange}
                                error={this.state.errorRH}
                                id="RHInput" 
                                label="RH" 
                                type="search" 
                            />
                        </Grid>
                        <Grid item xs={12} style={{ paddingLeft:'10%', paddingRight:'10%', paddingBottom:'5%'}}>
                            <FormControl fullWidth error={this.state.errorType}>
                                <InputLabel id="typeNurseInput">Tipo de enfermera</InputLabel>
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
                        <Grid item xs={12} style={{ paddingLeft:'10%', paddingRight:'10%', paddingBottom:'5%'}}>
                            <TextField fullWidth
                                value={this.state.mailNurse}
                                onChange={this.mailNurseChange}
                                error={this.state.errorMail}
                                id="mailInput" 
                                label="Correo" 
                                type="search" 
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

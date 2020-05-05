import React, { Component } from 'react'
//import cookie from 'react-cookies'
import TextField from '@material-ui/core/TextField';
import { Grid, FormControl, InputLabel, NativeSelect, Paper, Button } from '@material-ui/core'
import Axios from 'axios'
import update from 'immutability-helper';

export default class EditEnfermera extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            nurseName:'',
            cedulaNurse:'',
            RHNurse:'',
            typeNurse: '',
            mailNurse:'',
            errorNurseName: false,
            errorCedula: false,
            errorRH: false,
            errorType: false,
            errorMail: false,
            typeDocument:'',
            errorTypeD: false,
            enfermeras: [],
            nurseId:'',
            nurseObj:'',
            usuarioEnf: ''
        }
    }

    //expresiones regulares
    textRegEx = /^([a-zA-Z ])*$/;
    mailRegEx =/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;

    componentDidMount() {
        //var token = cookie.load('userToken');
        //console.log(token);
        Axios.get("/admin/nurses")
        .then(res =>{
          //console.log(res.data)
            this.setState({
                enfermeras:res.data
            })
        });
        console.log(this.state.enfermeras.length);
    }
    

    getNurse = (event) => {
        let idNurse = event.target.value;
        for(const nurse of this.state.enfermeras){
            if(nurse.nurseId === parseInt(idNurse)){
                Axios.get("/admin/users/nurse/" + nurse.nurseId)
                .then(res => {
                    var usuario = res.data;
                    this.setState({
                        usuarioEnf: usuario,
                        cedulaNurse: res.data.govId,
                        nurseName: nurse.name,
                        typeDocument: res.data.govType,
                        RHNurse: nurse.rh,
                        typeNurse: nurse.position,
                        mailNurse: res.data.email,
                        nurseId: nurse.nurseId,
                        nurseObj:nurse
                    })

                })
                
            }
        }
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

        if(!this.state.errorNurseName&&!this.state.errorMail){

            /* console.log(this.state.nurseObj)
            console.log(this.state.usuarioEnf) */
            this.setState((state) => {
                return {
                    nurseObj: update(state.nurseObj, { "name": { $set: state.nurseName }}),
                    usuarioEnf: update(state.usuarioEnf, { "email": { $set: state.mailNurse }})
                }
            })

            Axios
                .put("/admin/users", this.state.usuarioEnf)
                .then(res => { console.log(res) });

            Axios 
                .put("/admin/nurses",this.state.nurseObj)
                .then(res => {
                    this.setState({
                        nurseName:'',
                        mailNurse:'',
                        enfermeras: [],
                        nurseId:'',
                        nurseObj:'',
                        usuarioEnf: ''
                    });
                    
                });
        }

    }

    render() {
        return (
            <div>
                <Grid container spacing={3} >
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
                                        <option key={index} value={enfermera.nurseId}> {enfermera.position} - {enfermera.name}</option>
                                    );
                                })}
                            </NativeSelect>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} style={{ paddingBottom:'10%'}}>
                    </Grid>
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
                                Actualizar
                            </Button>
                        </Grid>                        
                    </Grid>
                </Grid>
                
            </div>
        )
    }
}

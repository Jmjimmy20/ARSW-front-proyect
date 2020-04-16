import React, { Component } from 'react'
import cookie from 'react-cookies'
import TextField from '@material-ui/core/TextField';
import { Grid, FormControl, InputLabel, NativeSelect, Paper, Button } from '@material-ui/core'
import Axios from 'axios'

export default class EditEnfermera extends Component {

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
            errorTypeD:false,
            enfermeras: [],
            nurseId:'',
            nurseObj:''
        }
    }

    //expresiones regulares
    textRegEx = /^([a-zA-Z ])*$/;
    mailRegEx =/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;

    componentDidMount() {
        var token = cookie.load('userToken');
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
        console.log(event.target.value);
        this.setState((state) => {
            for(const nurse of state.enfermeras){
                if(nurse.nurseId === parseInt(idNurse)){
                    console.log(nurse);
                    return({
                        cedulaNurse: "N/A",
                        nurseName: nurse.name,
                        typeDocument: "N/A",
                        RHNurse: nurse.rh,
                        typeNurse: nurse.position,
                        mailNurse: "N/A",
                        nurseId: nurse.nurseId,
                        nurseObj: nurse
                    })
                }
            }
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

            this.state.nurseObj.name = this.state.nurseName

            Axios 
                .put("/admin/nurses",this.state.nurseObj)
                .then(res=>{console.log(res)})          
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

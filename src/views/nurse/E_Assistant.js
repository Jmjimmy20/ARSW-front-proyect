import React, { Component } from 'react'
//import cookie from 'react-cookies'
import { Grid, FormControl, InputLabel, NativeSelect, Paper, Button, Typography } from '@material-ui/core'
import Axios from 'axios'
import update from 'immutability-helper';
import ModificarTurno from './ModificarTurno';
import ModificarTarea from './ModificarTarea';

export default class E_Assistant extends Component {

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
        //var token = cookie.load('userToken');
        //console.log(token);
        Axios.get("/nurse/users")
        .then(res =>{
          //console.log(res.data)
            this.setState({
                enfermeras:res.data
            })
        });
        console.log(this.state.enfermeras.length);
    }
    

    getAux = (event) => {
        let auxNurse = event.target.value;
        //console.log(event.target.value);
        
        for(const nur of this.state.enfermeras){
            if(nur.userId === parseInt(auxNurse)){
                Axios.get("/nurse/users/" + nur.userId)
                .then(res => {
                    this.setState({
                        n_name: res.data.name,
                        
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

    selectButton = (event, value) => {
        event.preventDefault();
        this.setState ({
            vistaSelect:value
        })
    }

    vistaRender = ()=>{
        if(this.state.vistaSelect === "Turno")
            return <ModificarTurno/>
        else if(this.state.vistaSelect === "Tarea")
            return <ModificarTarea/>
        else
            return ""
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

        if(!this.state.errorNurseName&&!this.state.errorMail) {

            this.setState((state) => {
                return {
                    nurseObj: update(state.nurseObj, { "name": { $set: state.nurseName } })
                }
            });

            Axios 
                .put("/admin/nurses",this.state.nurseObj)
                .then(res=>{console.log(res)})          
        }

    }

    render() {
        return (
            <div>
                <Grid item xs={12}>
                    <Typography variant="h2" gutterBottom align="center" color='textSecondary'>
                        Modificar Auxiliar
                    </Typography>
                </Grid>
                <Grid container style={{paddingTop:'2%'}}>
                    <Grid item xs={11} component={Paper} style={{ padding: "2%", marginBottom: "2%" }}>
                        <FormControl fullWidth error={this.state.errorType}>
                            <InputLabel id="typeNurseInput">Enfermera</InputLabel>
                            <NativeSelect 
                                fullWidth
                                value={this.state.P_id}
                                onChange={this.getAux}
                                >
                                <option value=""> </option>
                                {this.state.enfermeras.map((nuraux, index) => {
                                    return(
                                    <option key={index} value={nuraux.userId}> {nuraux.nurses[0].nurseId} - {nuraux.nurses[0].name} </option>
                                    );
                                })}
                                
                            </NativeSelect>
                        </FormControl>
                    </Grid>
                
                    <Grid item xs={11} component={Paper} style={{ padding: "2%", marginBottom: "2%" }}>
                        <Grid container >
                            <Grid item xs={5}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className="submit"
                                    onClick={(e)=>this.selectButton(e,"Turno")}
                                    >
                                    Turnos
                                </Button>
                            </Grid>
                            <Grid item xs={2}></Grid>
                            <Grid item xs={5}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className="submit"
                                    onClick={(e)=>this.selectButton(e,"Tarea")}
                                    >
                                    Tareas
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={11} component={Paper} style={{ padding: "2%", marginBottom: "2%" }}>
                        {this.vistaRender()}
                    </Grid>

                </Grid>
                
            </div>
        )
    }
}

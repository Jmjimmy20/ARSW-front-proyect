import React, { Component } from 'react'
import cookie from 'react-cookies'
import { Grid, FormControl, InputLabel, NativeSelect, Paper, Button, Typography } from '@material-ui/core'
import Axios from 'axios'
import AsignarTurno from './AsignarTurno';
import AsignarTarea from './AsignarTarea';


export default class A_Assistant extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            enfermeras: [],
            n_name:'',
            n_id:'',
            vistaSelect:''

        }
    }

    componentDidMount() {
        var token = cookie.load('userToken');
        console.log(token);
        Axios.get("/nurse/users")
        .then(res =>{
            let auxList = [];
            for(const datos of res.data){
                if(datos.nurses.length!==0){
                auxList.push(datos)
                }
            }
            console.log(res.data)
            this.setState({
                enfermeras:auxList
            })
        });
        
    }
    
    getAux = (event) => {
        let auxNurse = event.target.value;
        //console.log(event.target.value);
    }

    selectButton = (event, value) => {
        event.preventDefault();
        this.setState ({
            vistaSelect:value
        })
    }

    vistaRender = ()=>{
        if(this.state.vistaSelect === "Turno")
            return <AsignarTurno/>
        else if(this.state.vistaSelect === "Tarea")
            return <AsignarTarea/>
        else
            return ""
    }
    

    render() {
        return (
            <div>
            
                <Grid item xs={12}>
                    <Typography variant="h2" gutterBottom align="center" color='textSecondary'>
                        Enfermera Auxiliar
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

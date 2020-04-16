import React, { Component } from 'react'
import cookie from 'react-cookies'
import TextField from '@material-ui/core/TextField';
import { Grid, FormControl, InputLabel, NativeSelect, Paper, Button, Typography } from '@material-ui/core'
import Axios from 'axios'

export default class EditPiso extends Component {

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
            floorID:'',
            beds:'',
            pisos:[]
        }
    }

    componentDidMount(){
        var token = cookie.load('userToken');
        console.log(token);
        Axios.get("/admin/blocks")
        .then(res =>{
            console.log(res.data)
            this.setState({
                pisos:res.data
            })
        });
        console.log(this.state.pisos.length);
    }

    getFloor = (event) => {
        let floorID = event.target.value;
        var numFloor = 0;
        //console.log(event.target.value);
        this.setState((state) => {
            for(const floor of state.pisos){
                if(floor.blockcode === parseInt(floorID)){
                    for(const room of floor.rooms){
                        numFloor += room.beds.length
                    }

                    return({
                        floorID: floor.blockfloor,
                        beds: numFloor
                    })
                }
            }
        })
    }

    
    render() {
        return (
            <div>
                <Grid container spacing={3}>

                <Grid item xs={12}  component={Paper} style={{ paddingLeft:'10%', paddingRight:'10%', paddingBottom:'5%'}}>
                        <FormControl fullWidth error={this.state.errorType}>
                            <InputLabel id="typeNurseInput">Pisos</InputLabel>
                            <NativeSelect 
                                fullWidth
                                value={this.state.floorID}
                                onChange={this.getFloor}
                                >
                                <option value=""> </option>
                                {this.state.pisos.map((piso, index) => {
                                    console.log(piso)
                                    return(
                                        <option key={index} value={piso.blockcode}> {piso.blockcode}</option>
                                    );
                                })}
                                
                            </NativeSelect>
                        </FormControl>
                    </Grid>


                    <Grid container component={Paper}>
                        <Grid item xs={12} style={{ paddingLeft:'10%', paddingRight:'10%', paddingBottom:'5%'}}>
                            <TextField fullWidth
                                value={this.state.nurseName}
                                onChange={this.nameNurseChange}
                                error={this.state.errorNurseName}
                                id="NurseNameInput" 
                                label="Numero de Cuartos" 
                                type="search" 
                            />
                        </Grid>

                        <Grid item xs={12} style={{ paddingLeft:'10%', paddingRight:'10%', paddingBottom:'5%'}}>
                            <TextField fullWidth
                                value={this.state.nurseName}
                                onChange={this.nameNurseChange}
                                error={this.state.errorNurseName}
                                id="NurseNameInput" 
                                label="Numero de camas" 
                                type="search" 
                            />
                        </Grid>

                        <Grid item xs={12} style={{ paddingLeft:'10%', paddingRight:'10%', paddingBottom:'5%'}}>
                            
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

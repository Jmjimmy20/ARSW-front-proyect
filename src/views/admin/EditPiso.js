import React, { Component } from 'react'
import cookie from 'react-cookies'
import TextField from '@material-ui/core/TextField';
import { Grid, FormControl, InputLabel, NativeSelect, Paper, Button, Typography } from '@material-ui/core'
import Axios from 'axios'

export default class EditPiso extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            floorID:'',
            beds:'',
            pisos:[],
            cuartos:[],
            nCuarto:'',
            available: ''
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
                    return {cuartos: floor.rooms, floorID: floor.blockcode }
                    
                }
            }
        })
    }

    getRooms = (event) => {
        let roomID = event.target.value;
        this.setState((state) => {
            for(const room of state.cuartos){
                if(room.roomnumber === parseInt(roomID)){
                    return { available: room.unavailable, nCuarto: room.roomnumber }
                }
            }
        })
    }

    getState = (event) => {
        this.setState({
            available: event.target.value
        })
    }

    updateFloor = (event) => {
        let tempFloor;
        for(const floor of this.state.pisos){
            if(floor.blockcode === parseInt(this.state.floorID)){
                tempFloor = floor;
                let i = 0;
                for(const room of this.state.cuartos){
                    if(room.roomnumber === parseInt(this.state.nCuarto)){
                        tempFloor.rooms[i].unavailable = this.state.available;
                    }
                    i++;
                }
                
            }
        }
        Axios
            .put("/admin/blocks", tempFloor)
            .then(resPost => {
                console.log(resPost.data);
                this.setState({
                    floorID:'',
                    beds:'',
                    pisos:[],
                    cuartos:[],
                    nCuarto:'',
                    available: ''
                });
                
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
                            <FormControl fullWidth error={this.state.errorType}>
                                <InputLabel id="typeNurseInput">Cuarto</InputLabel>
                                <NativeSelect 
                                    fullWidth
                                    value={this.state.nCuarto}
                                    onChange={this.getRooms}
                                    >
                                    <option value=""> </option>
                                    {this.state.cuartos.map((piso, index) => {
                                        console.log(piso)
                                        return(
                                            <option key={index} value={piso.roomnumber}> {piso.roomnumber}</option>
                                        );
                                    })}
                                    
                                </NativeSelect>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} style={{ paddingLeft:'10%', paddingRight:'10%', paddingBottom:'5%'}}>
                            <FormControl fullWidth error={this.state.errorType}>
                                <InputLabel id="typeNurseInput">Estado</InputLabel>
                                <NativeSelect 
                                    fullWidth
                                    value={this.state.available}
                                    onChange={this.getState}
                                    >
                                    <option value=""> </option>
                                    <option value={'true'}>Habilitado</option>
                                    <option value={'false'}>Deshabilitado</option>
                                    
                                </NativeSelect>
                            </FormControl>
                        </Grid>

                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className="submit"
                                onClick = {this.updateFloor}
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

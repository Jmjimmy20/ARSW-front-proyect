import React, { Component } from 'react'
import { Grid, FormControl, InputLabel, NativeSelect, Paper, Typography, Button, TextField } from '@material-ui/core'


export default class AsignarCuarto extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            roomsType:'',
            numCuarto: '',
            numCama:''
        }
    }

    typeRoomChange = (event, i) => {
        this.setState({
            roomsType: event.target.value
        });
    }

    roomChange = (event, i) => {
        this.setState({
            numCuarto: event.target.value
        });
    }

    bedChange = (event, i) => {
        this.setState({
            numCama: event.target.value
        });
    }

    addRoom=(event)=>{

    }


    render() {
        return (
            <div>
                <hr></hr>
                <Grid container spacing={3} style ={{paddingTop:'10%'}} >
                    El sistema asigna
                    <FormControl fullWidth style={{paddingBottom:'10%'}}>
                        <InputLabel id="typeNurseInput">Tipo de Cuarto</InputLabel>
                        <NativeSelect
                            fullWidth
                            value={this.state.roomsType}
                            onChange={(e) => this.typeRoomChange(e)}
                        >
                            <option value=""> </option>
                            <option value={'private room'}>private room</option>
                            <option value={'semi-private'}>semi-private</option>
                            <option value={'shared room'}>shared room</option>
                        </NativeSelect>
                    </FormControl>

                    Especificar el número de Cuarto y cama

                    <TextField fullWidth style={{paddingBottom:'10%'}}
                        value={this.state.numCuarto}
                        onChange={(e) => this.roomChange(e)}
                        id="numCuarto"
                        label={"Numero de Cuarto"}
                        type="search"
                    />


                    <TextField fullWidth 
                        value={this.state.numCama}
                        onChange={(e) => this.bedChange(e)}
                        id="numCuarto"
                        label={"Numero de Cama"}
                        type="search"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="submit"
                        onClick = {this.addRoom}
                        >
                        Agregar
                    </Button>
                </Grid>

                
            </div>
        )
    }
}

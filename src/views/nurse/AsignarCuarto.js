import React, { Component } from 'react'
import { Grid, FormControl, InputLabel, NativeSelect, Button, TextField, Typography } from '@material-ui/core'


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
                <Grid container >
                    
                    <Grid item xs={12}>
                        <Typography>
                            El sistema asigna
                        </Typography>
                        
                        <FormControl fullWidth>
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
                    </Grid>
                    <Grid item xs={12}>
                        <Typography style={{ paddingTop: '3%' }}>
                            Especificar el número de Cuarto y cama
                        </Typography>

                        <TextField fullWidth
                            value={this.state.numCuarto}
                            onChange={(e) => this.roomChange(e)}
                            id="numCuarto"
                            label={"Numero de Cuarto"}
                            type="search"
                        />

                        <TextField fullWidth style={{marginTop: '3%'}}
                            value={this.state.numCama}
                            onChange={(e) => this.bedChange(e)}
                            id="numCuarto"
                            label={"Numero de Cama"}
                            type="search"
                        />
                    </Grid>                 

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

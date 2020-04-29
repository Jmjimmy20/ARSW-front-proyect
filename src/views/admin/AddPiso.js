import React, { Component } from 'react'
import cookie from 'react-cookies'
import TextField from '@material-ui/core/TextField';
import { Grid, FormControl, InputLabel, NativeSelect, Paper, Button } from '@material-ui/core'
import Axios from 'axios'
import update from 'immutability-helper';


export default class AddPiso extends Component {

    constructor(props){
        super(props);
        this.state = { 
            nCuartos:'',
            nCamas:'',
            roomsType: [],
            numBeds: [],
            errorCuartos: false,
            errorCamas: [],
            errorTypeRoom: []
        }
        this.cuartosChange = this.cuartosChange.bind(this);
        this.camasChange = this.camasChange.bind(this);
        this.typeRoomChange = this.typeRoomChange.bind(this);
    }

    componentDidMount() {
        var token = cookie.load('userToken');
        console.log(token);
    }

    //expresiones regulares
    NumeroRegEx = /^([0-9])*$/;

    createFloor = (event) =>{

        if(this.NumeroRegEx.test(this.state.nCuartos) && this.NumeroRegEx.test(this.state.nCamas)) {
            Axios
                .get("/admin/blocks")
                .then(res => {
                    let data = {
                        "blockfloor": res.data.length,
                        "rooms": []
                    }
                    for (let i = 0; i < this.state.nCuartos; i++) {
                        let tempType = this.state.roomsType[i];
                        let tempRoom = {
                            "roomtype": tempType,
                            "unavailable": false,
                            "beds": []
                        }
                        for (let j = 0; j < this.state.numBeds[i]; j++) {
                            tempRoom.beds.push({ "stays": [] });
                        }
                        data.rooms.push(tempRoom);
                    }
                    console.log(data);
                    Axios
                        .post("/admin/blocks", data)
                        .then(resPost => {
                            console.log(resPost.data);
                            this.setState({
                                nCuartos: 0,
                                nCamas: '',
                                roomsType: [],
                                numBeds: [],
                                errorCuartos: false,
                                errorCamas: [],
                                errorTypeRoom: []
                            });
                            this.setState({
                                nCuartos: ''
                            });
                    });
                });
        }
        
    }

    cuartosChange = (event) =>{
        this.setState({
            nCuartos: event.target.value, errorCuartos: false, roomsType: []
        }, () => {
            for (let i = 0; i < parseInt(this.state.nCuartos); i++) {
                console.log(i);
                this.state.errorTypeRoom.push(false);
                this.state.roomsType.push('');
                this.state.numBeds.push('');
                this.state.errorCamas.push(false);
            }
            console.log(this.state.roomsType);
            this.forceUpdate();
        });
    }

    camasChange = (event, i) => {
        this.setState({
            numBeds: update(this.state.numBeds, {[i]: {$set: event.target.value}})
        });
    }

    typeRoomChange = (event, i) => {
        this.setState({
            roomsType: update(this.state.roomsType, {[i]: {$set: event.target.value}})
        });
    }

    render() {
        return (
            <div>
                <Grid container spacing={3}>
                    <Grid container component={Paper}>
                        <Grid item xs={12} style={{ paddingLeft:'10%', paddingRight:'10%', paddingBottom:'5%'}}>
                            <TextField fullWidth
                                value={this.state.nCuartos}
                                onChange={this.cuartosChange}
                                error={this.state.errorCuartos}
                                id="nCuartos" 
                                label="Numero de Cuartos" 
                                type="search" 
                            />

                            {this.state.roomsType.map((val, i) => {
                                
                                return (
                                    <div style={{ marginBottom: '10px', marginTop: '10px' }} key={i}>
                                        <FormControl fullWidth error={this.state.errorTypeRoom[i]}>
                                            <InputLabel id="typeNurseInput">Tipo de Cuarto {i+1}</InputLabel>
                                            <NativeSelect
                                                fullWidth
                                                value={this.state.roomsType[i]}
                                                onChange={(e) => this.typeRoomChange(e, i)}
                                            >
                                                <option value=""> </option>
                                                <option value={'private room'}>private room</option>
                                                <option value={'semi-private'}>semi-private</option>
                                                <option value={'shared room'}>shared room</option>
                                            </NativeSelect>
                                        </FormControl>
                                        <TextField fullWidth
                                            value={this.state.numBeds[i]}
                                            onChange={(e) => this.camasChange(e, i)}
                                            error={this.state.errorCamas[i]}
                                            id="numCamas"
                                            label={"Numero de Camas Cuarto " + (i + 1)}
                                            type="search"
                                        />
                                    </div>
                                )
                            })}
                        </Grid>

                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className="submit"
                                onClick = {this.createFloor}
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

import React, { Component } from 'react'
import cookie from 'react-cookies'
import { Grid, FormControl, InputLabel, NativeSelect, Paper, Typography } from '@material-ui/core'
import Axios from 'axios'

export default class ConsPiso extends Component {

    constructor(props){
        super(props);
        this.state={
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
        console.log(event.target.value);
        this.setState((state) => {
            for(const floor of state.pisos){
                /*if(pisos.blockcode === parseInt(floorID)){
                    console.log(floor);
                    return({
                        floorID: floor.blockfloor
                    })
                }*/
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
                                    return(
                                        <option key={index} value={piso.blockcode}> {piso.bloackcode}</option>
                                    );
                                })}
                                
                            </NativeSelect>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} style={{ paddingBottom:'10%'}}>
                    </Grid>

                    <Grid item xs={12}  component={Paper} style={{ paddingLeft:'10%', paddingRight:'10%', paddingBottom:'5%'}}>
                        <Grid item xs={12}>
                            <Typography>
                                Numero de Piso:  { this.state.floorID }
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                                Numero de Camas:  { this.state.beds }
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}
